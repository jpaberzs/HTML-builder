const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, 'text.txt');

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

const process = require('node:process');

console.log('Hi user, welcome to console...(Write some text)');

rl.on('line', (line) => {
  if (line === 'exit') process.exit();
  fs.appendFile(file, `${line}\n`, (err) => {
    if (err) throw err;
  });
});

process.on('exit', () => {
  console.log('You are just exited from the console, have a nice day!');
});
