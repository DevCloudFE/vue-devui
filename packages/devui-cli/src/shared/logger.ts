import { lightBlue, lightGreen, lightRed, lightYellow } from 'kolorist';

const logger = {
  PREFIX: '[dev-cli]',
  info(text: string) {
    console.log(lightBlue(`✈ ${logger.PREFIX} - ${text}`));
  },
  success(text: string) {
    console.log(lightGreen(`✔ ${logger.PREFIX} - ${text}`));
  },
  warn(text: string) {
    console.log(lightYellow(`▶ ${logger.PREFIX} - ${text}`));
  },
  error(text: string) {
    console.log(lightRed(`✖ ${logger.PREFIX} - ${text}`));
  }
};

export default logger;
