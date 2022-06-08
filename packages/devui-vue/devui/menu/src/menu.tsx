import { defineComponent, provide, ref, computed, onMounted } from 'vue';
import { menuProps, MenuProps } from './menu-types';
import './menu.scss';
import { setDefaultIndent } from './composables/use-layer-operate';
import SubMenu from './components/sub-menu/sub-menu';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DMenu',
  props: menuProps,
  emits: ['select', 'dselect', 'submenu-change'],
  setup(props: MenuProps, ctx) {
    const ns = useNamespace('menu');

    const isCollapsed = computed(() => props.collapsed);
    const mode = computed(() => props['mode']);
    provide('isCollapsed', isCollapsed);
    provide('defaultIndent', props['indentSize']);
    provide('multiple', props['multiple']);
    provide('openKeys', props.openKeys);
    provide('defaultSelectKey', props.defaultSelectKeys);
    provide('mode', mode);
    provide('collapsedIndent', ref(props['collapsedIndent']));
    provide('rootMenuEmit', ctx.emit);
    setDefaultIndent(props['indentSize']);
    const menuRoot = ref(null);
    const overflow_container = ref(null);
    const overflowItemLength = ref(0);
    onMounted(() => {
      //
      if (props['mode'] === 'horizontal') {
        const overflowContainer = overflow_container.value?.$el as unknown as HTMLElement;
        const root = menuRoot.value as unknown as HTMLElement;
        const children = root.children;
        const container = overflowContainer.children[1];
        const ob = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            entries.forEach((v: IntersectionObserverEntry) => {
              if (!v.isIntersecting) {
                if (!v.target.classList.contains(`${ns.b()}-overflow-container`)) {
                  overflowItemLength.value += 1;
                  const cloneNode = v.target.cloneNode(true) as Element as HTMLElement;
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
                  ob.unobserve(v.target);
                  root.insertBefore(container.children[container.children.length - 1], overflowContainer);
                  const obItem = overflowContainer.previousElementSibling;
                  if (obItem) {
                    ob.observe(obItem);
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
          class={[`${ns.b()}`, `${ns.b()}-${props['mode']}`, props['collapsed'] ? `${ns.b()}-collapsed` : '']}
          style={[
            props['collapsed'] ? `width:${props['collapsedIndent'] * 2}px` : `width: ${props['width']}`,
            'overflow: hidden',
            'white-space: nowrap',
          ]}>
          {ctx.slots.default?.()}
          <SubMenu
            ref={overflow_container}
            key="overflowContainer"
            title="..."
            class={`${ns.b()}-overflow-container`}
            v-show={overflowItemLength.value > 0}></SubMenu>
        </ul>
      );
    };
  },
});
