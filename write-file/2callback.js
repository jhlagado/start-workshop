const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

const saveFile = (object, callback) => {
  const text = JSON.stringify(object, null, 2);
  fs.writeFile(destFilePath, text, callback);
};

const goWith = object => err => {
  try {
    if (err) throw err;
    saveFile(object, (err) => {
      if (err) throw err;
      console.log('file has been saved');
    });
  } catch (err) {
    console.log(err.message);
  }
};

const run = (object) => {
  const go = goWith(object);
  fs.access(destDir, (err) => {
    if (err) {
      fs.mkdir(destDir, go);
    } else {
      go();
    }
  });
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
