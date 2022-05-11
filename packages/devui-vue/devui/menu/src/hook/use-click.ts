interface clickEvent extends MouseEvent{
  path: HTMLElement[];
}

export function useClick(e: clickEvent): void{
  const paths = e.path;
  for (let i=0;i<paths.length;i++){
    const path = paths[i];
    if (path.classList.contains('devui-menu-horizontal')){
      break;
    } else if (path.classList.contains('devui-menu-item-horizontal-wrapper')){
      continue;
    } else {
      if (path.tagName !== 'SPAN'){
        path.classList.add('devui-menu-item-select');
      }
    }
  }
}

