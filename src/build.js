const chalk = require('chalk');
const spawn = require('cross-spawn');

class Build {

  installPackages(packageName) {
    console.log(chalk.white.bold('Installing packages...'));

    return new Promise((resolve, reject) => {
      let command = 'npm';
      let args;

      if (packageName) {
        args = ['install', '--save-exact', `${packageName}`];
      } else {
        args = ['install'];
      }

      const child = spawn(command, args, { stdio: 'inherit' });
      child.on('close', code => {
        if (code !== 0) {
          reject({
            command: `${command} ${args.join(' ')}`
          });
          return;
        }

        console.log();
        console.log(chalk.white.bold('Packages installed sucessfully!'));
        resolve();
      })
    })
  }
}

module.exports = new Build();