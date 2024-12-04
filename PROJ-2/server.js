const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: 'https://project.annetteisabrunette.xyz', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Database Connection
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://da804107:mypassword@cluster0.v6oei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');

    // Start the Server after successful DB connection
    app.listen(5000, () => {
        console.log('Server is running on http://localhost:5000');
    });
});

// SignUp Route
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    const newUser = { UserId: null, Username: username, Password: password };
    let error = '';

    try {
        const db = client.db('project');
        newUser.UserId = await db.collection('Users').countDocuments() + 1; // Ensure unique UserId

        /* Uncomment to check for existing user
        if (await db.collection('Users').findOne({ Username: newUser.Username })) {
            return res.status(400).json({ error: 'User already exists' });
        }
        */

        await db.collection('Users').insertOne(newUser);
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ error });
});

// Login Route
app.post('/api/login', async (req, res) => {
    console.log("in server.js");
    const { login, password } = req.body;
    let error = '';
    let id = -1, fn = '';

    try {
        const db = client.db('project');
        const results = await db.collection('Users').find({ Username: login, Password: password }).toArray();

        if (results.length > 0) {
            id = results[0].UserId;
            fn = results[0].Username || '';
        } else {
            error = 'Wrong username/password';
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ id, username: fn, error });
});

// Delete Study Sets
app.post('/api/deleteset', async (req, res) => {
    const { userId, title } = req.body;
    console.log('Delete: ', title);
    let error = '';

    try {
        const db = client.db('project');
        const delSetResult = await db.collection('StudySets').deleteOne({ UserId: userId, SetName: title });

        if (delSetResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No study set found' });
        }

        // Delete all flashcards
        await db.collection('FlashCards').deleteMany({ SetName: title });
    } catch (e) {
        error = e.toString();
    }
    res.status(200).json({ error });
});

// Update Set Name
app.post('/api/setName', async (req, res) => {
    const { userId, setId, newName } = req.body;
    console.log('Update: ', setId);
    let error = '';

    try {
        const db = client.db('project');
        const updateResult = await db.collection('StudySets').updateOne(
            { UserId: userId, SetName: setId },
            { $set: { SetName: newName } }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'No study set found' });
        }

        // Note: Removed deletion of flashcards here as it seems unrelated to updating set name
    } catch (e) {
        error = e.toString();
    }
    res.status(200).json({ error });
});

// Add Study Set
app.post('/api/addset', async (req, res) => {
    const { userId, title, textareasList } = req.body;
    console.log(req.body);
    const set = { SetName: title, UserId: userId, Flashcards: textareasList };
    console.log(set);
    let error = '';
    try {
        const db = client.db('project');
        await db.collection('StudySets').insertOne(set);
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ error });
});

// Add Flashcard
app.post('/api/addflashcard', async (req, res) => {
    const { userId, setName, flashcard } = req.body;
    let error = '';

    try {
        const db = client.db('project');
        const result = await db.collection('StudySets').updateOne(
            { UserId: userId, SetName: setName },
            { $push: { Flashcards: flashcard } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Study set not found' });
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ error });
});

// Search Study Sets
app.post('/api/searchsets', async (req, res) => {
    const { userId, search } = req.body;
    const _search = search.trim();
    let error = '';
    let _ret = [];

    try {
        const db = client.db('project');
        const results = await db.collection('StudySets').find({ UserId: userId, SetName: { $regex: _search + '.*' } }).toArray();

        for (let i = 0; i < results.length; i++) {
            _ret.push([results[i]._id.toString(), results[i].SetName]);
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ results: _ret, error });
});

// View Set
app.post('/api/viewset', async (req, res) => {
    const { userId, setName } = req.body;
    let error = '';
    let _ret = null;

    console.log(req.body);

    try {
        const db = client.db('project');
        const results = await db.collection('StudySets').findOne({ UserId: userId, SetName: { $regex: setName + '.*' } });

        if (results) {
            _ret = {
                id: results._id.toString(), // Map MongoDB _id to id
                name: results.SetName,
                flashcards: results.Flashcards || [],
                isEditingName: results.isEditingName || false,
            };
        }
        console.log(_ret);
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ results: _ret, error });
});

// Search Flash Cards
app.post('/api/searchcards', async (req, res) => {
    const { setId } = req.body;
    let error = '';
    let _ret = [];

    try {
        const db = client.db('project');
        const results = await db.collection('FlashCards').find({ _id: new ObjectId(setId) }).toArray();

        for (let i = 0; i < results.length; i++) {
            _ret.push(results[i].Flashcards);
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ results: _ret, error });
});

// Load Sets
app.post('/api/loadsets', async (req, res) => {
    const { userId } = req.body;
    let error = '';
    let _ret = [];

    try {
        const db = client.db('project');
        const results = await db.collection('StudySets').find({ UserId: userId }).toArray();

        if (!userId) {
            return res.status(400).json({ error: 'Invalid or missing userId' });
        }

        for (let i = 0; i < results.length; i++) {
            let resultWithEdit = { id: results[i]._id.toString(), name: results[i].SetName, isEditing: false };
            _ret.push(resultWithEdit);
        }
    } catch (e) {
        error = e.toString();
        return res.status(500).json({ results: [], error });
    }

    res.status(200).json({ results: _ret, error });
});
