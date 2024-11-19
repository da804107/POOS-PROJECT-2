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
const url = 'mongodb+srv://GroupAccess:pROjECT2_gROuP@proj-2.ghujw.mongodb.net/?retryWrites=true&w=majority&appName=PROJ-2';
const client = new MongoClient(url);
client.connect();

//SignUp
app.post('/api/signup', async (req, res, next) => {
    // incoming, username, pass
    // outgoing error

    const {username, password} = req.body;

    const newUser = {UserId: null, Username: username, Password: password};

    try {
    const db = client.db();
    newUser.UserId = await db.collection('Users').countDocuments();
    /*        commented out for testing
    if(await db.collection('Users').findOne({Username: newUser.Username, Password: newUser.Password})) {
        return res.status(400).json({ error: 'User already exists' });
    }
    */
    const results = await db.collection('Users').insertOne(newUser);

    } catch(e) {
        error = e.toString();
    }
    
    var ret = { error: error };
    res.status(200).json(ret);
});

//Login
app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    const db = client.db();
    const results = await
        db.collection('Users').find({ Username: login, Password: password }).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
    if (results.length > 0) {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    } else {
        error = 'Wrong username/password'
    }
    var ret = { id: id, firstName: fn, lastName: ln, error: error };
    res.status(200).json(ret);
});

//Add Card to Study Set
app.post('/api/addcard', async (req, res, next) => {
    // incoming: userId, color
    // outgoing: error
    const { userId, setName, cardTitle, cardDesc } = req.body;
    const newCard = { SetName: setName, CardTitle: cardTitle, CardDesc: cardDesc, UserId: userId };
    var error = '';
    try {
        const db = client.db();
        const result = db.collection('Flash-Cards').insertOne(newCard);
    }
    catch (e) {
        error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
});

//Add Study Set
app.post('/api/addset', async (req, res, next) => {
    // incoming: userId, color
    // outgoing: error
    const { userId, setName } = req.body;
    const newSet = { SetName: SetName, UserId: userId };
    var error = '';
    try {
        const db = client.db();
        const result = db.collection('Study-Sets').insertOne(newSet);
    }
    catch (e) {
        error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
});

//Search Study Set
app.post('/api/searchcards', async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { userId, search } = req.body;
    var _search = search.trim();
    const db = client.db();
    const results = await db.collection('Study-Sets').find({ UserId: userId, SetName: { $regex: _search + '.*' } }).toArray();
    var _ret = [];
    for (var i = 0; i < results.length; i++) {
        _ret.push(results[i].Card);
    }
    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
});

//Search Flash Cards
app.post('/api/searchcards', async (req, res, next) => {
    // incoming: userId, setName
    // outgoing: results[], error
    var error = '';
    const { userId, setName } = req.body;
    var _search = search.trim();
    const db = client.db();
    const results = await db.collection('Flash-Cards').find({ UserId: userId, SetName: setName }).toArray();
    var _ret = [];
    for (var i = 0; i < results.length; i++) {
        _ret.push(results[i].Card);
    }
    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
});
