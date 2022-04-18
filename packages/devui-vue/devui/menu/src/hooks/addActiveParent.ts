export function addActiveParent(ele: HTMLElement): HTMLElement{
  let cur = (ele.parentElement as HTMLElement);
  while (!cur.classList.contains('devui-menu')){
    if (cur.firstElementChild?.tagName === 'DIV'){
      cur?.firstElementChild?.classList.add('devui-menu-active-parent');
    }
    cur = cur.parentElement as HTMLElement;
  }
  return cur;
}
