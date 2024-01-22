const fs = require('fs');
const path = require('path');

const dist = 'project-dist';
const distdir = path.join(__dirname, dist);

function copyFile(fromFolder, toFolder, fromFile, toFile) {
  fs.copyFile(
    path.join(__dirname, fromFolder, fromFile),
    path.join(__dirname, toFolder, toFile),
    (err) => {
      if (err) throw err;
    },
  );
}

// create dist folder
fs.mkdir(distdir, { recursive: true }, (err) => {
  if (err) return console.log(err);
});

// setup index.html
copyFile('', dist, 'template.html', 'index.html');

// compile styles
function readdir(file) {
  if (path.parse(file).ext == '.css') {
    let compiledStyles = '';
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

//copy dir
fs.mkdir(path.join(__dirname, 'assets'), { recursive: true }, (err) => {
  if (err) return console.log(err);
  fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
    if (err) throw err;
    console.log(files);
  });
});
