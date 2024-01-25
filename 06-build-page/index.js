const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const dist = 'project-dist';
const distdir = path.join(__dirname, dist);

// create dist folder
fs.mkdir(distdir, { recursive: true }, (err) => {
  if (err) return console.log(err);
});

async function createHTML() {
  try {
    const templateSource = await fsPromise.readFile(
      path.join(__dirname, 'template.html'),
      'utf8',
    );

    const files = await fsPromise.readdir(path.join(__dirname, '/components'));

    let data = {};

    await Promise.all(
      files.map(async (file) => {
        let name = path.parse(file).name;
        data[name] = await fsPromise.readFile(
          path.join(__dirname, `/components/${name}.html`),
          'utf8',
          (err) => {
            if (err) console.log(err);
          },
        );
      }),
    );

    const renderedTemplate = templateSource.replace(
      /\{\{(\w+)\}\}/g,
      (match, key) => data[key],
    );

    await fs.promises.writeFile(
      `${distdir}/index.html`,
      renderedTemplate,
      (err) => {
        if (err) throw err;
      },
    );
  } catch (error) {
    console.log(error);
  }
}

createHTML();

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
        path.join(__dirname, 'project-dist/style.css'),
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
  fs.readFile(path.join(__dirname, `${dist}/style.css`), (err) => {
    if (!err) {
      fs.writeFile(path.join(__dirname, `${dist}/style.css`), '', () => {});
    }
  });
  files.forEach((file) => {
    readdir(file);
  });
});

//copy dir
fs.cp(
  path.join(__dirname, 'assets'),
  path.join(__dirname, `${dist}/assets`),
  { recursive: true },
  (error) => {
    if (error) throw error;
  },
);
