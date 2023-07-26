import Clipboard from 'clipboard';

export function toClipboard(text: string) {
  return new Promise((resolve, reject) => {
    const ele = document.createElement('button');
    const clipboard = new Clipboard(ele, {
      text: () => text,
      action: () => 'copy',
    });

    clipboard.on('success', (e) => {
      clipboard.destroy();
      resolve(e);
    });

    clipboard.on('error', (e) => {
      clipboard.destroy();
      reject(e);
    });

    document.body.appendChild(ele);
    ele.click();
    document.body.removeChild(ele);
  });
}
