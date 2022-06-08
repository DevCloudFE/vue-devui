import { useNamespace } from '../../../shared/hooks/use-namespace';

const ns = useNamespace('menu');

interface clickEvent extends MouseEvent {
  path: HTMLElement[];
}

export function useClick(e: clickEvent): void {
  const paths = e.path;
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (path.classList.contains(`${ns.b()}-horizontal`)) {
      break;
    } else if (path.classList.contains(`${ns.b()}-item-horizontal-wrapper`)) {
      continue;
    } else {
      if (path.tagName !== 'SPAN') {
        path.classList.add(`${ns.b()}-item-select`);
      }
    }
  }
}
