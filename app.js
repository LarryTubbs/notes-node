console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes');
const _ = require('lodash');

var filteredArray = _.uniq(['Larry', 1, 'Larry', 1, 2 , 3, 4]);
console.log(filteredArray);
console.log(_.isString(true));
console.log(_.isString('Larry'));

// console.log(notes.addNote());
// console.log(notes.add(1, 1));

// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username}!  You are ${notes.age} years old.\n`, function (err) {
//     if (err) {
//         console.log('Unable to write to file: greetings.txt');
//     }
// });
