import { Locale } from '.';

const camelize = (name: string) => name.substring(1).replace(/^\S/, (s: string) => s.toLocaleLowerCase());

export function get(object: any, path: string) {
  const keys = path.split('.');
  let result = object;

  keys.forEach((key) => {
    result = result[key] ?? '';
  });

  return result;
}

export function createI18nTranslate(name: string, app, newPrefix?: string) {
  const prefix = newPrefix || camelize(name) + '.';
  return (path: string): any => {
    const messages = app?.appContext.config.globalProperties.langMessages?.value || Locale.messages();
    const message = get(messages, prefix + path) || get(messages, path);
    return message;
  };
}
