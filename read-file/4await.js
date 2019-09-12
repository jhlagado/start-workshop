const fs = require('fs').promises;
const path = require('path');

const srcFilePath = path.join(__dirname, 'source/data.json');

const loadFile = async () => {
  const text = await fs.readFile(srcFilePath, 'utf-8');
  const object = JSON.parse(text);
  if (!object.id) {
    throw new Error('Format error: expected item to contain "id"');
  }
  return object;
};

const run = async () => {
  try {
    const object = await loadFile(srcFilePath);
    const string = JSON.stringify(object, null, 2);
    console.log(`JSON data loaded: ${string}`);
  } catch (err) {
    console.log(err.message);
  }
};

run();
