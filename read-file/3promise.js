const fs = require('fs').promises;
const path = require('path');

const srcFilePath = path.join(__dirname, 'source/data.json');

const loadFile = () =>
  fs.readFile(srcFilePath, 'utf-8')
    .then((text) => {
      const object = JSON.parse(text);
      if (!object.id) {
        throw new Error('Format error: expected item to contain "id"');
      }
      return object;
    });

const run = () => {
  loadFile(srcFilePath)
    .then((object) => {
      const string = JSON.stringify(object, null, 2);
      console.log(`JSON data loaded: ${string}`);
    })
    .catch(err => console.log(err.message));
};

run();
