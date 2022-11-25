import { defineComponent, reactive, ref, provide } from 'vue';
import DSplitterBar from './components/splitter-bar';
import { SplitterStore, type SplitterPane } from './splitter-store';
import { splitterProps, SplitterProps, SplitterState } from './splitter-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useResizeObserver } from '@vueuse/core';
import './splitter.scss';

export default defineComponent({
  name: 'DSplitter',
  components: {
    DSplitterBar,
  },
  props: splitterProps,
  emits: [],
  setup(props: SplitterProps, ctx) {
    const store: SplitterStore = new SplitterStore();
    const state = reactive<SplitterState>({
      panes: [], // 内嵌面板
    });
    const ns = useNamespace('splitter');

    state.panes = ctx.slots.DSplitterPane?.() || [];

    store.setPanes({ panes: state.panes as unknown as SplitterPane[] });
    provide('orientation', props.orientation);
    provide('splitterStore', store);

    const domRef = ref<HTMLElement>();
    const refreshSplitterContainerSize = () => {
      if (!domRef.value) {
        return;
      }
      let containerSize = 0;
      if (props.orientation === 'vertical') {
        containerSize = domRef.value.clientHeight;
      } else {
        containerSize = domRef.value.clientWidth;
      }
      store.setSplitter({ containerSize });
    };

    useResizeObserver(domRef, refreshSplitterContainerSize);

    return () => {
      const { splitBarSize, orientation, showCollapseButton } = props;
      const wrapperClass = [ns.b(), ns.m(orientation)];

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
                  showCollapseButton={showCollapseButton}></d-splitter-bar>
              );
            })}
        </div>
      );
    };
  },
});
