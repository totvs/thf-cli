#!/usr/bin/env node
require('shelljs/global');
const pathNode = require('path');

const program = require('commander');
const command = require('../src/commands');
const figlet = require('figlet');
const package = require('../package.json');

program.version(package.version);

program.on('--help', function() {
  console.log(figlet.textSync('THF CLI'));
});

program
  .command('new <projectName>')
  .alias('n')
  .description('create a new project with THF configured from selected template')
  .option("-t, --template <template>", "which template to create")
  .option("--title <title>", "title to use in project")
  .action((projectName, options) => {
    command.new(projectName, options);
  });

program
  .command('add <moduleName>')
  .alias('a')
  .description('add new module with dynamic component in project')
  .action((moduleName) => {
    command.add(moduleName);
  });

program
  .command('convert-imports')
  .alias('ci')
  .description('convert imports from THF 3 to THF 4')
  .action(() => {
    const path = process.cwd();
    const srcPath = pathNode.join(path, 'src');

    command.convertImports(srcPath);
  });

program.parse(process.argv);