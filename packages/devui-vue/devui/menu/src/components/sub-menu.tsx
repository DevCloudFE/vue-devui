import {
  ComponentInternalInstance,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  Ref,
  ref,
  watchEffect,
  watch,
} from 'vue';
import { addLayer, pushElement, changeKey,getLayer } from '../composables/layer-composables';
import { SubMenuProps, subMenuProps } from '../types/sub-menu-types';
export default defineComponent({
  name: 'DSubMenu',
  props: subMenuProps,
  setup(props: SubMenuProps, ctx){
    const isShow = ref(true);
    const {vnode:{key}} = getCurrentInstance() as ComponentInternalInstance;
    const key_ = String(key);
    const isOpen = ref(false);
    const defaultOpenKeys = (inject('openKeys') as string[]);
    const indent = inject('defaultIndent');
    const isCollapsed = inject('isCollapsed') as Ref<boolean>;
    const mode = inject('mode') as Ref<string>;
    const parentEmit = inject('rootMenuEmit') as (eventName: 'submenu-change', ...args: any[]) => void;
    if (key_ === 'null'){
      console.warn(`[devui][menu]: Key can not be null`);
    } else {
      if (defaultOpenKeys.includes(key_)){
        isOpen.value = true;
      } else {
        isOpen.value = false;
      }
    }
    const clickHandle = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (mode.value === 'horizontal'){
        const ele = e.currentTarget as HTMLElement;
        changeKey(ele, e);
        ele.classList.add('devui-menu-item-select');
      }
      if (!props.disable && mode.value !== 'horizontal'){
        const target = e.target as HTMLElement;
        let cur = e.target as HTMLElement;
        if (target.tagName === 'UL'){
          if (target.classList.contains('devui-submenu-open')){
            isOpen.value = !isOpen.value;
          } else {
            isOpen.value = isOpen.value;
          }
        } else {
          while (cur && cur.tagName !== 'UL'){
            if (cur.tagName === 'LI'){
              break;
            }
            cur = cur.parentElement as HTMLElement;
          }
          if (cur.tagName === 'UL'){
            if (cur.classList.contains('devui-submenu-open')){
              isOpen.value = false;
            } else {
              isOpen.value = true;
            }
          }
        }
        parentEmit('submenu-change', {type: 'submenu-change', state: isOpen.value, el: cur});
      }
    };
    const subMenu = ref(null);
    let title = ref(null);
    let oldPadding = '';
    const class_layer = ref('');
    watchEffect(()=>{
      title = title.value as any;
      pushElement({el: subMenu.value} as any);
    },{'flush':'post'});
    watch(defaultOpenKeys, (n,v)=>{
      if (n.includes(key_)){
        isOpen.value = true;
      } else {
        isOpen.value = false;
      }
    });
    onMounted(()=>{
      const el = title as unknown as HTMLElement;
      const e = subMenu.value as unknown as HTMLElement;
      addLayer();
      class_layer.value = `layer_${Array.from(e.classList).at(-1)?.replace('layer_','')}`;
      watch(isCollapsed, (newValue)=>{
        const layer = Number(getLayer(e));
        if (!Number.isNaN(layer)){
          if (layer > 2){
            if (isCollapsed.value){
              isShow.value = false;
            } else {
              isShow.value = true;
            }
          }
        }
        if (newValue){
          if (el.style.padding !== '0'){
            oldPadding = el.style.padding;
          }
          setTimeout(() => {
            el.style.padding = '0';
            el.style.width = '';
            el.style.textAlign = `center`;
          }, 300);
          el.style.display=`block`;
        } else {
          el.style.padding = `${oldPadding}`;
          el.style.textAlign = ``;
          el.style.display=`flex`;
        }
      });
    });
    return () => {
      return (
        <ul
          v-show={isShow.value}
          onClick={clickHandle}
          class={
            ['devui-submenu',
              !props['disable'] && isOpen.value && isShow.value ? 'devui-submenu-open' : 'devui-submenu-close',
              class_layer.value]
          }
          ref={subMenu}>
          {
            props.title ?
              <div
                class={['devui-submenu-title',props['disable'] && 'devui-sub-menu-disabled',]}
                style={`padding: 0 ${indent}px`} ref={title}>
                <span class="devui-menu-icon">{ctx.slots?.icon?.()}</span>
                <span
                  v-show={!isCollapsed.value} class="devui-submenu-title-content">
                  {props.title}
                </span>
                <i
                  v-show={!isCollapsed.value && mode.value !== 'horizontal'}
                  class={
                    {
                      'icon icon-chevron-up': !isOpen.value,
                      'icon icon-chevron-down': isOpen.value
                    }
                  }></i>
              </div>
              :
              <div
                class={['devui-submenu-title',props['disable'] && 'devui-sub-menu-disabled',]}
                style={`padding: 0 ${indent}px`} ref={title}
              >
                <span class="devui-menu-icon">
                  {ctx.slots.icon?.()}
                </span>
              </div>
          }
          {mode.value === 'horizontal' ?
            <div class="devui-menu-item-horizontal-wrapper">
              {ctx.slots.default?.()}
            </div>:
            ctx.slots.default?.()
          }
        </ul>
      );
    };
  }
});
