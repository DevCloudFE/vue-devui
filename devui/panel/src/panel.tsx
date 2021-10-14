import { defineComponent, ref, Transition, onMounted, provide } from 'vue';
import './panel.scss';
import { PanelProps } from './panel.type';
import Store from './store/store';

export default defineComponent({
  name: 'DPanel',
  props: PanelProps,
  setup(props, ctx) {
    provide('beforeToggle', props.beforeToggle);
    provide('showAnimation', props.showAnimation);
    provide('hasLeftPadding', props.hasLeftPadding);
    const isCollapsed = ref(props.isCollapsed);
    const bodyEl = ref();
    const onToggle = ()=> {
      props.toggle?.(Store.getByKey(`isCollapsed[${timeStamp}]`))
    };

    onMounted(() => {
      if(bodyEl.value) {
        const dom = bodyEl.value;
        if(isCollapsed.value)
        dom.style.height = `${dom.offsetHeight}px`;
      }
    })

    const timeStamp = new Date().getTime().toString();
    Store.setData(`isCollapsed[${timeStamp}]`, isCollapsed.value);

    return () => {
      return (
        <div onClick = {onToggle} class={`devui-panel devui-panel-${props.type} ${props.cssClass}`}>
          {ctx.slots.default()}
        </div>
      )
    }
  },
})