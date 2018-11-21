const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'The title you want for the note.  This should be unique.',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'The body you want for the note.',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note.', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes.')
    .command('read', 'Display a single note by title.', {
        title: titleOptions
    })
    .command('remove', 'Remove a note by title.', {
        title: titleOptions
    })
    .help()
    .argv;

// parse out the command
var command = argv._[0];

// execute the command
if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created:');
        console.log(notes.formatNote(note));
    } else {
        // no note returned
        console.log('Couldn\'t create note with title:', argv.title);
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    if (allNotes) {
        console.log(`Displaying ${allNotes.length} notes`)
        allNotes.forEach( (element) => console.log(notes.formatNote(element)));
    } else {
        console.log("No notes found.");
    }
} else if (command === 'remove') {
    var removedNote = notes.removeNote(argv.title);
    var message = removedNote ? `Note ${argv.title} removed successfully.` : `Note ${argv.title} not found.`;
    console.log(message);
} else if (command === 'read') {
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
