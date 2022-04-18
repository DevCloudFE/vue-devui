export function lockScroll(): () => void | undefined {
  if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
    const scrollTop = document.documentElement.scrollTop;
    const style = document.documentElement.getAttribute('style');
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.top = `-${scrollTop}px`;
    document.documentElement.style.width = document.documentElement.style.width || '100%';
    document.documentElement.style.overflowY = 'scroll';
    return () => {
      if (style) {
        document.documentElement.setAttribute('style', style);
      } else {
        document.documentElement.removeAttribute('style');
      }
      document.documentElement.scrollTop = scrollTop;
    };
  }
  return;
}
