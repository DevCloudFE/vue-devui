import {
  defineComponent,
  provide,
  ref,
  computed,
} from 'vue';
import { menuProps, MenuProps } from './types/menu-types';
import './menu.scss';
import {setDefaultIndent} from './composables/Layers';

export default defineComponent({
  name: 'DMenu',
  props: menuProps,
  emits: ['select','dselect', 'submenu-change'],
  setup(props: MenuProps, ctx) {
    const isCollapsed = computed(()=>props.collapsed);
    const mode = computed(()=>props['mode']);
    provide('isCollapsed',isCollapsed);
    provide('defaultIndent', props['indentSize']);
    provide('multiple', props['multiple']);
    provide('openKeys', props.openKeys);
    provide('defaultSelectKey',props.defaultSelectKeys);
    provide('mode', mode);
    provide('collapsedIndent', ref(props['collapsedIndent']));
    provide('rootMenuEmit', ctx.emit);
    setDefaultIndent(props['indentSize']);
    return () => {
      return (
        <ul
          class={
            [
              `devui-menu`,
              `devui-menu-${props['mode']}`,
              props['collapsed'] ? 'devui-menu-collapsed' : ''
            ]
          }
          style={
            [
              props['collapsed'] ? `width:${props['collapsedIndent']*2}px` : `width: ${props['width']}`
            ]
          }
        >
          {ctx.slots.default?.()}
        </ul>
      );
    };
  }
});
