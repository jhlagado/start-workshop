const fs = require('fs');
const path = require('path');

const loadData = (srcPath, callback) => {
  fs.readFile(srcPath, 'utf8', (err, text) => {
    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) return callback(new Error('Format error: expected array'));
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  });
};

const saveFile = (destDir, callback) => (item) => {
  if (!item.id) throw new Error('Format error: expected item to contain "id"');
  const destFilePath = path.join(destDir, `${item.id}.json`);
  item.full_name = `${item.first_name} ${item.last_name}`;
  const string = JSON.stringify(item, null, 2);
  fs.writeFile(destFilePath, string, (err) => {
    if (err) {
      return callback(err);
    }
    fs.stat(destFilePath, (err, stats) => {
      if (err) {
        return callback(err);
      }
      callback(null, stats.size);
    })
  });
};

const srcFilePath = path.join(__dirname, 'source/data.json');
const destDir = path.join(__dirname, 'dest');

const go = (err) => {
  try {
    if (err) throw err;
    loadData(srcFilePath, (err, data) => {
      if (err) throw err;
      let count = 0;
      const sizes = [];
      data.forEach(saveFile(destDir, (err, size) => {
        if (err) throw err;
        count++;
        sizes.push(size);
        if (count === data.length) {
          console.log(`done! ${sizes}`);
        }
      }));
    });
  } catch (err) {
    console.log(err.message);
  }
};

const run = () => {
  fs.access(destDir, (err) => {
    if (err) {
      fs.mkdir(destDir, go);
    } else {
      go();
    }
  });
};

run();
