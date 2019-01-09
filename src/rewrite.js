const fs = require('fs');
const replace = require('replace-in-file');

class Rewrite {

  packageJson(file, projectName) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', function (err, data) {
        const lowerCaseProjectName = projectName.toLowerCase();
        const packageName = `"name": "${lowerCaseProjectName}",`;

        if (err) {
          reject();
          return console.log(err);
        }

        let replacedData = data.replace(/"name": "PLACEHOLDER",/g, packageName);

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

  async projectName(destination, projectName) {
    const path = destination.replace(/\\/g, '/');

    const files = [
      `${path}/angular.json`,
      `${path}/e2e/src/app.e2e-spec.ts`,
      `${path}/README.md`,
      `${path}/src/index.html`,
    ];

    const options = {
      files,
      from: /PLACEHOLDER/g,
      to: projectName ,
    };

    replace(options);
  }

}

module.exports = new Rewrite();
