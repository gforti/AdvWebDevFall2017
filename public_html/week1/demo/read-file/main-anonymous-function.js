/*
 * This is the most simple level of how to read a file in Node.js
 */


var fileSystem = require('fs');

fileSystem.readFile('input.txt' , function (err, data) {
    if (err) return console.error(err);
    console.log( data.toString() );
});

console.log('Program completed');
