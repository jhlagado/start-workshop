const fs = require('fs').promises;
const path = require('path');

const loadFile = sourceDir => async (filename) => {
  const srcFilePath = path.join(sourceDir, filename);
  const text = await fs.readFile(srcFilePath, 'utf-8');
  const item = JSON.parse(text);
  if (!item.id) throw new Error('Format error: expected item to contain "id"');
  return item;
};

const saveData = (destPath, data) => {
  data.sort((item1, item2) => item1.id - item2.id);
  const string = JSON.stringify(data, null, 2);
  return fs.writeFile(destPath, string);
};

const sourceDir = path.join(__dirname, 'source');
const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

const run = async () => {
  try {
    await fs.access(destDir);
  } catch (err) {
    await fs.mkdir(destDir);
  }
  try {
    const srcFiles = await fs.readdir(sourceDir);
    const promises = srcFiles.map(loadFile(sourceDir));
    const data = await Promise.all(promises);
    saveData(destFilePath, data);
    console.log('done!');
  } catch (err) {
    console.log(err.message);
  }
};

run();
