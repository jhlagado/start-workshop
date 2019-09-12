const fs = require('fs').promises;
const path = require('path');

const loadFile = sourceDir => (filename) => {
  const srcFilePath = path.join(sourceDir, filename);
  fs.readFile(srcFilePath, 'utf-8')
    .then((text) => {
      const item = JSON.parse(text);
      if (!item.id) throw new Error('Format error: expected item to contain "id"');
      return item;
    });
};

const saveData = (destPath, data) => {
  data.sort((item1, item2) => item1.id - item2.id);
  const string = JSON.stringify(data, null, 2);
  return fs.writeFile(destPath, string);
};

const sourceDir = path.join(__dirname, 'source');
const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

fs.access(destDir)
  .catch(() => fs.mkdir(destDir))
  .then(() => fs.readdir(sourceDir))
  .then(srcFiles => srcFiles.map(loadFile(sourceDir)))
  .then(promises => Promise.all(promises))
  .then(data => saveData(destFilePath, data))
  .then(() => console.log('done!'))
  .catch(err => console.log(err.message));
