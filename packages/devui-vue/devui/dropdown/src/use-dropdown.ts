import { watch, onMounted, onUnmounted, toRefs, computed, ref } from 'vue';
import type { Ref } from 'vue';
import { getElement } from '../../shared/utils/dom';
import { UseDropdownProps, EmitEvent, DropdownProps, UseOverlayFn } from './dropdown-types';

const dropdownMap = new Map();

function subscribeEvent(
  dom: Element | Document | null | undefined,
  type: string,
  callback: EventListenerOrEventListenerObject
): () => void {
  dom?.addEventListener(type, callback);
  return () => {
    dom?.removeEventListener(type, callback);
  };
}

export const useDropdownEvent = ({ id, isOpen, origin, dropdownRef, props, emit }: UseDropdownProps): void => {
  let overlayEnter = false;
  let originEnter = false;
  const { trigger, closeScope, closeOnMouseLeaveMenu } = toRefs(props);
  const toggle = (status: boolean) => {
    isOpen.value = status;
    emit('toggle', isOpen.value);
  };
  const handleLeave = async (elementType: 'origin' | 'dropdown', closeAll?: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    if ((elementType === 'origin' && overlayEnter) || (elementType === 'dropdown' && originEnter)) {
      return;
    }
    if (closeAll) {
      [...dropdownMap.values()].reverse().forEach((item) => {
        setTimeout(() => {
          item.toggle?.();
        }, 0);
      });
    }
    toggle(false);
  };
  watch([trigger, origin, dropdownRef], ([triggerVal, originVal, dropdownEl], ov, onInvalidate) => {
    const originEl = getElement(originVal);
    const subscriptions: (() => void)[] = [];
    setTimeout(() => {
      subscriptions.push(
        subscribeEvent(document, 'click', (e: Event) => {
          e.stopPropagation();
          const dropdownValues = [...dropdownMap.values()];
          if (
            !isOpen.value ||
            closeScope.value === 'none' ||
            (dropdownEl?.contains(e.target as Node) && closeScope.value === 'blank') ||
            (dropdownValues.some((item) => item.toggleEl?.contains(e.target)) &&
              dropdownValues.some((item) => item.menuEl?.contains(e.target)))
          ) {
            return;
          }
          [...dropdownMap.values()].reverse().forEach((item) => {
            setTimeout(() => {
              if (!item.toggleEl?.contains(e.target)) {
                item.toggle?.();
              }
            }, 0);
          });
          overlayEnter = false;
        })
      );
    }, 0);
    if (triggerVal === 'click') {
      subscriptions.push(
        subscribeEvent(originEl, 'click', () => toggle(!isOpen.value)),
        subscribeEvent(dropdownEl, 'mouseleave', (e: Event) => {
          if (closeOnMouseLeaveMenu.value && !dropdownMap.get(id).child?.contains((e as MouseEvent).relatedTarget)) {
            handleLeave('dropdown', true);
          }
        })
      );
    } else if (triggerVal === 'hover') {
      subscriptions.push(
        subscribeEvent(originEl, 'mouseenter', () => {
          originEnter = true;
          toggle(true);
        }),
        subscribeEvent(originEl, 'mouseleave', () => {
          originEnter = false;
          handleLeave('origin');
        }),
        subscribeEvent(dropdownEl, 'mouseenter', () => {
          overlayEnter = true;
          isOpen.value = true;
        }),
        subscribeEvent(dropdownEl, 'mouseleave', (e: Event) => {
          overlayEnter = false;
          if (
            (e as MouseEvent).relatedTarget &&
            (originEl?.contains((e as MouseEvent).relatedTarget as Node) ||
              dropdownMap.get(id).child?.contains((e as MouseEvent).relatedTarget))
          ) {
            return;
          }
          handleLeave('dropdown', true);
        })
      );
    }
    onInvalidate(() => subscriptions.forEach((v) => v()));
  });
};

export function useDropdown(
  id: string,
  visible: Ref<boolean>,
  isOpen: Ref<boolean>,
  origin: Ref<HTMLElement | undefined>,
  dropdownRef: Ref<HTMLElement | undefined>,
  popDirection: Ref<string>,
  emit: EmitEvent
): void {
  const calcPopDirection = (dropdownEl: HTMLElement) => {
    const elementHeight = dropdownEl.offsetHeight;
    const bottomDistance = window.innerHeight - (origin.value as HTMLElement).getBoundingClientRect().bottom;
    const isBottomEnough = bottomDistance >= elementHeight;
    if (!isBottomEnough) {
      popDirection.value = 'top';
    } else {
      popDirection.value = 'bottom';
    }
  };

  watch(
    visible,
    (newVal, oldVal) => {
      if (oldVal === undefined) {
        return;
      }
      isOpen.value = newVal;
      emit('toggle', isOpen.value);
    },
    { immediate: true }
  );
  watch([isOpen, dropdownRef], ([isOpenVal, dropdownEl]) => {
    if (isOpenVal) {
      dropdownMap.set(id, {
        ...dropdownMap.get(id),
        menuEl: dropdownEl,
        toggle: () => {
          isOpen.value = false;
          emit('toggle', isOpen.value);
        },
      });
      for (const value of dropdownMap.values()) {
        if (value.menuEl?.contains(origin.value)) {
          value.child = dropdownEl;
        }
      }
    }
    if (dropdownEl) {
      calcPopDirection(dropdownEl);
    }
  });
  onMounted(() => {
    dropdownMap.set(id, { toggleEl: origin.value });
  });
  onUnmounted(() => {
    dropdownMap.delete(id);
  });
}

export function useOverlayProps(props: DropdownProps, currentPosition: Ref<string>, isOpen: Ref<boolean>): UseOverlayFn {
  const { showAnimation, overlayClass, destroyOnHide } = toRefs(props);
  const overlayModelValue = ref<boolean>(false);
  const overlayShowValue = ref<boolean>(false);
  const styles = computed(() => ({
    transformOrigin: currentPosition.value === 'top' ? '0% 100%' : '0% 0%',
    zIndex: 'var(--devui-z-index-dropdown, 1052)',
  }));
  const classes = computed(() => ({
    'fade-in-bottom': showAnimation.value && isOpen.value && currentPosition.value === 'bottom',
    'fade-in-top': showAnimation.value && isOpen.value && currentPosition.value === 'top',
    [`${overlayClass.value}`]: true,
  }));
  const handlePositionChange = (pos: string) => {
    currentPosition.value = pos.includes('top') || pos.includes('right-end') || pos.includes('left-end') ? 'top' : 'bottom';
  };

  watch(isOpen, (isOpenVal) => {
    overlayModelValue.value = destroyOnHide.value ? isOpenVal : true;
    overlayShowValue.value = isOpenVal;
  });

  return { overlayModelValue, overlayShowValue, styles, classes, handlePositionChange };
}
