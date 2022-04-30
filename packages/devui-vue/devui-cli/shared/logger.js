const chalk = require('chalk');

module.exports = {
  info(text) {
    console.log(chalk.hex('#00afef')(text));
  },
  success(text) {
    console.log(chalk.hex('#00c48f')(text));
  },
  warning(text) {
    console.log(chalk.hex('#ff9800')(text));
  },
  error(text) {
    console.log(chalk.hex('#f44336')(text));
  }
};
