import { Ref, ref } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';

interface clickEvent extends MouseEvent {
  path?: HTMLElement[] | Element[];
}
const elements: JSX.Element[] = [];
let parents: HTMLElement[] = [];
const defaultIndent: Ref<number> = ref(24);
const ns = useNamespace('menu');
const subNs = useNamespace('submenu');
const menuClass = ns.b();
const menuItemHorizontalWrapper = `${ns.b()}-item-horizontal-wrapper`;
const menuItemSelect = `${ns.b()}-item-select`;
const menuActiveParent = `${ns.b()}-active-parent`;

export function setDefaultIndent(indent: number): void {
  defaultIndent.value = indent;
}
export function pushElement(element: JSX.Element): void {
  elements.push(element);
}
export function addLayer(): void {
  parents = [];
  elements.forEach((val) => {
    parents.push((val.el as HTMLElement).parentElement as HTMLElement);
  });
  // dfs
  const stack = [...parents];
  const getLayerFromClass = (className: string) => /layer_(\d*)/gim.exec(className)?.[1];
  while (stack.length) {
    const shiftItem = stack.shift() as HTMLElement;
    if (shiftItem?.classList.contains(menuClass)) {
      const children = shiftItem.children;
      stack.unshift(...(Array.from(children) as HTMLElement[]));
      continue;
    } else {
      if (shiftItem.tagName === 'DIV') {
        if (
          shiftItem.classList.contains(`${ns.b()}-item-vertical-wrapper`) ||
          shiftItem.classList.contains(`${subNs.b()}-menu-item-vertical-wrapper`)
        ) {
          const parent = shiftItem.parentElement;
          stack.unshift(...(Array.from(shiftItem.children) as HTMLElement[]));
          if (parent?.classList.contains(menuClass)) {
            shiftItem.classList.add('layer_1');
          } else {
            let layer: string | number | undefined = getLayerFromClass((parent?.classList.value || '') as string);
            layer = Number(layer);
            shiftItem.classList.add(`layer_${layer}`);
          }
        } else {
          const parent = shiftItem.parentElement;
          let layer: string | number | undefined = getLayerFromClass((parent?.classList.value || '') as string);
          layer = Number(layer);
          shiftItem.classList.add(`layer_${layer}`);
          shiftItem.style.paddingLeft = `${(layer === 2 ? 1 : layer - 1) * defaultIndent.value}px`;
        }
      }
      if (shiftItem.tagName === 'UL') {
        const parent = shiftItem.parentElement;
        const children = shiftItem.children;
        for (let i = 0; i < children.length; i++) {
          stack.unshift(children[i] as unknown as HTMLElement);
        }
        const classList = parent?.classList.value || '';
        let layer: string | undefined | number = getLayerFromClass(classList as string);
        if (parent?.classList.contains(menuClass)) {
          layer = 1;
          shiftItem.classList.add(`layer_${2}`);
        } else {
          shiftItem.classList.add(`layer_${Number(layer) + 1}`);
          layer = Number(layer) + 1;
        }
      }
      if (shiftItem.tagName === 'LI') {
        const parent = shiftItem.parentElement;
        const parentClassList = parent?.classList.value || ('' as string);
        let layer: number | string | undefined = getLayerFromClass(parentClassList) as string;
        getLayerFromClass(parentClassList);
        layer = Number(layer) as number;
        shiftItem.style.padding = `0 ${(layer as number) * defaultIndent.value}px`;
      }
    }
  }
}
function getRoot(path: HTMLElement[]): HTMLElement {
  const paths = path;
  let rootElement: HTMLElement | null = null;
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    if (p?.classList?.contains(`${ns.b()}-horizontal`)) {
      rootElement = p;
    }
  }
  return rootElement as HTMLElement;
}
function clearSelect_isHorizontal(ele: HTMLElement, event: clickEvent) {
  let element = event.target as HTMLElement;
  let stack: Element[] = [];
  const { path } = event;
  const root = getRoot(path as HTMLElement[]);
  stack = [...Array.from(root.children)] as HTMLElement[];
  if (element.tagName === 'SPAN') {
    element = element.parentElement as HTMLElement;
  }
  while (stack.length) {
    const shiftItem = stack.shift();
    if (shiftItem?.tagName === 'UL' || shiftItem?.classList.contains(menuItemHorizontalWrapper)) {
      const children = shiftItem?.children;
      stack.unshift(...Array.from(children as unknown as Element[]));
    }
    if (shiftItem !== element) {
      shiftItem?.classList.remove(menuItemSelect);
      shiftItem?.classList.remove(menuActiveParent);
    }
  }
}

function clearSelect_notHorizontal(ele: HTMLElement, event: clickEvent) {
  const stack: Element[] = [];
  const path = event.path || (event.composedPath && event.composedPath());
  for (let i = 0; i < path.length; i++) {
    const e = path[i] as HTMLElement;
    if (!e.classList.contains(menuClass)) {
      stack.push(...Array.from(e.children));
    } else {
      stack.push(...Array.from(e.children));
      break;
    }
  }
  while (stack.length) {
    const shiftItem = stack.shift();
    if (shiftItem?.tagName === 'UL' || shiftItem?.classList.contains(menuItemHorizontalWrapper)) {
      stack.push(...Array.from(shiftItem?.children as unknown as Element[]));
    }
    if (shiftItem !== ele) {
      if (shiftItem?.tagName === 'DIV') {
        stack.unshift(...Array.from(shiftItem?.children));
      }
      shiftItem?.classList.remove(menuItemSelect);
      shiftItem?.classList.remove(menuActiveParent);
    }
  }
}

export function clearSelect(ele: HTMLElement, event: clickEvent, isHorizontal = false): void {
  if (isHorizontal) {
    clearSelect_isHorizontal(ele, event);
  } else {
    clearSelect_notHorizontal(ele, event);
  }
}
export function getLayer(el: HTMLElement): string | undefined {
  const getLayerReg = /layer_(\d{1,})/gim;
  const className = el.className;
  return getLayerReg.exec(className)?.[1];
}
