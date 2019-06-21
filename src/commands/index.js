const newCmd = require('./new');
const addCmd = require('./add');
const convertImportsCmd = require('./convertImports');

class Commands {
  constructor(addCommand, newCommand, convertImportsCommand) {
    this.add = addCommand;
    this.new = newCommand;
    this.convertImports = convertImportsCommand;
  }
}

module.exports = new Commands(addCmd, newCmd, convertImportsCmd);