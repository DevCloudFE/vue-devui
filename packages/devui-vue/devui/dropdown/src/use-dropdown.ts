import { Ref, ref, watch } from 'vue';
import { getElement } from '../../shared/util/dom';
import { TriggerType } from './dropdown-types';

function subscribeEvent<E = Event>(dom: Element | Document, type: string, callback: (event: E) => void) {
  dom?.addEventListener(type, callback as any);
  return () => {
    dom?.removeEventListener(type, callback as any);
  }
}

interface UseDropdownProps {
  visible: Ref<boolean>
  trigger: Readonly<Ref<TriggerType>>
  origin: Readonly<Ref<any>>
  closeOnMouseLeaveMenu: Readonly<Ref<boolean>>
}

interface UseDropdownResult {
  dropdownEl: Ref<HTMLElement>
}

export const useDropdown = ({
  visible,
  trigger,
  origin,
  closeOnMouseLeaveMenu
}: UseDropdownProps): UseDropdownResult => {
  const dropdownElRef = ref<HTMLElement>();

  watch(
    [trigger, origin, dropdownElRef],
    ([trigger, origin, dropdownEl], ov, onInvalidate) => {
      const originEl = getElement(origin);
      if (!originEl || !dropdownEl) {
        return;
      }
      if (trigger === 'click') {
        const subs = [
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
            visible.value = false;
          }),
        ];
        onInvalidate(() => subs.forEach(v => v()));
      } else if (trigger === 'hover') {
        let overlayEnter = false;
        let originEnter = false;
        const handleLeave = async (elementType: 'origin' | 'dropdown') => {
          await new Promise((resolve) => setTimeout(resolve, 50));
          if ((elementType === 'origin' && overlayEnter) || (elementType === 'dropdown' && originEnter)) {
            return;
          }
          visible.value = false;
        };
        const subs = [
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
          }),
        ];
        onInvalidate(() => subs.forEach(v => v()));
      }
    }
  );

  return { dropdownEl: dropdownElRef };
}
