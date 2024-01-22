const fs = require('fs');
const path = require('path');

const dist = 'project-dist';

let compiledStyles = '';

// create dist folder
fs.mkdir(path.join(__dirname, dist), { recursive: true }, (err) => {
  if (err) return console.log(err);
});

// setup index.html
fs.copyFile(
  path.join(__dirname, '', 'template.html'),
  path.join(__dirname, dist, 'index.html'),
  (err) => {
    if (err) throw err;
  },
);

function readdir(file) {
  if (path.parse(file).ext == '.css') {
    const readerStream = fs.createReadStream(
      path.join(__dirname, `/styles/${file}`),
      'utf8',
    );
    readerStream.on('data', (chunk) => {
      compiledStyles += chunk;
    });
    readerStream.on('end', () => {
      fs.appendFile(
        path.join(__dirname, 'project-dist/main.css'),
        compiledStyles,
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

// compile styles
fs.readdir(path.join(__dirname, '/styles/'), (err, files) => {
  if (err) throw err;
  // console.log(files);
  fs.readFile(path.join(__dirname, `${dist}/main.css`), (err) => {
    if (!err) {
      fs.writeFile(path.join(__dirname, `${dist}/main.css`), '', () => {});
    }
  });
  files.forEach((file) => {
    readdir(file);
  });
});
