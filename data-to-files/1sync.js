const fs = require('fs');
const path = require('path');

const loadData = (srcPath) => {
  const text = fs.readFileSync(srcPath, 'utf8');
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('Format error: expected array');
  return data;
};

const saveFile = destDir => (item) => {
  if (!item.id) throw new Error('Format error: expected item to contain "id"');
  const destFilePath = path.join(destDir, `${item.id}.json`);
  const string = JSON.stringify(item, null, 2);
  fs.writeFileSync(destFilePath, string);
};

const srcFilePath = path.join(__dirname, 'source/data.json');
const destDir = path.join(__dirname, 'dest');

const run = () => {
  try {
    try {
      fs.accessSync(destDir);
    } catch (err) {
      fs.mkdirSync(destDir);
    }
    const data = loadData(srcFilePath);
    data.forEach(saveFile(destDir));
    console.log('done!');
  } catch (err) {
    console.log(err.message);
  }
};

run();
