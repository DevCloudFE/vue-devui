import { defineComponent, ref, watch, inject, onMounted, onUpdated } from 'vue';
import { addClass, hasClass, removeClass } from '../../../shared/utils/class';
import { setStyle } from '../../../shared/utils/set-style';
import type { SplitterStore } from '../splitter-store';
import { splitterPaneProps, SplitterPaneProps } from './splitter-pane-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { isHTMLElement } from '../../../shared/utils';
import './splitter-pane.scss';

export default defineComponent({
  name: 'DSplitterPane',
  props: splitterPaneProps,
  emits: ['sizeChange', 'collapsedChange'],
  setup(props: SplitterPaneProps, { slots, expose }) {
    const store = inject<SplitterStore>('splitterStore');
    const domRef = ref<null | HTMLElement>();
    const orderRef = ref();
    const ns = useNamespace('splitter');
    watch([orderRef, domRef], ([order, ele]) => {
      if (!ele) {
        return;
      }
      setStyle(ele, { order });
    });

    // pane 初始化大小
    const setSizeStyle = (curSize: string, ele: HTMLElement) => {
      if (!ele) {
        return;
      }
      ele.style.flexBasis = curSize;
      const paneFixedClass = ns.em('pane', 'fixed');
      if (curSize) {
        // 设置 flex-grow 和 flex-shrink
        addClass(ele, paneFixedClass);
      } else {
        removeClass(ele, paneFixedClass);
      }
    };

    watch(
      [() => props.size, domRef],
      ([size, ele]) => {
        if (size && ele) {
          setSizeStyle(size, ele);
        }
      },
      { immediate: true }
    );

    const orientation = inject('orientation');
    let initialSize = ''; // 记录初始化挂载传入的大小
    onMounted(() => {
      if (props.size) {
        initialSize = props.size;
      }
      if (store) {
        store.setPanes({ panes: store.state.panes });
      }
    });

    onUpdated(() => {
      if (store) {
        store.setPanes({ panes: store.state.panes });
      }
    });

    // 获取当前 pane大小
    const getPaneSize = (): number => {
      const ele = domRef.value;
      if (!ele) {
        return 0;
      }
      if (orientation === 'vertical') {
        return ele.offsetHeight;
      } else {
        return ele.offsetWidth;
      }
    };

    watch(
      [() => props.collapsed, domRef],
      ([collapsed, ele]) => {
        if (!ele) {
          return;
        }
        const paneHiddenClass = ns.em('pane', 'hidden');
        if (!collapsed) {
          removeClass(ele, paneHiddenClass);
        } else {
          addClass(ele, paneHiddenClass);
        }

        if (collapsed && props.shrink) {
          removeClass(ele, paneHiddenClass);
          setStyle(ele, { flexBasis: `${props.shrinkWidth}px` });
        } else {
          setStyle(ele, { flexBasis: initialSize });
        }
      },
      { immediate: true }
    );

    // 收起时用于改变相邻 pane 的 flex-grow 属性来改变非自适应 pane 的 size
    const toggleNearPaneFlexGrow = (collapsed: boolean) => {
      const ele = domRef.value;
      if (!isHTMLElement(ele)) {
        return;
      }
      const flexGrowClass = ns.em('pane', 'grow');
      if (hasClass(ele, flexGrowClass)) {
        removeClass(ele, flexGrowClass);
      } else if (collapsed) {
        addClass(ele, flexGrowClass);
      }
    };

    // 暴露给外部使用
    expose({
      order: orderRef,
      getPaneSize,
      toggleNearPaneFlexGrow,
    });

    return () => {
      return (
        <div class={ns.e('pane')} ref={domRef}>
          {slots.default?.()}
        </div>
      );
    };
  },
});
