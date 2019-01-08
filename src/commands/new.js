const chalk = require('chalk');
const inquirer = require('inquirer');
const childProcess = require('child_process');
const fs = require('fs');
const pify = require('pify');
const path = require('path');
const del = require('del');
const build = require('../build');
const rewrite = require('../rewrite');

async function newc(projectName, options) {
  let { template, title } = options;

  if (template && !_getTemplateUrl(template)) {
    console.log(`The template "${template}" isn't valid.`);

    return;
  }

  template = template || 'sidemenu';
  title = title || projectName;

  const endpoint = _getEndpoint(template);

  if (endpoint) {

    const destination = _getPath(projectName);

    if (fs.existsSync(destination)) {
      const { overwrite } = await inquirer.prompt([overwritePrompt(projectName)]);

      if (!overwrite) return;

      await del(destination, { force: true });
    }

    try {
      console.log(chalk.white.bold('Initializing the project download...'));

      await pify(childProcess.exec)(`git clone ${endpoint} ${destination}`);

      console.log(`Template "${template}" successfully downloaded!`);

      cd(projectName);

      await pify(childProcess.exec)(`git remote rm origin`);

      await rewrite.packageJson(`${destination}/package.json`, projectName);

      rewrite.projectTitle(`${destination}/src/app/app.component.html`, title)
     
      await build.installPackages();

      console.log();
      console.log('========================')
      console.log(' ' + chalk.white.bold('To run project:'));
      console.log();
      console.log(' ' + chalk.green.bold(`cd ${projectName}`));
      console.log(' ' + chalk.green.bold('ng serve'));

    } catch (e) {

      console.error(`Ops! An error occurred in the installation of the project "${projectName}"`);
      console.error(e.message);
    }

  } else {
    console.log (`"${template}" isn't a template`);
  }
}

const overwritePrompt = (projectName) => ({
  type: 'confirm',
  name: 'overwrite',
  message: `There is already a project called "${projectName}", do you want to overwrite it?`
});


function _getEndpoint(template) {
  let repository = _getTemplateUrl(template);
 
  if (repository) {

    /* GIT ENDPOINT */
    if (repository.match(/\.git$/)) return repository;

    /* GITHUB REPOSITORY */
    const repo = repository.match(/.+github\.com\/([^\s\/.]+)\/([^\s\/#]+)(?:$|\/|#)/);

    if (repo) return `https://github.com/${repo[1]}/${repo[2]}.git`;

  } else {
    console.error('Ops! Invalid repository');
  }

}

function _getTemplateUrl(template) {
  const templates = require('../../templates.json');

  return templates[template];
}

function _getPath(projectName) {
  const templatePath = path.join(process.cwd(), projectName);

  return templatePath;
}

module.exports = newc