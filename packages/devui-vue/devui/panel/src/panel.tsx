import { defineComponent, ref, provide, computed} from 'vue';
import './panel.scss';
import { PanelProps } from './panel.type';
import Store from './store/store';

export default defineComponent({
  name: 'DPanel',
  props: PanelProps,
  emits: ['toggle'],
  setup(props, ctx) {
    provide('beforeToggle', props.beforeToggle);
    provide('showAnimation', computed(()=>props.showAnimation));
    provide('hasLeftPadding', computed(()=>props.hasLeftPadding));
    const isCollapsed = ref(props.isCollapsed);
    const type = computed(()=>props.type);
    const cssClass = computed(()=>props.cssClass);
    const timeStamp = new Date().getTime().toString() + Math.random();
    const onToggle = ()=> {
      ctx.emit('toggle', Store.getByKey(`isCollapsed[${timeStamp}]`));
    };
    Store.setData(`isCollapsed[${timeStamp}]`, isCollapsed.value);
    return () => {
      return (
        <div onClick = {onToggle} class={`devui-panel devui-panel-${type.value} ${cssClass.value}`}>
          {ctx.slots.default?.()}
        </div>
      );
    };
  }
});
