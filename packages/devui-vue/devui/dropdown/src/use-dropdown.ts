import { Ref, ref, watch } from 'vue';
import { getElement } from '../../shared/util/dom';
import { CloseScopeArea, TriggerType } from './dropdown-types';

function subscribeEvent<E = Event>(dom: Element | Document, type: string, callback: (event: E) => void) {
  dom?.addEventListener(type, callback as any);
  return () => {
    dom?.removeEventListener(type, callback as any);
  }
}

type ReadonlyRef<T> = Readonly<Ref<T>>;

interface UseDropdownProps {
  visible: Ref<boolean>
  trigger: ReadonlyRef<TriggerType>
  origin: ReadonlyRef<any>
  closeScope: ReadonlyRef<CloseScopeArea>
  closeOnMouseLeaveMenu: ReadonlyRef<boolean>
}

interface UseDropdownResult {
  dropdownEl: Ref<HTMLElement>
}

export const useDropdown = ({
  visible,
  trigger,
  origin,
  closeScope,
  closeOnMouseLeaveMenu
}: UseDropdownProps): UseDropdownResult => {
  const dropdownElRef = ref<HTMLElement>();

  const closeByScope = () => {
    if (closeScope.value === 'none') {
      return;
    }
    visible.value = false;
  }
  watch(
    [trigger, origin, dropdownElRef],
    ([trigger, origin, dropdownEl], ov, onInvalidate) => {
      const originEl = getElement(origin);
      if (!originEl || !dropdownEl) {
        return;
      }
      const subscriptions = [
        subscribeEvent(dropdownEl, 'click', () => {
          if (closeScope.value === 'all') {
            visible.value = false;
          }
        }),
      ];

      if (trigger === 'click') {
        // 点击触发
        subscriptions.push(
          subscribeEvent(originEl, 'click', () => visible.value = !visible.value),
          subscribeEvent(document, 'click', (e) => {
            if (!visible.value) {
              return;
            }
            const target = e.target as HTMLElement;
            const isContain = originEl.contains(target) || dropdownEl.contains(target);
            if (isContain) {
              return;
            }
            closeByScope();
          }),
          subscribeEvent(dropdownEl, 'mouseleave', () => {
            // 判断鼠标是否已经进入 origin
            if (closeOnMouseLeaveMenu.value) {
              visible.value = false;
            }
          })
        );
      } else if (trigger === 'hover') {
        // 鼠标悬浮触发
        let overlayEnter = false;
        let originEnter = false;
        const handleLeave = async (elementType: 'origin' | 'dropdown') => {
          // 由于关联元素和 dropdown 元素间有间距，
          // 悬浮时在两者之间移动可能会导致多次关闭打开，
          // 所以需要给关闭触发节流。
          await new Promise((resolve) => setTimeout(resolve, 50));
          if ((elementType === 'origin' && overlayEnter) || (elementType === 'dropdown' && originEnter)) {
            return;
          }
          closeByScope();
        };
        subscriptions.push(
          subscribeEvent(originEl, 'mouseenter', () => {
            originEnter = true;
            visible.value = true;
          }),
          subscribeEvent(originEl, 'mouseleave', () => {
            originEnter = false;
            // 判断鼠标是否已经进入 overlay
            if (!closeOnMouseLeaveMenu.value) {
              handleLeave('origin');
            }
          }),
          subscribeEvent(dropdownEl, 'mouseenter', () => {
            overlayEnter = true;
            visible.value = true;
          }),
          subscribeEvent(dropdownEl, 'mouseleave', () => {
            overlayEnter = false;
            // 判断鼠标是否已经进入 origin
            handleLeave('dropdown');
          })
        );
      }
      onInvalidate(() => subscriptions.forEach(v => v()));
    }
  );

  return { dropdownEl: dropdownElRef };
}
