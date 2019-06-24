const chalk = require('chalk');
const fileSystem = require('fs');
const pathNode = require('path');

function convertImports(directory) {

  const files = fileSystem.readdirSync(directory);

  for (let i=0; i < files.length; i++) {
    // pathNode.step recupera o separador específico do SO
    const file = `${directory}${pathNode.sep}${files[i]}`;

    if((/node_modules$/i).test(file)) {
      continue;
    }

    const stats = fileSystem.statSync(file);

    if(stats.isFile() && (/\.(ts)$/i).test(file)) {
      convertFileImport(file);

    } else if(stats.isDirectory()) {
      convertImports(file);
    }
  }

}

function convertFileImport(file) {
  const fileData = getFileSync(file);
  const lines = fileData.split(/\n/);
  const importPrefix = '@totvs/thf-';

  const newLines = lines.map(line => {
    if (line.includes(importPrefix)) {
      const regexResult = line.match(/('|")(@totvs\/thf-(ui|storage|templates|sync)\/(.*?))('|")/);

      if (regexResult) {
        const word = regexResult[2];
        const thfProject = `@totvs/thf-${regexResult[3]}`;
        return line.replace(word, thfProject);
      }
    }

    return line;
  });

  const newDataFile = newLines.join('\n');

  if (fileData !== newDataFile) {
    onUpdate(file);
  }

  writeFileSync(file, newDataFile);
}

function getFileSync(fileName) {
  return fileSystem.readFileSync(fileName, 'utf-8');
}

function writeFileSync(fileName, data) {
  fileSystem.writeFileSync(fileName, data);
}

function onUpdate(filePath) {
  if (filePath) {
    console.log(chalk.green('ATUALIZADO: '), filePath);
  }
}

module.exports = convertImports;