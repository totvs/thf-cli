const fs = require('fs');
const getDirName = require('path').dirname;
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const generate = require('./generate');

class FileWriter {

  constructor() {
    this.moduleName = '';
    this.fileName = '';
    this.filePath = '';
  }
  
  writeFile(path, content, cb) {
    try {

      mkdirp(getDirName(path), function (err) {
        if (err) return cb(err);

        fs.writeFile(path, content, result => {
          if (result) {
            console.error(`Error on write file`);
            return;
          }
    
          console.log(chalk.green.bold('CREATE'), path);
        });
      });

    } catch (e) {
      console.log(chalk.red.bold('ERROR'), fullpath, e);
    }
  }

  config(newModuleName) {
    this.fileName = _getFileName(newModuleName);
    this.moduleName = _getModuleName(this.fileName);

    const destination = _getDestination(this.fileName);

    this.filePath = `${destination}/${this.fileName}`;
  }

  createRoutingModule(componentSelected) {
    const routingModuleSource = generate.routingModuleSource(this.fileName, this.moduleName, componentSelected);

    this.writeFile(`${this.filePath}-routing.module.ts`, routingModuleSource)
  }

  createTemplateFile (componentSelected) {
    const htmlSource = generate.htmlSource(this.moduleName, componentSelected);

    this.writeFile(`${this.filePath}.component.html`, htmlSource);
  }

  createComponentFile(serviceSelected) {
    const componentSource = generate.componentSource(this.fileName, this.moduleName, serviceSelected)

    this.writeFile(`${this.filePath}.component.ts`, componentSource);
  }

  createModuleFile(componentSelected) {
    const moduleSource = generate.moduleSource(this.fileName, this.moduleName, componentSelected);

    this.writeFile(`${this.filePath}.module.ts`, moduleSource);
  }

};

function _getFileName(moduleName) {
  return moduleName.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/).map(v => v.toLowerCase()).join('-');
}

function _getModuleName(fileName) {
  return fileName.split('-').map(v => v.charAt(0).toUpperCase() + v.substr(1)).join('');
}

// TODO: check has a relative path
function _getDestination(folderName) {
  let currentFolder = process.cwd();
  currentFolder = currentFolder.replace(/\\/g, '/');

  return `${currentFolder}/src/app/${folderName}`;
}

module.exports = new FileWriter();