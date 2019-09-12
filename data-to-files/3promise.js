const fs = require('fs').promises;
const path = require('path');

const loadData = srcPath =>
  fs.readFile(srcPath, 'utf8')
    .then((text) => {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error('Format error: expected array');
      return data;
    });

const saveFile = destDir => (item) => {
  if (!item.id) throw new Error('Format error: expected item to contain "id"');
  const destFilePath = path.join(destDir, `${item.id}.json`);
  const string = JSON.stringify(item, null, 2);
  return fs.writeFile(destFilePath, string);
};

const srcFilePath = path.join(__dirname, 'source/data.json');
const destDir = path.join(__dirname, 'dest');

const run = () => {
  fs.access(destDir)
    .catch(() => fs.mkdir(destDir))
    .then(() => loadData(srcFilePath))
    .then(data => data.map(saveFile(destDir)))
    .then(promises => Promise.all(promises))
    .then(() => console.log('done!'))
    .catch(err => console.log(err.message));
};

run();
