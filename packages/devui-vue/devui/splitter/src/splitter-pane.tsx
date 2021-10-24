import {
  defineComponent,
  ref,
  watch,
  nextTick,
  inject,
  onMounted,
  onUpdated,
} from 'vue';
import { addClass, hasClass, removeClass } from '../../shared/util/class';
import { setStyle } from '../../shared/util/set-style';
import type { SplitterStore } from './splitter-store';
import { splitterPaneProps, SplitterPaneProps } from './splitter-pane-type';
import './splitter-pane.scss';

export default defineComponent({
  name: 'DSplitterPane',
  props: splitterPaneProps,
  emits: ['sizeChange', 'collapsedChange'],
  setup(props: SplitterPaneProps, { slots, expose }) {
    const store: SplitterStore = inject('splitterStore');
    const domRef = ref<null | HTMLElement>();
    const order = ref();

    const orientation = inject('orientation');
    let initialSize = ''; // 记录初始化挂载传入的大小
    onMounted(() => {
      initialSize = props.size;
      store.setPanes({ panes: store.state.panes });
    });

    onUpdated(() => {
      store.setPanes({ panes: store.state.panes });
    });

    // 获取当前 pane大小
    const getPaneSize = (): number => {
      const el = domRef?.value;
      if (orientation === 'vertical') {
        return el.offsetHeight;
      } else {
        return el.offsetWidth;
      }
    };


    onMounted(() => {
      watch([order, domRef], ([order, dom]) => {
        if (!(dom instanceof HTMLElement)) {
          return;
        }
        setStyle(dom, { order });
      });

      watch(() => props.size, (curSize: string) => {
        const ele = domRef.value;
        ele.style.flexBasis = curSize;
        const paneFixedClass = 'devui-splitter-pane-fixed';
        if (curSize) {
          // 设置 flex-grow 和 flex-shrink
          addClass(ele, paneFixedClass);
        } else {
          removeClass(ele, paneFixedClass);
        }
      }, { immediate: true });

      watch(() => props.collapsed, (collapsed: boolean) => {
        const paneHiddenClass = 'devui-splitter-pane-hidden';
        nextTick(() => {
          const el = domRef.value;
          if (!collapsed) {
            removeClass(el, paneHiddenClass);
          } else {
            addClass(el, paneHiddenClass);
          }

          if (collapsed && props.shrink) {
            removeClass(el, paneHiddenClass);
            setStyle(el, { flexBasis: `${props.shrinkWidth}px` });
          } else {
            setStyle(el, { flexBasis: initialSize });
          }
        });
      }, { immediate: true });
    });

    // 收起时用于改变相邻 pane 的 flex-grow 属性来改变非自适应 pane 的 size
    const toggleNearPaneFlexGrow = (collapsed: boolean) => {
      nextTick(() => {
        const flexGrowClass = 'devui-splitter-pane-grow';
        if (hasClass(domRef.value, flexGrowClass)) {
          removeClass(domRef.value, flexGrowClass);
        } else if (collapsed) {
          addClass(domRef.value, flexGrowClass);
        }
      });
    };

    // 暴露给外部使用
    expose({
      order,
      getPaneSize,
      toggleNearPaneFlexGrow,
    });

    return () => {
      return (
        <div class="devui-splitter-pane" ref={domRef}>
          {slots.default?.()}
        </div>
      );
    };
  },
});
