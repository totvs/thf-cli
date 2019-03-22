const inquirer = require('inquirer');
const chalk = require('chalk');
const build = require('../build');
const fileWriter = require('../file-writer');

// CONSTS PROMPT
const componentsListPrompt = {
  type: 'list',
  name: 'component',
  message: `Choose a dynamic component to create:`,
  choices: [
    'ThfPageDynamicDetail',
    'ThfPageDynamicEdit',
    'ThfPageDynamicTable'
  ]
};

const servicePrompt = {
  name: 'service',
  message: `Enter the service to be used by the component:`
};

async function add(moduleName) {
  const { component, service } = await inquirer.prompt([componentsListPrompt, servicePrompt]);

  try {

    const packageJson = _getPackageJson();

    if (!_containsTemplatesPackage(packageJson)) {
      const thfVersion = await _getThfVersion(packageJson);
      const version = thfVersion ? `${thfVersion}` : 'latest';

      await build.installPackages(`@totvs/thf-templates@${version}`);
    }

    fileWriter.config(moduleName);

    fileWriter.createModuleFile(component);
    fileWriter.createComponentFile(service);
    fileWriter.createRoutingModule(component);
    fileWriter.createTemplateFile(component);

  } catch (e) {
    console.log(chalk.red('There was an error in generating the files'), e);
  }
}

function _containsTemplatesPackage(packageJson) {
  return packageJson['dependencies']['@totvs/thf-templates'];
}

function _getPackageJson() {
  return require(`${process.cwd()}\\package.json`);
}

function _getThfVersion(packageJson) {
  return packageJson['dependencies']['@totvs/thf-ui'];
}

module.exports = add