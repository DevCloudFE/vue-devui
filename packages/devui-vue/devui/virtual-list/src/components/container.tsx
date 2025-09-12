import type { CSSProperties, SetupContext } from 'vue';
import { defineComponent, ref, watch, toRefs } from 'vue';
import { resizeObserverContainerProps } from '../virtual-list-types';
import ResizeObserver from './resize-observer';

const INIT_INNER_STYLE: CSSProperties = { display: 'flex', flexDirection: 'column' };

export default defineComponent({
  name: 'ResizeObserverContainer',
  props: resizeObserverContainerProps,
  setup(props, ctx: SetupContext) {
    const { height, offset } = toRefs(props);
    const outerStyle = ref<CSSProperties>({});
    const innerStyle = ref<CSSProperties>(INIT_INNER_STYLE);
    watch([() => height.value, () => offset.value], () => {
      if (props.offset !== undefined) {
        outerStyle.value = { height: `${height.value}px`, position: 'relative', overflow: 'hidden' };
        innerStyle.value = {
          ...innerStyle.value,
          transform: `translateY(${offset.value}px)`,
          left: 0,
          right: 0,
          top: 0,
        };
      }
    }, {
      immediate: true,
    });

    return () => (
      <div style={outerStyle.value}>
        <ResizeObserver
          onResize={({ offsetHeight }) => {
            if (offsetHeight && props.onInnerResize) {
              props.onInnerResize();
            }
          }}
        >
          <div style={innerStyle.value}>
            {ctx.slots.default?.()}
          </div>
        </ResizeObserver>
      </div>
    );
  }
});
