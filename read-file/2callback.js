const fs = require('fs');
const path = require('path');

const srcFilePath = path.join(__dirname, 'source/data.json');

const loadFile = (filename, callback) => {
  fs.readFile(srcFilePath, 'utf-8', (err, text) => {
    if (err) return callback(err, null);
    const object = JSON.parse(text);
    if (!object.id) {
      callback(new Error('Format error: expected item to contain "id"'), null);
    }
    callback(null, object);
  });
};

const run = () => {
  loadFile(srcFilePath, (err, object) => {
    if (err) {
      console.log(err.message);
    } else {
      const string = JSON.stringify(object, null, 2);
      console.log(`JSON data loaded: ${string}`);
    }
  });
};

run();
