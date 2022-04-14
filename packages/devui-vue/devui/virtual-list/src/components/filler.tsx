import type { CSSProperties, SetupContext } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import { virtualListFllterProps } from '../virtual-list-types';
import ResizeObserver from './resize-observer';

const INIT_INNER_STYLE: CSSProperties = { display: 'flex', flexDirection: 'column' };

export default defineComponent({
  name: 'DVirtualListFllter',
  props: virtualListFllterProps,
  setup(props, ctx: SetupContext) {
    const outerStyle = ref<CSSProperties>({});
    const innerStyle = ref<CSSProperties>(INIT_INNER_STYLE);
    watch([() => props.height, () => props.offset], () => {
      if (props.offset !== undefined) {
        outerStyle.value = { height: `${props.height}px`, position: 'relative', overflow: 'hidden' };
        innerStyle.value = {
          ...innerStyle.value,
          transform: `translateY(${props.offset}px)`,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
        };
      }
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
