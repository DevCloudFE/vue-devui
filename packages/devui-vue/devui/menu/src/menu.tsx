import {
  defineComponent,
  provide,
  ref,
  computed,
  onMounted,
  toRefs,
  reactive,
  h,
} from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { menuProps, MenuProps } from './menu-types';
import './menu.scss';
import { setDefaultIndent } from './composables/use-layer-operate';
import SubMenu from './components/sub-menu/sub-menu';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { randomId } from '../../shared/utils';
import { useStore } from './composables/use-store';
import { useResizeObserver } from '@vueuse/core';

export default defineComponent({
  name: 'DMenu',
  props: menuProps,
  emits: ['select', 'deselect', 'submenu-change'],
  setup(props: MenuProps, ctx) {
    const ns = useNamespace('menu');
    const {openKeys, mode, collapsed, defaultSelectKeys} = toRefs(props);
    // This ID is only for internal use. So we unwanted use reactivity
    const menuId = randomId(16);
    // register menu to recordTable.
    const store = useStore(menuId);
    provide('menuStore', store);
    provide('isCollapsed', collapsed);
    provide('defaultIndent', props['indentSize']);
    provide('multiple', props['multiple']);
    provide('openKeys', openKeys);
    provide('defaultSelectKey', defaultSelectKeys);
    provide('mode', mode);
    provide('collapsedIndent', props['collapsedIndent']);
    provide('rootMenuEmit', ctx.emit);
    provide('useRouter', props.router);
    setDefaultIndent(props['indentSize']);
    const menuRoot = ref(null);
    const overflowContainer = ref<ComponentPublicInstance | null>(null);
    const selectClassName = `${ns.b()}-item-select`;
    const rootClassName = computed(()=>({
      [`${ns.b()}`]: true,
      [`${ns.b()}-vertical`]: mode.value === 'vertical',
      [`${ns.b()}-horizontal`]: mode.value === 'horizontal',
      [`${ns.b()}-collapsed`]: collapsed.value
    }));
    const overflowContainerClassName = reactive({
      [selectClassName]: false,
      [`${ns.b()}-overflow-container`]: true
    });
    // 如果一个或多个菜单元素被选中，当宽度发生变化时。如果溢出容易中有被选中的元素，那么溢出容器也应当被选中
    const resetOverflowContainerSelectState = (e: Element) => {
      const children = Array.from(e.children);
      for (const item of children){
        if (item.classList.contains(selectClassName)){
          overflowContainerClassName[selectClassName] = true;
          break;
        } else {
          overflowContainerClassName[selectClassName] = false;
        }
      }
    };
    const slots = ref(ctx.slots.default?.().map((item)=>h(item)));
    const flag = ref(false);
    onMounted(() => {
      if (props['mode'] === 'horizontal') {
        const root = menuRoot.value as unknown as HTMLElement;
        const overflowWrapper = (overflowContainer.value?.$el as HTMLElement).lastElementChild;
        const overflowContainerElement = overflowContainer.value?.$el as HTMLElement;
        const isOverflow = (el: HTMLElement = root) =>  {
          return el.scrollWidth > el.offsetWidth;
        };
        useResizeObserver(root, async () => {
          while (overflowWrapper?.childNodes.length !== 1){
            const item = overflowWrapper?.lastChild;
            if (item){
              root.insertBefore(item, overflowContainerElement);
            }
            flag.value = false;
          }
          while (isOverflow() && root.children.length > 1){
            const popChild = overflowContainerElement.previousElementSibling;
            if (popChild){
              overflowWrapper?.appendChild(popChild);
              flag.value = true;
            }
          }
          if (overflowWrapper){
            resetOverflowContainerSelectState(overflowWrapper);
          }
        });
      }
    });
    return () => {
      return (
        <ul
          ref={menuRoot}
          class={rootClassName.value}
          style={[
            props['collapsed'] ? `width:${props['collapsedIndent'] * 2}px` : `width: ${props['width']}`,
          ]}>
          {slots.value}
          <SubMenu
            ref={overflowContainer}
            key="overflowContainer"
            title="..."
            class={overflowContainerClassName}
            v-show={flag.value}
          >
          </SubMenu>
        </ul>
      );
    };
  },
});
