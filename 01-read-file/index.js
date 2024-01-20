const fs = require('node:fs');
const path = require('node:path');
const readerStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
let result = '';

readerStream.setEncoding('UTF8');

readerStream.on('data', (chunk) => {
  result += chunk;
});

readerStream.on('end', () => {
  console.log(result);
});

readerStream.on('error', (err) => {
  console.log(err.stack);
});
