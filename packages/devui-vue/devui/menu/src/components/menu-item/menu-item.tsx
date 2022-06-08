import { clearSelect } from '../../composables/use-layer-operate';
import { defineComponent, getCurrentInstance, onMounted, ref, Transition, watch, inject, Ref, reactive, toRefs } from 'vue';
import { MenuItemProps, menuItemProps } from './menu-item-types';
import { initSelect, addActiveParent } from './use-menu-item';
import { useClick } from '../../composables/use-click';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

const ns = useNamespace('menu');

const menuItemSelect = `${ns.b()}-item-select`;
const menuItemDisabled = `${ns.b()}-item-disabled`;

interface clickEvent extends MouseEvent {
  path: HTMLElement[];
}

export default defineComponent({
  name: 'DMenuItem',
  props: menuItemProps,
  setup(props: MenuItemProps, ctx) {
    const instance = getCurrentInstance();
    const key = String(instance?.vnode.key);
    const mode = inject('mode') as Ref<'vertical' | 'horizontal'>;
    const multiple = inject('multiple') as boolean;
    const indent = inject('defaultIndent');
    const isCollapsed = inject('isCollapsed') as Ref<boolean>;
    const defaultSelectKey = inject('defaultSelectKey') as string[];
    const { disabled } = toRefs(props);
    const isSelect = ref(initSelect(defaultSelectKey, key, multiple, disabled));
    const isLayer1 = ref(true);
    const rootMenuEmit = inject('rootMenuEmit') as (eventName: string, ...args: unknown[]) => void;
    const classObject: Record<string, boolean> = reactive({
      [`${ns.b()}-item`]: true,
      [`${ns.b()}-item-isCollapsed`]: isCollapsed.value,
      [`${ns.b()}-isCollapsed-item`]: isCollapsed.value,
      [menuItemSelect]: isSelect.value,
      [menuItemDisabled]: disabled.value,
    });
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const ele = e.currentTarget as HTMLElement;
      if (!props.disabled) {
        if (!multiple) {
          clearSelect(ele, e, mode.value === 'horizontal');
          if (mode.value === 'horizontal') {
            useClick(e as clickEvent);
          } else {
            ele.classList.add(menuItemSelect);
          }
        } else {
          if (ele.classList.contains(menuItemSelect)) {
            ele.classList.remove(menuItemSelect);
            rootMenuEmit('deselect', { type: 'deselect', el: ele, e });
            return;
          } else {
            ele.classList.add(menuItemSelect);
          }
        }
        rootMenuEmit('select', { type: 'select', el: ele, e });
      }
      if (mode.value === 'vertical') {
        const target = e.currentTarget as HTMLElement;
        addActiveParent(target);
      }
      if (mode.value === 'horizontal') {
        const ul = ele.parentElement?.parentElement;
        ul?.classList.add(`${ns.b()}-active-parent`);
      }
    };
    const icons = <span class={`${ns.b()}-icon`}>{ctx.slots.icon?.()}</span>;
    const menuItems = ref(null);
    watch(disabled, () => {
      classObject[menuItemSelect] = false;
    });
    watch(
      () => defaultSelectKey,
      (n) => {
        isSelect.value = initSelect(n, key, multiple, disabled);
        classObject[menuItemSelect] = isSelect.value;
      }
    );
    onMounted(() => {
      let oldPadding = '';
      const ele = menuItems.value as unknown as HTMLElement;
      if (mode.value === 'vertical') {
        if (ele.parentElement?.parentElement?.classList.contains(ns.b())) {
          isLayer1.value = true;
          if (isLayer1.value) {
            ele.style.paddingRight = ``;
            ele.style.paddingLeft = `${indent}px`;
          }
          watch(isCollapsed, (val) => {
            if (val) {
              if (ele.style.padding !== '0') {
                oldPadding = ele.style.padding;
              }
              setTimeout(() => {
                ele.style.padding = '0';
                ele.style.width = '';
                ele.style.textAlign = `center`;
              }, 300);
              ele.style.display = `block`;
            } else {
              ele.style.padding = `${oldPadding}`;
              ele.style.textAlign = ``;
              ele.style.display = `flex`;
            }
          });
        } else {
          isLayer1.value = false;
        }
      }
    });
    return () => {
      return mode.value === 'vertical' ? (
        <div class={`${ns.b()}-item-vertical-wrapper`}>
          <li
            class={[classObject, props['disabled'] ? menuItemDisabled : '', isLayer1.value ? 'layer_1' : '']}
            onClick={onClick}
            ref={menuItems}>
            {ctx.slots.icon !== undefined && icons}
            {props.href === '' ? (
              <Transition name="fade">
                <span v-show={!isCollapsed.value}>{ctx.slots.default?.()}</span>
              </Transition>
            ) : (
              <a href={props.href}>
                <Transition name="fade">{ctx.slots.default?.()}</Transition>
              </a>
            )}
          </li>
        </div>
      ) : (
        <li
          class={[classObject, props['disabled'] ? menuItemDisabled : '', isLayer1.value ? 'layer_1' : '']}
          onClick={onClick}
          ref={menuItems}>
          {ctx.slots.icon !== undefined && icons}
          {props.href === '' ? (
            <Transition name="fade">
              <span v-show={!isCollapsed.value}>{ctx.slots.default?.()}</span>
            </Transition>
          ) : (
            <a href={props.href}>
              <Transition name="fade">{ctx.slots.default?.()}</Transition>
            </a>
          )}
        </li>
      );
    };
  },
});
