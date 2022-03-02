
const { createNewNote, validateNote } = require('../../lib/notes');
const notes = require('../../Develop/db/db.json');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
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

module.exports = router;
