const fs = require('fs');
const path = require('path');

function readdir(file) {
  if (path.parse(file).ext == '.css') {
    let result = '';
    const readerStream = fs.createReadStream(
      path.join(__dirname, `/styles/${file}`),
      'utf8',
    );
    readerStream.on('data', (chunk) => {
      result += chunk;
    });
    readerStream.on('end', () => {
      fs.appendFile(
        path.join(__dirname, 'project-dist/bundle.css'),
        result,
        (err) => {
          if (err) throw err;
        },
      );
    });
    readerStream.on('error', (err) => {
      console.log(err.stack);
    });
  }
}

// fs.mkdir(path.join(__dirname, 'styles'), { recursive: true }, (err) => {
//   if (err) return console.log(err);
// });
fs.readdir(path.join(__dirname, '/styles/'), (err, files) => {
  if (err) throw err;
  // console.log(files);
  fs.readFile(path.join(__dirname, 'project-dist/bundle.css'), (err) => {
    if (!err) {
      fs.writeFile(
        path.join(__dirname, 'project-dist/bundle.css'),
        '',
        () => {},
      );
    }
  });
  files.forEach((file) => {
    readdir(file);
  });
});
