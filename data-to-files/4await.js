const fs = require('fs').promises;
const path = require('path');

const loadData = async (srcPath) => {
  const text = await fs.readFile(srcPath, 'utf8');
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('Format error: expected array');
  return data;
};

const saveFile = destDir => (item) => {
  if (!item.id) throw new Error('Format error: expected item to contain "id"');
  const destFilePath = path.join(destDir, `${item.id}.json`);
  const string = JSON.stringify(item, null, 2);
  return fs.writeFile(destFilePath, string);
};

const srcFilePath = path.join(__dirname, 'source/data.json');
const destDir = path.join(__dirname, 'dest');

const run = async () => {
  try {
    try {
      await fs.access(destDir);
    } catch (err) {
      await fs.mkdir(destDir);
    }
    const data = await loadData(srcFilePath);
    const promises = data.map(saveFile(destDir));
    await Promise.all(promises);
    console.log('done!');
  } catch (err) {
    console.log(err.message);
  }
};

run();
