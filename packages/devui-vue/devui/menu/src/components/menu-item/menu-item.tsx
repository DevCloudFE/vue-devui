import { clearSelect } from '../../composables/use-layer-operate';
import { defineComponent, getCurrentInstance, onMounted, ref, Transition, watch, inject, Ref, toRefs, computed } from 'vue';
import { MenuItemProps, menuItemProps } from './menu-item-types';
import { initSelect, addActiveParent, changeRoute } from './use-menu-item';
import { useClick } from '../../composables/use-click';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { Router } from 'vue-router';
import { Store } from '../../composables/use-store';

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
    const menuStore = inject('menuStore') as Store;
    const mode = inject('mode') as Ref<'vertical' | 'horizontal'>;
    const multiple = inject('multiple') as boolean;
    const indent = inject('defaultIndent');
    const isCollapsed = inject('isCollapsed') as Ref<boolean>;
    const defaultSelectKey = inject('defaultSelectKey') as string[];
    const { disabled } = toRefs(props);
    const isSelect = ref(initSelect(defaultSelectKey, key, multiple, disabled));
    const isLayer1 = ref(true);
    const rootMenuEmit = inject('rootMenuEmit') as (eventName: string, ...args: unknown[]) => void;
    const useRouter = inject('useRouter') as boolean;
    const router = instance?.appContext.config.globalProperties.$router as Router;
    const classObject = computed(()=>({
      [`${ns.b()}-item`]: true,
      [`${ns.b()}-item-isCollapsed`]: isCollapsed.value,
      [menuItemSelect]: isSelect.value,
      [menuItemDisabled]: disabled.value,
    }));
    menuStore.on('menuItem:clear:select', ()=>{
      isSelect.value = false;
    });
    const onClick = (e: MouseEvent) => {
      e.stopPropagation();
      const ele = e.currentTarget as HTMLElement;
      let changeRouteResult = undefined;
      props.disabled && e.preventDefault();
      if (!props.disabled) {
        if (!multiple) {
          menuStore.emit('menuItem:clear:select');
          clearSelect(ele, e, mode.value === 'horizontal');
          if (mode.value === 'horizontal') {
            useClick(e as clickEvent);
          }
          isSelect.value = true;
          changeRouteResult = changeRoute(props, router, useRouter, key);
        } else {
          if (ele.classList.contains(menuItemSelect)) {
            rootMenuEmit('deselect', { type: 'deselect', key, el: ele, e });
            isSelect.value = false;
            return;
          } else {
            isSelect.value = true;
            ele.classList.add(menuItemSelect);
          }
        }
        if (changeRouteResult === undefined) {
          rootMenuEmit('select', { type: 'select', key, el: ele, e });
        } else {
          rootMenuEmit('select', { type: 'select', key, el: ele, e, route: changeRouteResult });
        }
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
      if (!multiple){
        classObject.value[menuItemSelect] = false;
      }
    });
    watch(
      () => defaultSelectKey,
      (n) => {
        isSelect.value = initSelect(n, key, multiple, disabled);
        classObject.value[menuItemSelect] = isSelect.value;
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
            class={classObject.value}
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
          class={classObject.value}
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
