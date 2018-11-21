console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
// print all arguments to the command line
console.log('process.argv:\n', process.argv);
console.log('yargs.argv:\n', argv);

// parse out the command
var command = argv._[0];
console.log(command);

// execute the command
if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created:');
        console.log(note);
    } else {
        // no note returned
        console.log('Couldn\'t create note with title:', argv.title);
    }
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'remove') {
    var removedNote = notes.removeNote(argv.title);
    var message = removedNote ? `Note ${argv.title} removed successfully.` : `Note ${argv.title} not found.`;
    console.log(message);
} else if (command === 'read') {
    notes.getNote(argv.title);
} else {
    // unable to determine the correct command
    console.log('Command not recogenized.  Print help.');
}
