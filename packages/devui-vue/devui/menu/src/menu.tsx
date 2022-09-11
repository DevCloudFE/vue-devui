import { defineComponent, provide, ref, computed, onMounted, toRefs, reactive } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { menuProps, MenuProps } from './menu-types';
import './menu.scss';
import { setDefaultIndent } from './composables/use-layer-operate';
import SubMenu from './components/sub-menu/sub-menu';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useShowSubMenu } from './components/sub-menu/use-sub-menu';
import { randomId } from '../../shared/utils';
import { useStore } from './composables/use-store';

export default defineComponent({
  name: 'DMenu',
  props: menuProps,
  emits: ['select', 'deselect', 'submenu-change'],
  setup(props: MenuProps, ctx) {
    const ns = useNamespace('menu');
    const {openKeys, mode, collapsed} = toRefs(props);
    // This ID is only for internal use. So we unwanted use reactivity
    const menuId = randomId(16);
    // register menu to recordTable.
    const store = useStore(menuId);
    provide('menuStore', store);
    provide('isCollapsed', collapsed);
    provide('defaultIndent', props['indentSize']);
    provide('multiple', props['multiple']);
    provide('openKeys', openKeys);
    provide('defaultSelectKey', props.defaultSelectKeys);
    provide('mode', mode);
    provide('collapsedIndent', props['collapsedIndent']);
    provide('rootMenuEmit', ctx.emit);
    provide('useRouter', props.router);
    setDefaultIndent(props['indentSize']);
    const menuRoot = ref(null);
    const overflowItemLength = ref(0);
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
    onMounted(() => {
      if (props['mode'] === 'horizontal') {
        let flag = false;
        const overflowContainerElement = overflowContainer.value?.$el as unknown as HTMLElement;
        const root = menuRoot.value as unknown as HTMLElement;
        const children = root.children;
        const container = overflowContainerElement.children[1];
        const ob = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
              if (!entry.isIntersecting) {
                const cloneNode = entry.target.cloneNode(true) as Element as HTMLElement;
                if (entry.target.classList.contains(`${ns.b()}-overflow-container`)){
                  if (flag && entry.target.previousElementSibling && container.children.length){
                    root.appendChild(entry.target.previousElementSibling);
                  } else {flag = true;}
                } else {
                  overflowItemLength.value += 1;
                  (entry.target as Element as HTMLElement).style.visibility = 'hidden';
                  if (overflowContainerElement.nextSibling) {
                    root.insertBefore(entry.target, overflowContainerElement.nextSibling);
                  } else {
                    root.appendChild(entry.target);
                  }
                  container.appendChild(cloneNode);
                  resetOverflowContainerSelectState(container);
                }
              } else {
                if (
                  !entry.target.classList.contains(`${ns.b()}-overflow-container`) &&
                  (entry.target as HTMLElement).style.visibility === 'hidden'
                ) {
                  ob.unobserve(entry.target);
                  root.insertBefore(entry.target, overflowContainerElement);
                  (entry.target as HTMLElement).style.visibility = '';
                  const obItem = overflowContainerElement.previousElementSibling;
                  const canObAgin = obItem && (entry.boundingClientRect.width % entry.target.getBoundingClientRect().width === 0);
                  if (canObAgin) {
                    ob.observe(obItem);
                  }
                  if (obItem?.classList.contains('devui-submenu')){
                    const sub = obItem;
                    const wrapper = obItem.children[1] as HTMLElement;
                    (sub as HTMLElement).addEventListener('mouseenter', (ev: MouseEvent) => {
                      ev.stopPropagation();
                      useShowSubMenu('mouseenter', ev, wrapper);
                    });
                    (sub as HTMLElement).addEventListener('mouseleave', (ev: MouseEvent) => {
                      ev.stopPropagation();
                      useShowSubMenu('mouseleave', ev, wrapper);
                    });
                  }
                  overflowItemLength.value -= 1;
                  ob.observe(entry.target);
                  if (container.lastChild){
                    container.removeChild(container.lastChild);
                  }
                  resetOverflowContainerSelectState(container);
                }
              }
            });
          },
          {
            root: root,
            threshold: 1,
            rootMargin: '8px'
          }
        );
        for (let i = 0; i < children.length; i++) {
          ob.observe(children[i]);
        }
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
          {ctx.slots.default?.()}
          <SubMenu
            ref={overflowContainer}
            key="overflowContainer"
            title="..."
            class={overflowContainerClassName}
            v-show={overflowItemLength.value > 0 && mode.value === 'horizontal'}>
          </SubMenu>
        </ul>
      );
    };
  },
});
