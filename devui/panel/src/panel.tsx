import { defineComponent, ref, provide, computed} from 'vue';
import './panel.scss';
import { PanelProps } from './panel.type';
import Store from './store/store';

export default defineComponent({
  name: 'DPanel',
  props: PanelProps,
  setup(props, ctx) {
    provide('beforeToggle', props.beforeToggle);
    provide('showAnimation', computed(()=>props.showAnimation));
    provide('hasLeftPadding', computed(()=>props.hasLeftPadding));
    const isCollapsed = ref(props.isCollapsed);
    const onToggle = ()=> {
      props.toggle?.(Store.getByKey(`isCollapsed[${timeStamp}]`))
    };

    const timeStamp = new Date().getTime().toString();
    Store.setData(`isCollapsed[${timeStamp}]`, isCollapsed.value);

    return () => {
      return (
        <div onClick = {onToggle} class={`devui-panel devui-panel-${props.type} ${props.cssClass}`}>
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
})