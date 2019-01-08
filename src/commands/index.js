const newCmd = require('./new');
const addCmd = require('./add');

class Commands {
  constructor(addCommand, newCommand) {
    this.add = addCommand;
    this.new = newCommand;
  }
}

module.exports = new Commands(addCmd, newCmd);