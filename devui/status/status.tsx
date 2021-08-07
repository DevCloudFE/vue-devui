
import { defineComponent, computed } from 'vue';
import './status.scss';
export type IStatusType = 'success' | 'error' | 'initial' | 'warning' | 'waiting' | 'running' | 'invalid';

export default defineComponent({
  name: 'DStatus',
  props: {
    type:{
      default: 'invalid',
      type: String as () => IStatusType
    }
  },
  setup(props, ctx) {
    const typeClass = computed(() => {
      const { type } = props;
      const typeStatus = ['success' , 'error' , 'initial' , 'warning' , 'waiting' , 'running' , 'invalid'];
      let typeClassStr = `devui-status devui-status-bg-invalid`;
      if(typeStatus.includes(type)){
        typeClassStr = `devui-status devui-status-bg-${type}`;
      }
      return typeClassStr;
    });
    return () => {
      return  <span class={typeClass.value}>
                  {ctx.slots.default?.()}
              </span>
    }
  }
})