const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

const saveFile = (object) => {
  const text = JSON.stringify(object, null, 2);
  fs.writeFileSync(destFilePath, text);
};

const run = (object) => {
  try {
    try {
      fs.accessSync(destDir);
    } catch (err) {
      fs.mkdirSync(destDir);
    }
    saveFile(object);
    console.log('file has been saved');
  } catch (err) {
    console.log(err.message);
  }
};

run({
  id: 1,
  _created: 1558960265061,
  _modified: 1558960265061,
  first_name: 'Beaufort',
  last_name: 'Gloster',
  email: 'bgloster0@shinystat.com',
  gender: 'Male',
  ip_address: '200.237.250.103'
});
