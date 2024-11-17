const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-TypeError, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.listen(5000); //start Node + Express server on port 5000

//Database
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://da804107:<db_password>@proj-2.ghujw.mongodb.net/?retryWrites=true&w=majority&appName=PROJ-2';
const client = new MongoClient(url);
client.connect();

app.post('/api/signup', async (req, res, next) => {
    // incoming, username, pass
    // outgoing error

    const {username, password} = req.body;

    const newUser = {UserId: null, Username: username, Password: password};

    try {
    const db = client.db();
    newUser.UserId = await db.collection('Users').countDocuments();
    
    if(await db.collection('Users').findOne({Username: newUser.Username, Password: newUser.Password})) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const results = await db.collection('Users').insertOne(newUser).toArray();
    } catch(e) {
        error = e.toString();
    }
    
    var ret = { error: error };
    res.status(200).json(ret);
});
