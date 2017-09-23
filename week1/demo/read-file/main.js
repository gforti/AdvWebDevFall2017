
/*
 * This is the most simple level of how to read a file in Node.js
 * We can define the call-back function rather than just resorting to
 * an anonymous function
 */


var fileSystem = require('fs');

fileSystem.readFile('input.txt' , callback);

function callback(err, data) {
    if (err) return console.error(err);
    console.log( data.toString() );
}

console.log('Program completed');

