console.log('Starting notes.js');

const fs = require('fs');

var fetechNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes-data.json'));
    } catch (err) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetechNotes();
    
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } 
};

var getAll = () => {
    console.log('Retrieving all notes...');
}

var removeNote = (title) => {
    // fetch notes
    var notes = fetechNotes();

    // filter out any that match the title
    var filteredNotes = notes.filter( (note) => note.title !== title);
    
    // save out new notes
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
}

var getNote = (title) => {
    // fetch notes
    var notes = fetechNotes();

    // filter to the note we want
    var selectedNotes = notes.filter( (note) => note.title === title);

    // return the first note in the filtered note array (the one we want)
    return selectedNotes[0];
}

var formatNote = (note) => {
    var formattedNote = "--\n";
    formattedNote += `Title: ${note.title}\n`;
    formattedNote += `Body: ${note.body}\n`;
    return formattedNote;
}

module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    formatNote
};
