import { useNamespace } from '../../../../shared/hooks/use-namespace';

const ns = useNamespace('menu');
const subNs = useNamespace('submenu');

const menuItemHorizontalWrapperHidden = `${ns.b()}-item-horizontal-wrapper-hidden`;
const menuItemHorizontalWrapperShow = `${ns.b()}-item-horizontal-wrapper-show`;

type mouseEventName = 'mouseenter' | 'mouseleave';
export function useShowSubMenu(eventName: mouseEventName, e: MouseEvent, wrapper: HTMLElement): void {
  const target = e.currentTarget as EventTarget as HTMLElement;
  const targetParent = target.parentElement;
  const wrapperChildren = wrapper.children;
  wrapper.style.padding = `0 20px !important`;
  if (eventName === 'mouseenter') {
    if (targetParent?.tagName === 'DIV') {
      wrapper.classList.add(`${ns.b()}-item-horizontal-wrapper-level`);
      const { width } = target.getClientRects()[0];
      wrapper.style.top = `0px`;
      wrapper.style.left = `${width}px`;
    } else {
      wrapper.style.top = `26px`;
      wrapper.style.left = `0px`;
    }
    wrapper.classList.remove(menuItemHorizontalWrapperHidden);
    wrapper.classList.add(menuItemHorizontalWrapperShow);
    for (let i = 0; i < wrapperChildren.length; i++) {
      const ul = wrapperChildren[i];
      if (ul.tagName === 'UL' && ul.classList.contains(subNs.b())) {
        const levelUlWrapper = ul.getElementsByClassName(`${ns.b()}-item-horizontal-wrapper`)[0];
        (ul as HTMLElement).addEventListener('mouseenter', (ev: MouseEvent) => {
          ev.stopPropagation();
          useShowSubMenu('mouseenter', ev, levelUlWrapper as Element as HTMLElement);
          levelUlWrapper.classList.remove(menuItemHorizontalWrapperHidden);
          levelUlWrapper.classList.add(menuItemHorizontalWrapperShow);
        });
        (ul as HTMLElement).addEventListener('mouseleave', (ev: MouseEvent) => {
          ev.stopPropagation();
          useShowSubMenu('mouseleave', ev, levelUlWrapper as Element as HTMLElement);
          levelUlWrapper.classList.remove(menuItemHorizontalWrapperShow);
          levelUlWrapper.classList.add(menuItemHorizontalWrapperHidden);
        });
      }
    }
  }
  if (eventName === 'mouseleave') {
    wrapper.classList.remove(menuItemHorizontalWrapperShow);
    wrapper.classList.add(menuItemHorizontalWrapperHidden);
  }
}
