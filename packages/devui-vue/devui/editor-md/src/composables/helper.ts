export function _enforceMaxLength(cm: any, changes: any) {
  const maxLength = cm.getOption('maxLength');
  if (maxLength && changes.update) {
    let changeContent = changes.text.join('\n');
    let delta = changeContent.length - (cm.indexFromPos(changes.to) - cm.indexFromPos(changes.from));

    if (delta <= 0) {
      return true;
    }

    delta = cm.getValue().length + delta - maxLength;
    if (delta > 0) {
      changeContent = changeContent.substr(0, changeContent.length - delta);
      changes.update(changes.from, changes.to, changeContent.split('\n'));
    }
  }
  return true;
}

export function refreshEditorCursor() {
  let event;
  if (typeof Event === 'function') {
    event = new Event('resize');
  } else {
    event = document.createEvent('Event');
    event.initEvent('resize', true, true);
  }
  window.dispatchEvent(event);
}
