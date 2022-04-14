import { inBrowser } from '../../shared/utils/common-var';

class Theme {
  static imports: any = {};

  static import(name: string): any {
    return this.imports[name];
  }

  static register(name: string, target: any): void {
    this.imports[name] = target;
  }

  constructor(theme: string) {
    this.applyTheme(theme);
  }

  applyTheme(name: string): void {
    const theme = Theme.imports[name];
    if (!inBrowser) {
      return;
    }

    if (!theme) {
      console.error(`主题 ${theme} 未注册！`);
      return;
    }

    const id = 'devui-theme-variable';
    const themeVariable = `:root { ${stringify(theme)} }`;
    let styleElement = document.getElementById(id);
    if (styleElement) {
      styleElement.innerText = themeVariable;
    } else {
      styleElement = document.createElement('style');
      styleElement.id = id;
      styleElement.innerText = themeVariable;
      document.head.appendChild(styleElement);
    }
  }
}

function stringify(theme: any) {
  return Object.entries(theme)
    .map(([key, value]) => `--${key}:${value}`)
    .join(';');
}

export default Theme;
