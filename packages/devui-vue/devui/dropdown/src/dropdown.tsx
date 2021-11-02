import { defineComponent, watch, ref, cloneVNode } from 'vue'
import { dropdownProps, DropdownProps } from './dropdown-types'
import { FlexibleOverlay } from '../../overlay';
import { getElement } from '../../shared/util/dom';

import './dropdown.scss'

function subscribeEvent<E = Event>(dom: Element | Document, type: string, callback: (event: E) => void) {
  dom?.addEventListener(type, callback as any);
  return () => {
    dom?.removeEventListener(type, callback as any);
  }
}


export default defineComponent({
  name: 'DDropdown',
  props: dropdownProps,
  emits: [],
  setup(props: DropdownProps, ctx) {
    const visible = ref();
    watch(() => props.isOpen, (value) => {
      visible.value = value;
    }, { immediate: true });
    const show = () => {
      visible.value = true;
    }
    const close = () => {
      visible.value = false;
    }

    const position = {
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top'
    } as const;

    const dropdownElRef = ref<HTMLElement>();
    watch(
      [() => props.origin, () => props.trigger, dropdownElRef],
      ([origin, trigger, dropdownEl], ov, onInvalidate) => {
        const originEl = getElement(origin);
        if (!originEl || !dropdownElRef) {
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
              if (!isContain) {
                close();
              }
            }),
          ];
          onInvalidate(() => {
            subs.forEach(v => v());
          });
        } else if (trigger === 'hover') {
          let overlayEnter = false;
          let originEnter = false;
          const handleLeave = async (elementType: 'origin' | 'dropdown') => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            if ((elementType === 'origin' && overlayEnter) || (elementType === 'dropdown' && originEnter)) {
              return;
            }
            close();
          };
          const subs = [
            subscribeEvent(originEl, 'mouseenter', () => {
              originEnter = true;
              show();
            }),
            subscribeEvent(originEl, 'mouseleave', () => {
              originEnter = false;
              // 判断鼠标是否已经进入 overlay
              if (!props.closeOnMouseLeaveMenu) {
                handleLeave('origin');
              }
            }),
            subscribeEvent(dropdownEl, 'mouseenter', () => {
              overlayEnter = true;
              show();
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

    return () => {
      // let vnodes = ctx.slots.default?.() ?? [];
      return (
        <>
          <FlexibleOverlay
            origin={props.origin}
            v-model:visible={visible.value}
            position={position}
            hasBackdrop={false}
          >
            <div ref={dropdownElRef} style="width:100vw">
              {ctx.slots.default?.()}
            </div>
          </FlexibleOverlay>
        </>
      )
    };
  }
})
