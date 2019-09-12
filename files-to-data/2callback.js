const fs = require('fs');
const path = require('path');

const loadFile = (sourceDir, callback) => (filename) => {
  const srcFilePath = path.join(sourceDir, filename);
  fs.readFile(srcFilePath, 'utf-8', (err, text) => {
    if (err) return callback(err);
    const item = JSON.parse(text);
    if (!item.id) throw new Error('Format error: expected item to contain "id"');
    callback(null, item);
  });
};

const saveData = (destPath, data, callback) => {
  data.sort((item1, item2) => item1.id - item2.id);
  const string = JSON.stringify(data, null, 2);
  fs.writeFile(destPath, string, callback);
};

const sourceDir = path.join(__dirname, 'source');
const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

const go = (err) => {
  try {
    if (err) throw err;
    fs.readdir(sourceDir, (err, srcFiles) => {
      if (err) throw err;
      const data = [];
      srcFiles.forEach(loadFile(sourceDir, (err, item) => {
        if (err) throw err;
        data.push(item);
        if (data.length === srcFiles.length) {
          saveData(destFilePath, data, (err) => {
            if (err) throw err;
            console.log('done!');
          });
        }
      }));
    });
  } catch (e) {
    console.log(e.message);
  }
};

fs.access(destDir, (err) => {
  if (err) {
    fs.mkdir(destDir, go);
  } else {
    go();
  }
});
