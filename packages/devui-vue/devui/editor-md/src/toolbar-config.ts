import {
  BOLD_ICON,
  CODE_ICON,
  COLOR_ICON,
  FILE_ICON,
  FONT_SIZE_ICON,
  FULLSCREEN_CONTRACT_ICON,
  FULLSCREEN_EXPAND_ICON,
  H1_ICON,
  H2_ICON,
  IMAGE_ICON,
  ITALIC_ICON,
  LINK_ICON,
  LIST_CHECK_ICON,
  LIST_ORDERED_ICON,
  LIST_UNORDERED_ICON,
  REDO_ICON,
  STRIKE_ICON,
  TABLE_ICON,
  UNDERLINE_ICON,
  UNDO_ICON,
} from './icons-config';

export interface IToolbarItemConfig {
  id: string;
  name?: string;
  exitName?: string;
  type?: 'button' | 'dropDown';
  icon?: string;
  exitIcon?: string;
  template?: any;
  component?: any;
  shortKey?: string;
  params?: { [key: string]: any };
  handler?(editor?: any, params?: any): void;
}

class ToolBarHandler {
  static undo = (editor: any): void => {
    editor.undo();
  };

  static redo = (editor: any): void => {
    editor.redo();
  };

  static bold = (editor: any): void => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();

    editor.replaceSelection('**' + selection + '**');

    editor.focus();
    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 2);
    }
  };

  static italic = (editor: any): void => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();

    editor.replaceSelection('*' + selection + '*');
    editor.focus();

    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 1);
    }
  };

  static h1 = (editor: any): void => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();
    editor.focus();

    if (cursor.ch !== 0) {
      editor.setCursor(cursor.line, 0);
      editor.replaceSelection('# ');
    } else {
      editor.replaceSelection('# ' + selection);
    }
  };

  static h2 = (editor: any): void => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();
    editor.focus();

    if (cursor.ch !== 0) {
      editor.setCursor(cursor.line, 0);
      editor.replaceSelection('## ');
    } else {
      editor.replaceSelection('## ' + selection);
    }
  };

  static ul = (editor: any): void => {
    const selection = editor.getSelection();
    editor.focus();
    if (selection === '') {
      editor.replaceSelection('- ' + selection);
    } else {
      const selectionText = selection.split('\n');

      for (let i = 0, len = selectionText.length; i < len; i++) {
        selectionText[i] = selectionText[i] === '' ? '' : '- ' + selectionText[i];
      }

      editor.replaceSelection(selectionText.join('\n'));
    }
  };

  static ol = (editor: any): void => {
    const selection = editor.getSelection();
    editor.focus();
    if (selection === '') {
      editor.replaceSelection('1. ' + selection);
    } else {
      const selectionText = selection.split('\n');

      for (let i = 0, len = selectionText.length; i < len; i++) {
        selectionText[i] = selectionText[i] === '' ? '' : i + 1 + '. ' + selectionText[i];
      }

      editor.replaceSelection(selectionText.join('\n'));
    }
  };

  static underline = (editor: any): void => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();
    editor.focus();
    editor.replaceSelection('<ins>' + selection + '</ins>');
    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 5);
    }
  };

  static strike = (editor: any): void => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();
    editor.replaceSelection('~~' + selection + '~~');
    editor.focus();

    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 2);
    }
  };

  static checkList = (editor: any): void => {
    const selection = editor.getSelection();
    editor.focus();
    if (selection === '') {
      editor.replaceSelection('[ ] ' + selection);
    } else {
      const selectionText = selection.split('\n');

      for (let i = 0, len = selectionText.length; i < len; i++) {
        selectionText[i] = selectionText[i] === '' ? '' : '[ ] ' + selectionText[i];
      }

      editor.replaceSelection(selectionText.join('\n'));
    }
  };

  static font = (): void => {};

  static link = (editor: any): void => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();
    editor.focus();
    editor.replaceSelection('[' + selection + '](url)');
    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 1);
    }
  };

  static image = (editor: any, params?: any): void => {
    const stopEventPropagation = (e: any): void => {
      e.stopPropagation();
    };
    if (typeof document !== 'undefined' && params.imageUploadToServer) {
      let imageUploader = document.getElementById('markdown_image_upload_input');
      if (imageUploader) {
        imageUploader.removeEventListener('click', stopEventPropagation);
        document.body.removeChild(imageUploader);
      }
      imageUploader = document.createElement('input');
      imageUploader.addEventListener('click', stopEventPropagation);
      imageUploader.setAttribute('type', 'file');
      imageUploader.setAttribute('accept', 'image/bmp,image/gif,image/jpeg,image/jpg,image/png,image/tiff');
      imageUploader.id = 'markdown_image_upload_input';
      imageUploader.style.display = 'none';
      document.body.appendChild(imageUploader);
      const callback = ({ name, imgUrl, title }: any) => {
        editor.focus();
        editor.replaceSelection(`![${name}](${imgUrl} '${title}')`);
      };
      imageUploader.onchange = (e: any) => {
        const file = e.target['files'][0];
        params.imageUpload({ file, callback });
      };
      imageUploader.click();
    } else {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();
      editor.focus();
      editor.replaceSelection('![' + selection + "](src 'title')");
      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 2);
      }
    }
  };

  static file = (editor: any, params?: any): void => {
    const stopEventPropagation = (e: any): void => {
      e.stopPropagation();
    };

    let fileUploader = document.getElementById('markdown_file_upload_input');
    if (fileUploader) {
      fileUploader.removeEventListener('click', stopEventPropagation);
      document.body.removeChild(fileUploader);
    }
    fileUploader = document.createElement('input');
    fileUploader.setAttribute('type', 'file');
    fileUploader.addEventListener('click', stopEventPropagation);
    fileUploader.id = 'markdown_file_upload_input';
    fileUploader.style.display = 'none';
    document.body.appendChild(fileUploader);

    const callback = ({ name, url, title, isImage }: any) => {
      let showAsImage = false;

      if (isImage !== undefined) {
        showAsImage = isImage;
      } else if (url) {
        const imageFilter = /^(bmp|gif|jpeg|jpg|png|tiff)$/i;
        showAsImage = imageFilter.test(url.split('.').pop());
      }

      editor.focus();
      if (showAsImage) {
        editor.replaceSelection(`![${name}](${url} '${title}')`);
      } else {
        editor.replaceSelection(`[${name}](${url} '${title}')`);
      }
    };

    fileUploader.onchange = (e: any) => {
      const file = e.target['files'][0];
      params.fileUpload.emit({ file, callback });
    };
    fileUploader.click();
  };

  static code = (editor: any): void => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();
    editor.replaceSelection('`' + selection + '`');
    editor.focus();

    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 1);
    }
  };

  static table = (editor: any) => {
    const table = `\n|  |  |  |\n|--|--|--|\n|  |  |  |`;
    editor.replaceSelection(table);
  };

  static fullscreen = (editor: any) => {
    editor.focus();
  };

  static color = (): void => {};
}

export const DEFAULT_TOOLBARS: Record<string, IToolbarItemConfig> = {
  undo: {
    id: 'undo',
    name: 'undo',
    type: 'button',
    icon: UNDO_ICON,
    shortKey: 'Ctrl+Z',
    handler: ToolBarHandler.undo,
  },
  redo: {
    id: 'redo',
    name: 'redo',
    type: 'button',
    icon: REDO_ICON,
    shortKey: 'Ctrl+Y',
    handler: ToolBarHandler.redo,
  },
  bold: {
    id: 'bold',
    name: 'bold',
    type: 'button',
    icon: BOLD_ICON,
    shortKey: 'Ctrl+B',
    handler: ToolBarHandler.bold,
  },
  italic: {
    id: 'italic',
    name: 'italic',
    type: 'button',
    icon: ITALIC_ICON,
    shortKey: 'Ctrl+I',
    handler: ToolBarHandler.italic,
  },
  strike: {
    id: 'strike',
    name: 'strike',
    type: 'button',
    icon: STRIKE_ICON,
    shortKey: 'Ctrl+D',
    handler: ToolBarHandler.strike,
  },
  h1: {
    id: 'h1',
    name: 'h1',
    type: 'button',
    icon: H1_ICON,
    shortKey: 'Ctrl+1',
    handler: ToolBarHandler.h1,
  },
  h2: {
    id: 'h2',
    name: 'h2',
    type: 'button',
    icon: H2_ICON,
    shortKey: 'Ctrl+2',
    handler: ToolBarHandler.h2,
  },
  ul: {
    id: 'ul',
    name: 'unorderedlist',
    type: 'button',
    icon: LIST_UNORDERED_ICON,
    shortKey: 'Ctrl+U',
    handler: ToolBarHandler.ul,
  },
  ol: {
    id: 'ol',
    name: 'orderedlist',
    type: 'button',
    icon: LIST_ORDERED_ICON,
    shortKey: 'Ctrl+O',
    handler: ToolBarHandler.ol,
  },
  checklist: {
    id: 'checklist',
    name: 'checklist',
    type: 'button',
    icon: LIST_CHECK_ICON,
    shortKey: 'Ctrl+Alt+C',
    handler: ToolBarHandler.checkList,
  },
  underline: {
    id: 'underline',
    name: 'underline',
    type: 'button',
    icon: UNDERLINE_ICON,
    shortKey: 'Ctrl+R',
    handler: ToolBarHandler.underline,
  },
  font: {
    id: 'font',
    name: 'size',
    type: 'dropDown',
    icon: FONT_SIZE_ICON,
    component: 'FontSize',
    handler: ToolBarHandler.font,
  },
  link: {
    id: 'link',
    name: 'link',
    type: 'button',
    icon: LINK_ICON,
    shortKey: 'Ctrl+L',
    handler: ToolBarHandler.link,
  },
  image: {
    id: 'image',
    name: 'image',
    type: 'button',
    icon: IMAGE_ICON,
    shortKey: 'Ctrl+G',
    params: { imageUploadToServer: false },
    handler: ToolBarHandler.image,
  },
  file: {
    id: 'file',
    name: 'file',
    type: 'button',
    icon: FILE_ICON,
    params: {},
    shortKey: 'Ctrl+F',
    handler: ToolBarHandler.file,
  },
  code: {
    id: 'code',
    name: 'code',
    type: 'button',
    icon: CODE_ICON,
    shortKey: 'Ctrl+K',
    handler: ToolBarHandler.code,
  },
  table: {
    id: 'table',
    name: 'table',
    type: 'button',
    icon: TABLE_ICON,
    shortKey: 'Ctrl+Alt+T',
    handler: ToolBarHandler.table,
  },
  fullscreen: {
    id: 'fullscreen',
    name: 'fullscreen',
    exitName: 'exit-fullscreen',
    type: 'button',
    icon: FULLSCREEN_EXPAND_ICON,
    exitIcon: FULLSCREEN_CONTRACT_ICON,
    handler: ToolBarHandler.fullscreen,
  },
  color: {
    id: 'color',
    name: 'color&background',
    type: 'dropDown',
    icon: COLOR_ICON,
    component: 'FontColor',
    handler: ToolBarHandler.color,
  },
};

export const DEFAULT_TOOLBAR_CONFIG = [
  ['undo', 'redo'],
  ['h1', 'h2', 'bold', 'italic', 'strike', 'underline', 'color', 'font'],
  ['ul', 'ol', 'checklist', 'code', 'link', 'image', 'table'],
  'fullscreen',
];

export const FONT_COLORS = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466',
];

export const FONT_SIZE_LIST = [12, 14, 16, 18, 20, 24, 36, 48].map((item) => ({ name: item + 'px', value: item }));
