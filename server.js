const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

const { notes } = require('./Develop/db/db.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});