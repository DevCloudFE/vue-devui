import { defineComponent, provide, ref, computed, onMounted, toRefs, reactive } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { menuProps, MenuProps } from './menu-types';
import './menu.scss';
import { setDefaultIndent } from './composables/use-layer-operate';
import SubMenu from './components/sub-menu/sub-menu';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useShowSubMenu } from './components/sub-menu/use-sub-menu';

export default defineComponent({
  name: 'DMenu',
  props: menuProps,
  emits: ['select', 'deselect', 'submenu-change'],
  setup(props: MenuProps, ctx) {
    const ns = useNamespace('menu');
    const {openKeys, mode, collapsed} = toRefs(props);
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
    const overflow_container = ref<ComponentPublicInstance | null>(null);
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

    // This function used to update overflow container selected state.
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
        const overflowContainer = overflow_container.value?.$el as unknown as HTMLElement;
        const root = menuRoot.value as unknown as HTMLElement;
        const children = root.children;
        const container = overflowContainer.children[1];
        const ob = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            entries.forEach((v: IntersectionObserverEntry) => {
              if (!v.isIntersecting) {
                const cloneNode = v.target.cloneNode(true) as Element as HTMLElement;
                if (v.target.classList.contains(`${ns.b()}-overflow-container`)){
                  if (flag && v.target.previousElementSibling && container.children.length){
                    root.appendChild(v.target.previousElementSibling);
                  } else {flag = true;}
                } else {
                  overflowItemLength.value += 1;
                  (v.target as Element as HTMLElement).style.visibility = 'hidden';
                  if (overflowContainer.nextSibling) {
                    root.insertBefore(v.target, overflowContainer.nextSibling);
                  } else {
                    root.appendChild(v.target);
                  }
                  container.appendChild(cloneNode);
                  resetOverflowContainerSelectState(container);
                }
              } else {
                if (
                  !v.target.classList.contains(`${ns.b()}-overflow-container`) &&
                  (v.target as HTMLElement).style.visibility === 'hidden'
                ) {
                  ob.unobserve(v.target);
                  root.insertBefore(v.target, overflowContainer);
                  (v.target as HTMLElement).style.visibility = '';
                  const obItem = overflowContainer.previousElementSibling;
                  const canObAgin = obItem && (v.boundingClientRect.width % v.target.getBoundingClientRect().width === 0);
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
                  ob.observe(v.target);
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
            ref={overflow_container}
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
