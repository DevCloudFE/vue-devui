import { useNamespace } from '../../../../shared/hooks/use-namespace';

const ns = useNamespace('menu');
const subNs = useNamespace('submenu');

const menuItemHorizontalWrapperHidden = `${ns.b()}-item-horizontal-wrapper-hidden`;
const menuItemHorizontalWrapperShow = `${ns.b()}-item-horizontal-wrapper-show`;

type mouseEventName = 'mouseenter' | 'mouseleave';
export function useShowSubMenu(eventName: mouseEventName, e: MouseEvent, wrapper: HTMLElement): void {
  const target = e.currentTarget as EventTarget as HTMLElement;
  const subMenuTitle = target.children[0];
  const targetParent = target.parentElement;
  const wrapperChildren = wrapper.children;
  wrapper.style.padding = `0 20px !important`;
  if (eventName === 'mouseenter') {
    wrapper.classList.remove(menuItemHorizontalWrapperHidden);
    wrapper.classList.add(menuItemHorizontalWrapperShow);
    if (targetParent?.tagName === 'DIV') {
      wrapper.classList.add(`${ns.b()}-item-horizontal-wrapper-level`);
      const { top, left } = target.getClientRects()[0];
      const x = left + targetParent.clientWidth;
      const y = top;
      wrapper.style.top = `${y}px`;
      wrapper.style.left = `${x}px`;
    } else {
      const { top, left, height } = subMenuTitle.getClientRects()[0];
      const y = top + height;
      wrapper.style.top = `${y}px`;
      wrapper.style.left = `${left}px`;
    }
    for (let i = 0; i < wrapperChildren.length; i++) {
      const ul = wrapperChildren[i];
      if (ul.tagName === 'UL' && ul.classList.contains(subNs.b())) {
        const levelUlWrapper = ul.getElementsByClassName(`${ns.b()}-item-horizontal-wrapper`)[0];
        (ul as HTMLElement).addEventListener('mouseenter', (ev: MouseEvent) => {
          ev.stopPropagation();
          useShowSubMenu('mouseenter', ev, levelUlWrapper as Element as HTMLElement);
        });
        (ul as HTMLElement).addEventListener('mouseleave', (ev: MouseEvent) => {
          ev.stopPropagation();
          useShowSubMenu('mouseleave', ev, levelUlWrapper as Element as HTMLElement);
        });
      }
    }
  }
  if (eventName === 'mouseleave') {
    wrapper.classList.remove(menuItemHorizontalWrapperShow);
    wrapper.classList.add(menuItemHorizontalWrapperHidden);
  }
}
