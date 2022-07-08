import { defineComponent, provide, ref, computed, onMounted, toRefs } from 'vue';
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
    const overflow_container = ref<ComponentPublicInstance | null>(null);
    const overflowItemLength = ref(0);
    const rootClassName = computed(()=>({
      [`${ns.b()}`]: true,
      [`${ns.b()}-vertical`]: mode.value === 'vertical',
      [`${ns.b()}-horizontal`]: mode.value === 'horizontal',
      [`${ns.b()}-collapsed`]: collapsed.value
    }));
    onMounted(() => {
      if (props['mode'] === 'horizontal') {
        let flag = false;
        const overflowContainer = overflow_container.value?.$el as unknown as HTMLElement;
        const root = menuRoot.value as unknown as HTMLElement;
        const children = root.children;
        const container = overflowContainer.children[1];
        let preItem: HTMLElement | null;
        const ob = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            entries.forEach((v: IntersectionObserverEntry) => {
              if (!v.isIntersecting) {
                const cloneNode = v.target.cloneNode(true) as Element as HTMLElement;
                preItem = v.target as Element as HTMLElement;
                if (v.target.classList.contains(`${ns.b()}-overflow-container`)){
                  if (flag && v.target.previousElementSibling){
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
                }
              } else {
                if (
                  !v.target.classList.contains(`${ns.b()}-overflow-container`) &&
                  (v.target as HTMLElement).style.visibility === 'hidden'
                ) {
                  console.log(v.target, preItem, v.target === preItem);
                  ob.unobserve(v.target);
                  const el = container.children[container.children.length - 1];
                  root.insertBefore(el, overflowContainer);
                  const obItem = overflowContainer.previousElementSibling;
                  if (obItem) {
                    ob.observe(obItem);
                  }
                  if (obItem?.classList.contains('devui-submenu')){
                    const sub = obItem;
                    const wrapper = obItem.children[1] as HTMLElement;
                    (sub as HTMLElement).addEventListener('mouseenter', (ev: MouseEvent) => {
                      console.log('emit');
                      ev.stopPropagation();
                      useShowSubMenu('mouseenter', ev, wrapper);
                    });
                    (sub as HTMLElement).addEventListener('mouseleave', (ev: MouseEvent) => {
                      ev.stopPropagation();
                      useShowSubMenu('mouseleave', ev, wrapper);
                    });
                  }
                  (v.target as HTMLElement).style.visibility = '';
                  v.target.remove();
                  overflowItemLength.value -= 1;
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
            'white-space: nowrap',
          ]}>
          {ctx.slots.default?.()}
          <SubMenu
            ref={overflow_container}
            key="overflowContainer"
            title="..."
            class={`${ns.b()}-overflow-container`}
            v-show={overflowItemLength.value > 0 && mode.value === 'horizontal'}>
          </SubMenu>
        </ul>
      );
    };
  },
});
