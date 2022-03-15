import { defineComponent,ref,inject } from 'vue';
import {PanelProps} from '../panel.type';
import Store from '../store/store';

export default defineComponent({
  name: 'DPanelHeader',
  props: PanelProps,
  setup(props,ctx){
    const beforeToggle = inject('beforeToggle');
    const keys = Object.keys(Store.state());
    const key = keys.pop();
    const isCollapsed = ref(Store.state()[key]);
    // 当beforeToggle为fals时
    // 最好cursor是default 而不是 pointer；
    // pointer一般用于可点击的
    // 用changeFlag
    const changeFlag = ref();
    let header = null;


    const canToggle = (): Promise<boolean> => {
      let changeResult = Promise.resolve(true);
      if(beforeToggle) {
        const result = beforeToggle(isCollapsed);
        if(typeof result !== undefined) {
          if(result instanceof Promise) {
            changeResult = result;
          } else {
            changeResult = Promise.resolve(result);
          }
        }
      }
      return changeResult;
    };

    // 需要执行一次才能生效；
    canToggle().then((val)=>changeFlag.value = val);

    const toggleBody = (): void => {
      canToggle().then((val) => {
        changeFlag.value = val;
        if (!val){
          // 禁止折叠不影响展开
          if (!isCollapsed.value){
            Store.setData(`${key}`, !isCollapsed.value);
            isCollapsed.value = !isCollapsed.value;
            props.toggle?.(isCollapsed.value);
          }
          return;
        }
        if (isCollapsed.value !== undefined) {
          Store.setData(`${key}`, !isCollapsed.value);
          isCollapsed.value = !isCollapsed.value;
          props.toggle?.(isCollapsed.value);
        }
      });

    };
    return () => {
      if (ctx.slots.default){
        header = (
          <div class="devui-panel-heading" onClick={toggleBody} style={{ 'cursor': changeFlag.value ? 'pointer' : 'auto' }}>
            {ctx.slots.default?.()}
          </div>
        );
      }
      return header;
    };
  },
});
