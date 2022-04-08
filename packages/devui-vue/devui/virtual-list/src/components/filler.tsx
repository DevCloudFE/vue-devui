import type { CSSProperties, SetupContext } from 'vue';
import { defineComponent, ref } from 'vue';
import { virtualListFllterProps } from '../virtual-list-types';

const INIT_INNER_STYLE: CSSProperties = { display: 'flex', flexDirection: 'column' };

export default defineComponent({
  name: 'DVirtualListFllter',
  props: virtualListFllterProps,
  setup(props, ctx: SetupContext) {
    const outerStyle = ref<CSSProperties>({});
    const innerStyle = ref<CSSProperties>(INIT_INNER_STYLE);
    ctx.slots.default?.();
    return () => (
      <div style={outerStyle.value}>
        <div style={innerStyle.value}>
          <button
            onClick={() => {
              const vnode = ctx.slots.default?.();
              console.log(vnode);
              console.log(vnode?.[0]);
              console.log(vnode?.[0]?.children);
            }}
          >DVirtualListFllter</button>
        </div>
      </div>
    );
  }
});
