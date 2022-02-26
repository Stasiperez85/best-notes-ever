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

const notes = require('./Develop/db/db.json');
const { v4: uuidv4 } = require('uuid');

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0)
        notesArray.push(0);

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

function validateNote(newNote) {
    if (!newNote.title || typeof newNote.title !== 'string') {
        return false;
    }
    if (!newNote.text || typeof newNote.text !== 'string') {
        return false;
    }
    return true;
}


app.post('/api/notes', (req, res) => {
    console.log(req.body);
    req.body.id = uuidv4();
    console.log(req.body);
    if (!validateNote(req.body)) {
        return res.status(400).send('Add information to create your note.');
    } else {
        const newNote = createNewNote(req.body, notes);
        res.json(newNote);
    }
});

// app.delete('/api/notes', (req, res) => {
//     deleteNote(req.params.id, notes);
//     res.json(true);
//     res.send('Got a DELETE request at /user')
// });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});