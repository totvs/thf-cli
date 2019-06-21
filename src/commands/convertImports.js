const fileSystem = require('fs');

function convertImports(srcPath) {

  const files = fileSystem.readdirSync(directory);

  for (let i=0; i < files.length; i++) {
    // path.step recupera o separador específico do SO
    const file = `${directory}${path.sep}${files[i]}`;

    if((/(\.(gif|jpg|jpeg|tiff|png|ico|git))|(node_modules)$/i).test(file)) {
      continue;
    }

    const stats = fileSystem.statSync(file);

    if(stats.isFile()) {
      convertFileImport(file);

    } else if(stats.isDirectory()) {
      convertDirectory(file);
    }
  }

}

function convertFileImport(file) {

}

function getFileSync(fileName) {
  return JSON.parse(fileSystem.readFileSync(fileName, 'utf-8'));
}

function writeFileSync(fileName, data) {
  fileSystem.writeFileSync(fileName, data);
}

module.exports = { convertImports };