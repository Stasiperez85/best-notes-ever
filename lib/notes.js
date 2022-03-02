const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0)
        notesArray.push(0);

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../Develop/db/db.json'),
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

module.exports = {
    createNewNote,
        validateNote
};
