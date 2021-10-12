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
          }
      
          const toggleBody = (): void => {
            canToggle().then((val) => {
              if (!val){
                return;
              }
              if (isCollapsed.value !== undefined) {
                Store.setData(`${key}`, !isCollapsed.value);
                isCollapsed.value = !isCollapsed.value;
                props.toggle?.(isCollapsed.value);
              }
            })
            
          };
        return () => {
            let header = null;
            if (ctx.slots.default){
                header = (
                    <div class="devui-panel-heading" onClick={toggleBody} style={{ 'cursor': isCollapsed.value !== undefined ? 'pointer' : 'auto' }}>
                        {ctx.slots.default?.()}
                    </div>
                )
            }
            return header
        }
    },
})