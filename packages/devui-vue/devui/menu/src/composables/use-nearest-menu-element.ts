export function useNearestMenuElement(ele: HTMLElement): HTMLElement{
  while (ele && ele.tagName !== 'LI' && ele.tagName !== 'UL'){
    ele = ele.parentElement as HTMLElement;
  }
  return ele;
}
