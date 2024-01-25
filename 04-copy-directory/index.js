const fs = require('fs');
const path = require('path');

function copyfile(file) {
  fs.copyFile(
    path.join(__dirname, 'files', file),
    path.join(__dirname, 'files-copy', file),
    (err) => {
      if (err) throw err;
    },
  );
}

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) return console.log(err);
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err;
    files.forEach((file) => copyfile(file));
    fs.readdir(path.join(__dirname, 'files-copy'), (err, filesCopy) => {
      if (err) throw err;
      filesCopy.forEach((fileCopy) => {
        if(files.indexOf(fileCopy) === -1) {
          fs.unlink(path.join(__dirname, 'files-copy', fileCopy), (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
});
