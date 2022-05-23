import { clearSelect } from '../helper/layer-composables';
import { defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  Transition,
  watch,
  inject,
  Ref,
  reactive,
  toRefs,
} from "vue";
import { MenuItemProps, menuItemProps } from "../types/menu-item-types";
import { initSelect } from '../helper/init-select';
import { addActiveParent } from '../helper/add-active-parent';
import { useClick } from '../hook/use-click';
interface clickEvent extends MouseEvent{
  path: HTMLElement[];
}

export default defineComponent({
  name: 'DMenuItem',
  props: menuItemProps,
  setup(props: MenuItemProps, ctx){
    const instance = getCurrentInstance();
    const key = String(instance?.vnode.key);
    const mode = inject('mode') as Ref<('vertical' | 'horizontal')>;
    const multiple = inject('multiple') as boolean;
    const indent = inject('defaultIndent');
    const isCollapsed = inject('isCollapsed') as Ref<boolean>;
    const defaultSelectKey = (inject('defaultSelectKey') as string[]);
    const {disabled} = toRefs(props);
    const isSelect = ref(initSelect(defaultSelectKey, key, multiple, disabled));
    const isLayer1 = ref(true);
    const rootMenuEmit = inject('rootMenuEmit') as (eventName: string, ...args: unknown[]) => void;
    const classObject: Record<string,boolean> = reactive({
      'devui-menu-item': true,
      'devui-menu-item-isCollapsed': isCollapsed.value,
      'devui-isCollapsed-item': isCollapsed.value,
      'devui-menu-item-select': isSelect.value,
      'devui-menu-item-disabled': disabled.value
    });
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const ele = e.currentTarget as HTMLElement;
      if (!props.disabled){
        if (!multiple){
          clearSelect(ele,e,mode.value === 'horizontal');
          if (mode.value === 'horizontal'){
            useClick(e as clickEvent);
          } else {
            ele.classList.add('devui-menu-item-select');
          }
        } else {
          if (ele.classList.contains('devui-menu-item-select')){
            ele.classList.remove('devui-menu-item-select');
            rootMenuEmit('deselect', {type: 'deselect', el: ele, e});
            return;
          } else {
            ele.classList.add('devui-menu-item-select');
          }
        }
        rootMenuEmit('select', {type: 'select', el: ele, e});
      }
      if (mode.value === 'vertical'){
        const target = (e.currentTarget as HTMLElement);
        addActiveParent(target);
      }
      if (mode.value === 'horizontal') {
        const ul = ele.parentElement?.parentElement;
        ul?.classList.add('devui-menu-active-parent');
      }
    };
    const icons = <span class="devui-menu-icon">{ctx.slots.icon?.()}</span>;
    const menuItems = ref(null);
    watch(disabled, ()=> {classObject['devui-menu-item-select'] = false;});
    watch(defaultSelectKey, (n)=>{
      isSelect.value = initSelect(n,key,multiple,disabled);
      classObject['devui-menu-item-select'] = isSelect.value;
    });
    onMounted(()=>{
      let oldPadding = '';
      const ele = (menuItems.value) as unknown as HTMLElement;
      if (mode.value === 'vertical'){
        if (ele.parentElement?.parentElement?.classList.contains('devui-menu')){
          isLayer1.value = true;
          if (isLayer1.value){
            ele.style.paddingRight = ``;
            ele.style.paddingLeft = `${indent}px`;
          }
          watch(isCollapsed, (val)=>{
            if (val){
              if (ele.style.padding !== '0'){
                oldPadding = ele.style.padding;
              }
              setTimeout(() => {
                ele.style.padding = '0';
                ele.style.width = '';
                ele.style.textAlign = `center`;
              }, 300);
              ele.style.display=`block`;
            } else {
              ele.style.padding = `${oldPadding}`;
              ele.style.textAlign = ``;
              ele.style.display=`flex`;
            }
          });
        } else {
          isLayer1.value = false;
        }
      }
    });
    return () => {
      return (
        mode.value === 'vertical' ?
          <div class='devui-menu-item-vertical-wrapper'>
            <li
              class = {
                [
                  classObject,
                  props['disabled'] ? 'devui-menu-item-disabled' : '',
                  isLayer1.value ? 'layer_1' : '',
                ]
              }
              onClick={onClick}
              ref={menuItems}
            >
              {ctx.slots.icon !== undefined &&
                icons
              }
              { props.href === '' ?
                <Transition name='fade'>
                  <span v-show={!isCollapsed.value}>
                    {ctx.slots.default?.()}
                  </span>
                </Transition>
                :
                <a href={props.href}>
                  <Transition name='fade'>
                    {ctx.slots.default?.()}
                  </Transition>
                </a>
              }
            </li>
          </div>
          :
          <li
            class = {
              [
                classObject,
                props['disabled'] ? 'devui-menu-item-disabled' : '',
                isLayer1.value ? 'layer_1' : '',
              ]
            }
            onClick={onClick}
            ref={menuItems}
          >
            {ctx.slots.icon !== undefined &&
              icons
            }
            { props.href === '' ?
              <Transition name='fade'>
                <span v-show={!isCollapsed.value}>
                  {ctx.slots.default?.()}
                </span>
              </Transition>
              :
              <a href={props.href}>
                <Transition name='fade'>
                  {ctx.slots.default?.()}
                </Transition>
              </a>
            }
          </li>
      );
    };
  },
});
