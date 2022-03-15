import { defineComponent,ref,onMounted,Transition,inject,Ref } from 'vue';
import { PanelProps } from '../panel.type';
import Store from '../store/store';

export default defineComponent({
  name: 'DPanelBody',
  props:PanelProps,
  setup(props,ctx){
    const animationName = inject('showAnimation') as Ref<any>;
    const hasLeftPadding = inject('hasLeftPadding') as Ref<any>;
    const keys = Object.keys(Store.state());
    const key = keys.pop();
    const isCollapsed = Store.state();
    const bodyEl = ref();
    onMounted(() => {
      if(bodyEl.value) {
        const dom = bodyEl.value;
        if(isCollapsed[key])
        {dom.style.height = `${dom.offsetHeight}px`;}
      }
    });

    const enter = (element: Element) => {
      const el = (element as HTMLElement);
      el.style.height = '';
      const height = el.offsetHeight;
      el.style.height = '0px';
      // 需要执行一次才会生效
      el.offsetHeight;
      el.style.height = `${height}px`;
    };
    const leave = (element: Element) => {
      const el = (element as HTMLElement);
      el.style.height = '0px';
    };
    return () => {
      return (
        <div class={`devui-panel devui-panel-${props.type} ${props.cssClass}`}>
          <Transition name={animationName.value ? 'devui-panel' : ''} onEnter={ enter } onLeave={leave}>
            {isCollapsed[key] === undefined || isCollapsed[key] ?
              <div ref={bodyEl} class={`devui-panel-body ${isCollapsed[key] !== undefined ? 'devui-panel-body-collapse': ''} ${!hasLeftPadding.value ? 'no-left-padding' : ''}`}>
                <div class="devui-panel-content">
                  {ctx.slots.default?.()}
                </div>
              </div>: null }
          </Transition>
        </div>
      );
    };
  },
});
