
import { defineComponent, computed } from 'vue'
import '../status.scss';
export type IStatusType = 'success' | 'error' | 'reset' | 'initial' |'waiting'|'running'|'invalid';

export default defineComponent({
  name: 'DStatus',
  props: {
    type:{
      default: 'invalid',
      value: String as () => IStatusType
    }
  },
  setup(props, ctx) {

    const typeClass = computed(() => {
      const { type } = props;
      const typeClassStr = `devui-status devui-status-bg-${type}`;
      return typeClassStr;
    });

    return () => {
    
      return  <span class={typeClass.value}>
                  {ctx.slots.default?.()}
              </span>
    }
  }
})