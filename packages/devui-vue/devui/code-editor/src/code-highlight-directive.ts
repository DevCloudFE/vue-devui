import { inBrowser } from '../../shared/utils/common-var';

let monaco: any;

const CodeHighlightDirective = {
  async mounted(el: HTMLElement): Promise<void> {
    if (inBrowser) {
      monaco = await import('monaco-editor');
      monaco.editor.colorizeElement(el);
    }
  },

  updated(el: HTMLElement): void {
    if (inBrowser) {
      monaco.editor.colorizeElement(el);
    }
  }
};

export default CodeHighlightDirective;
