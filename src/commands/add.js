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

    await build.installPackages('@totvs/thf-templates');

    fileWriter.config(moduleName);

    fileWriter.createModuleFile(component);
    fileWriter.createComponentFile(service);
    fileWriter.createRoutingModule(component);
    fileWriter.createTemplateFile(component);

  } catch (e) {
    console.log(chalk.red('There was an error in generating the files'), e);
  }
}

module.exports = add