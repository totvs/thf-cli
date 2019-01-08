const fs = require('fs');

class Rewrite {

  packageJson(file, projectName) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', function (err, data) {
        const packageName = `"name": "${projectName}",`;

        if (err) {
          reject();
          return console.log(err);
        }

        let replacedData = data.replace(/"name": "sidemenu",/g, packageName);

        fs.writeFile(file, replacedData, 'utf8', function (err) {
          if (err) return console.log(err);
          resolve();
        });
      });
    })
  }

  projectTitle(file, title) {
    return new Promise((resolve, reject) => {

      fs.readFile(file, 'utf8', (err, data) => {
        const newTitle = `t-title="${title}"`;

        if (err) {
          reject();
          return console.log(err);
        }

        let replacedData = data.replace(/t-title="THF"/g, newTitle);

        fs.writeFile(file, replacedData, 'utf8', function (err) {
          if (err) return console.log(err);
          resolve();
        });
      });
    })
  }

}

module.exports = new Rewrite();
