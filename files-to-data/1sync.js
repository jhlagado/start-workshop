const fs = require('fs');
const path = require('path');

const loadFile = sourceDir => (filename) => {
  const srcFilePath = path.join(sourceDir, filename);
  const text = fs.readFileSync(srcFilePath, 'utf-8');
  const item = JSON.parse(text);
  if (!item.id) throw new Error('Format error: expected item to contain "id"');
  return item;
};

const saveData = (destPath, data) => {
  data.sort((item1, item2) => item1.id - item2.id);
  const string = JSON.stringify(data, null, 2);
  fs.writeFileSync(destPath, string);
};

const sourceDir = path.join(__dirname, 'source');
const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

try {
  fs.accessSync(destDir);
} catch (err) {
  fs.mkdirSync(destDir);
}
try {
  const srcFiles = fs.readdirSync(sourceDir);
  const data = srcFiles.map(loadFile(sourceDir));
  saveData(destFilePath, data);
  console.log('done!');
} catch (err) {
  console.log(err.message);
}
