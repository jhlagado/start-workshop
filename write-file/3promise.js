const fs = require('fs').promises;
const path = require('path');

const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

const saveFile = (object) => {
  const text = JSON.stringify(object, null, 2);
  return fs.writeFile(destFilePath, text);
};

const run = (object) => {
  fs.access(destDir)
    .catch(() => fs.mkdir(destDir))
    .then(() => saveFile(object))
    .then(() => console.log('file has been saved'))
    .catch(err => console.log(err.message));
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
