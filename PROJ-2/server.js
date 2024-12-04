// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: 'https://project.annetteisabrunette.xyz',
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
        newUser.UserId = await db.collection('Users').countDocuments();

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
    let id = -1, fn = '', ln = '';

    try {
        const db = client.db('project');
        const results = await db.collection('Users').find({ Username: login, Password: password }).toArray();

        if (results.length > 0) {
            id = results[0].UserId;
            fn = results[0].Username || '';
            ln = results[0].LastName || '';
        } else {
            error = 'Wrong username/password';
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ id, firstName: fn, lastName: ln, error });
});

// Add Study Set
app.post('/api/addset', async (req, res) => {
    const { userId, title, textareasList } = req.body;
    console.log(req.body);
    const set = { name: title, userId: userId, flashcards: textareasList };
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

// Delete Study Set
app.delete('/api/deleteset', async (req, res) => {
    const { userId, title } = req.body;
    console.log('Delete: ', title);
    let error = '';

    try {
        const db = client.db('project');
        const delSetResult = await db.collection('StudySets').deleteOne({ userId: userId, name: title });

        if (delSetResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No study set found' });
        }

        // Delete all flashcards
        await db.collection('FlashCards').deleteMany({ setName: title });
    } catch (e) {
        error = e.toString();
    }
    res.status(200).json({ error });
});

// Edit Set Name
app.patch('/api/editsets', async (req, res) => {
    const { userId, setId, newName } = req.body;
    console.log('Update: ', setId);
    let error = '';

    try {
        const db = client.db('project');
        const updateResult = await db.collection('StudySets').updateOne(
            { userId: userId, _id: new ObjectId(setId) },
            { $set: { name: newName } }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'No study set found' });
        }
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
            { userId: userId, name: setName },
            { $push: { flashcards: flashcard } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Study set not found' });
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ error });
});

// Delete Flashcard
app.delete('/api/deleteflashcard', async (req, res) => {
    const { userId, setName, flashcardId } = req.body;
    let error = '';

    try {
        const db = client.db('project');
        const result = await db.collection('StudySets').updateOne(
            { userId: userId, name: setName },
            { $pull: { flashcards: { id: flashcardId } } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ error });
});

// Edit Flashcard
app.patch('/api/editflashcard', async (req, res) => {
    const { userId, setName, flashcardId, newTerm, newDefinition } = req.body;
    let error = '';

    try {
        const db = client.db('project');
        const result = await db.collection('StudySets').updateOne(
            { userId: userId, name: setName, "flashcards.id": flashcardId },
            { $set: { "flashcards.$.term": newTerm, "flashcards.$.definition": newDefinition } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
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
        const results = await db.collection('StudySets').find({ userId: userId, name: { $regex: _search + '.*' } }).toArray();

        for (let i = 0; i < results.length; i++) {
            _ret.push([results[i]._id, results[i].name]);
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ results: _ret, error });
});

// View Study Set
app.post('/api/viewset', async (req, res) => {
    const { userId, setName } = req.body;
    let error = '';
    let _ret = null;

    console.log(req.body);

    try {
        const db = client.db('project');
        const results = await db.collection('StudySets').findOne({ userId: userId, name: setName });

        if (results) {
            _ret = {
                id: results._id.toString(),
                name: results.name,
                flashcards: results.flashcards,
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
        const results = await db.collection('StudySets').findOne({ _id: new ObjectId(setId) });

        if (results && results.flashcards) {
            _ret = results.flashcards;
        }
    } catch (e) {
        error = e.toString();
    }

    res.status(200).json({ results: _ret, error });
});
