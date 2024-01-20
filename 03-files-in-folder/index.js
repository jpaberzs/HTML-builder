const fs = require('node:fs');
const path = require('node:path');
const dir = path.join(__dirname, 'secret-folder');

function fileStats(file) {
  fs.stat(`${dir}/${file}`, (err, stats) => {
    if (err) {
      console.log(err);
      return;
    }
    const fileName = path.parse(file).name;
    const fileExt = path.parse(file).ext.slice(1);
    const fileSize = stats.size / 1000 + 'kb';
    if (stats.isFile()) {
      console.log(fileName, fileExt, fileSize);
    }
  });
}

fs.readdir(dir, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fileStats(file);
  });
});
