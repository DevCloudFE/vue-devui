import { defineComponent, reactive, ref, provide, onMounted, onUnmounted, watch } from 'vue';
import { splitterProps, SplitterProps } from './splitter-types';
import DSplitterBar from './splitter-bar';
import { SplitterStore } from './splitter-store';
import './splitter.scss';

export default defineComponent({
  name: 'DSplitter',
  components: {
    DSplitterBar
  },
  props: splitterProps,
  emits: [],
  setup(props: SplitterProps, ctx) {
    const store: SplitterStore = new SplitterStore();
    const state = reactive({
      panes: [] // 内嵌面板
    });

    state.panes = ctx.slots.DSplitterPane?.() || [];

    store.setPanes({ panes: state.panes });
    provide('orientation', props.orientation);
    provide('splitterStore', store);

    const domRef = ref<HTMLElement>();
    const refreshSplitterContainerSize = () => {
      if (!domRef.value) {return;}
      let containerSize = 0;
      if (props.orientation === 'vertical') {
        containerSize = domRef.value.clientHeight;
      } else {
        containerSize = domRef.value.clientWidth;
      }
      store.setSplitter({ containerSize });
    };

    const observer = new ResizeObserver(refreshSplitterContainerSize);
    watch(domRef, (ele) => {
      if (!ele) {
        return;
      }
      refreshSplitterContainerSize();
      observer.observe(domRef.value);
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return () => {
      const { splitBarSize, orientation, showCollapseButton } = props;
      const wrapperClass = ['devui-splitter', `devui-splitter-${orientation}`];

      return (
        <div class={wrapperClass} ref={domRef}>
          {state.panes}
          {state.panes
            .filter((pane, index, arr) => index !== arr.length - 1)
            .map((pane, index) => {
              return (
                <d-splitter-bar
                  key={index}
                  style={`order: ${index * 2 + 1}`}
                  splitBarSize={splitBarSize}
                  orientation={orientation}
                  index={index}
                  showCollapseButton={showCollapseButton}
                ></d-splitter-bar>
              );
            })}
        </div>
      );
    };
  }
});
