import { defineComponent, ref, Transition, onMounted, watch } from 'vue';
import './panel.scss'

export type PanelType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';

export default defineComponent({
  name: 'd-panel',
  props: {
    type: {
      type: String as () => PanelType,
      default: 'default'
    },
    cssClass: {
      type: String,
      default: ''
    },
    isCollapsed: {
      type: Boolean,
      default: undefined
    },
    beforeToggle: Function as unknown as () => (value: boolean) => boolean | Promise<boolean>,
    toggle: Function as unknown as ()=> ((value: boolean) => void)
  },
  setup(props, ctx) {

    let isCollapsed = ref(props.isCollapsed);

    const bodyEl = ref();

    const canToggle = (): Promise<boolean> => {
      let changeResult = Promise.resolve(true);
      if(props.beforeToggle) {
        const result = props.beforeToggle(props.isCollapsed);
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
          isCollapsed.value = !isCollapsed.value;
          props.toggle?.(isCollapsed.value);
        }
      })
    }

    onMounted(() => {
      if(bodyEl.value) {
        const dom = bodyEl.value;
        if(isCollapsed.value)
        dom.style.height = `${dom.offsetHeight}px`;
      }
    })

    const enter = (element: Element ) => {
      const el = (element as HTMLElement);
      el.style.height = '';
      const height = el.offsetHeight;
      el.style.height = '0px';
      // 需要执行一次才会生效
      el.offsetHeight;
      el.style.height = `${height}px`;
    }
    const leave = (element: Element) => {
      const el = (element as HTMLElement);
      el.style.height = '0px';
    }
    
    return () => {

      const headerContent = (ctx.slots.header ? 
        <div class="devui-panel-heading" onClick={toggleBody} style={{ 'cursor': isCollapsed.value !== undefined ? 'pointer' : undefined }}>
          { ctx.slots.header?.() }
        </div> : null);

      const footerContent =  (ctx.slots.footer ? 
        <div class="devui-panel-footer">
          { ctx.slots.footer?.() } 
        </div> : null);

      return (
        <div class={`devui-panel devui-panel-${props.type} ${props.cssClass}`}>
          {headerContent}
          <Transition name="devui-panel" onEnter={ enter } onLeave={leave}>
            {isCollapsed.value === undefined || isCollapsed.value ?
            <div ref={bodyEl} class={`devui-panel-body ${isCollapsed.value !== undefined ? 'devui-panel-body-collapse': null}`}>
              <div class="d-panel-body">
                { ctx.slots.body?.() }
              </div>
            </div>: null }
          </Transition>
          {footerContent}
        </div>
      )
    }
  }
})
