const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'The note title.',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'The note body.',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command(['add', 'a'], 'Add a new note.', {
        title: titleOptions,
        body: bodyOptions
    })
    .command(['list', 'l'], 'List all notes.')
    .command(['read', 'r'], 'Display a single note by title.', {
        title: titleOptions
    })
    .command(['delete', 'd'], 'Delete a note by title.', {
        title: titleOptions
    })
    .help()
    .argv;

// parse out the command
var command = argv._[0];

// execute the command
if (command === 'add' || command === 'a') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created:');
        console.log(notes.formatNote(note));
    } else {
        // no note returned
        console.log('Couldn\'t create note with title:', argv.title);
    }
} else if (command === 'list' || command === 'l') {
    var allNotes = notes.getAll();
    if (allNotes) {
        console.log(`Displaying ${allNotes.length} notes`)
        allNotes.forEach( (element) => console.log(notes.formatNote(element)));
    } else {
        console.log("No notes found.");
    }
} else if (command === 'delete' || command === 'd') {
    var removedNote = notes.removeNote(argv.title);
    var message = removedNote ? `Note ${argv.title} deleted successfully.` : `Note ${argv.title} not found.`;
    console.log(message);
} else if (command === 'read' || command === 'r') {
    var selectedNote = notes.getNote(argv.title);
    if (selectedNote) {
        console.log('Note retrieved:');
        console.log(notes.formatNote(selectedNote));
    } else {
        console.log(`Couldn't find note with title ${argv.title}.`);
    }
} else {
    // unable to determine the correct command
    console.log('Command not recogenized.  Try node app.js --help.');
}
