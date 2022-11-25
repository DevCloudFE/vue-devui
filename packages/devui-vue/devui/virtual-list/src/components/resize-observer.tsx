import type { ComponentInternalInstance, VNode } from 'vue';
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, onUpdated, onUnmounted } from 'vue';
import { findDOMNode } from '../utils';
import { resizeObserverProps } from '../virtual-list-types';

interface ResizeObserverState {
  height: number;
  width: number;
  offsetHeight: number;
  offsetWidth: number;
}


export default defineComponent({
  name: 'ResizeObserver',
  props: resizeObserverProps,
  emits: ['resize'],
  setup(props, { slots }) {

    const state = reactive<ResizeObserverState>({
      width: 0,
      height: 0,
      offsetHeight: 0,
      offsetWidth: 0,
    });
    const currentElement = ref<Element | null>(null);
    const resizeObserver = ref<ResizeObserver | null>(null);
    const destroyObserver = () => {
      if (resizeObserver.value) {
        resizeObserver.value.disconnect();
        resizeObserver.value = null;
      }
    };

    const onTriggerResize: ResizeObserverCallback = (entries: ResizeObserverEntry[]) => {
      const { onResize } = props;

      const target = entries[0].target as HTMLElement;

      const { width, height } = target.getBoundingClientRect();
      const { offsetWidth, offsetHeight } = target;

      const fixedWidth = Math.floor(width);
      const fixedHeight = Math.floor(height);

      if (
        state.width !== fixedWidth ||
        state.height !== fixedHeight ||
        state.offsetWidth !== offsetWidth ||
        state.offsetHeight !== offsetHeight
      ) {
        const size = { width: fixedWidth, height: fixedHeight, offsetWidth, offsetHeight };

        Object.assign(state, size);
        if (onResize) {
          Promise.resolve().then(() => {
            onResize(
              {
                ...size,
                offsetWidth,
                offsetHeight,
              },
              target,
            );
          });
        }
      }
    };
    const instance = getCurrentInstance();
    const registerObserver = () => {
      const { disabled } = props;
      if (disabled) {
        destroyObserver();
        return;
      }
      if (instance) {
        const element = findDOMNode(instance as ComponentInternalInstance & { $el: VNode['el'] }) as Element;
        const elementChanged = element !== currentElement.value;
        const isSupported = window && 'ResizeObserver' in window;
        if (elementChanged) {
          destroyObserver();
          currentElement.value = element;
        }

        if (!resizeObserver.value && element && isSupported) {
          resizeObserver.value = new ResizeObserver(onTriggerResize);
          resizeObserver.value.observe(element);
        }
      }
    };
    onMounted(() => {
      registerObserver();
    });
    onUpdated(() => {
      registerObserver();
    });
    onUnmounted(() => {
      destroyObserver();
    });
    return () => {
      return slots.default?.()[0];
    };
  }
} as any);
