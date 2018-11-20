console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes');

console.log(notes.addNote());
console.log(notes.add(1, 1));

// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username}!  You are ${notes.age} years old.\n`, function (err) {
//     if (err) {
//         console.log('Unable to write to file: greetings.txt');
//     }
// });
