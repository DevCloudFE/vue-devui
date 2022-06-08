/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, getCurrentInstance, inject, onMounted, ref, watchEffect, watch } from 'vue';
import type { ComponentInternalInstance, Ref } from 'vue';
import { addLayer, pushElement, clearSelect, getLayer } from '../../composables/use-layer-operate';
import { useClick } from '../../composables/use-click';
import { useShowSubMenu } from './use-sub-menu';
import { SubMenuProps, subMenuProps } from './sub-menu-types';
import MenuTransition from '../menu-transition/menu-transition';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

const ns = useNamespace('menu');
const subNs = useNamespace('submenu');

interface clickEvent extends MouseEvent {
  path: HTMLElement[];
}
export default defineComponent({
  name: 'DSubMenu',
  props: subMenuProps,
  setup(props: SubMenuProps, ctx) {
    const isShow = ref(true);
    const {
      vnode: { key },
    } = getCurrentInstance() as ComponentInternalInstance;
    const key_ = String(key);
    const isOpen = ref(false);
    const defaultOpenKeys = inject('openKeys') as string[];
    const indent = inject('defaultIndent');
    const isCollapsed = inject('isCollapsed') as Ref<boolean>;
    const mode = inject('mode') as Ref<string>;
    const subMenuItemContainer = ref(null) as Ref<null>;
    const parentEmit = inject('rootMenuEmit') as (eventName: 'submenu-change', ...args: any[]) => void;
    if (key_ === 'null') {
      console.warn(`[devui][menu]: Key can not be null`);
    } else {
      if (defaultOpenKeys.includes(key_)) {
        isOpen.value = true;
      } else {
        isOpen.value = false;
      }
    }
    const clickHandle = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const ele = e.currentTarget as HTMLElement;
      if (mode.value === 'horizontal') {
        clearSelect(ele, e, true);
        useClick(e as clickEvent);
      }
      if (!props.disable && mode.value !== 'horizontal') {
        const target = e.target as HTMLElement;
        let cur = e.target as HTMLElement;
        if (target.tagName === 'UL') {
          if (target.classList.contains(`${subNs.b()}-open`)) {
            isOpen.value = !isOpen.value;
          } else {
            isOpen.value = isOpen.value;
          }
        } else {
          while (cur && cur.tagName !== 'UL') {
            if (cur.tagName === 'LI') {
              break;
            }
            cur = cur.parentElement as HTMLElement;
          }
          if (cur.tagName === 'UL') {
            isOpen.value = !isOpen.value;
          }
        }
        parentEmit('submenu-change', { type: 'submenu-change', state: isOpen.value, el: cur });
      }
    };
    const wrapper = ref(null);
    let wrapperDom: HTMLElement;
    const subMenu = ref(null);
    const title = ref(null);
    let oldPadding = '';
    const class_layer = ref('');
    watchEffect(
      () => {
        wrapperDom = wrapper.value as unknown as HTMLElement;
        pushElement({ el: subMenu.value } as any);
      },
      { flush: 'post' }
    );
    watch(
      () => defaultOpenKeys,
      (n) => {
        if (n.includes(key_)) {
          isOpen.value = true;
        } else {
          isOpen.value = false;
        }
      }
    );
    onMounted(() => {
      const el = title.value as unknown as HTMLElement;
      const e = subMenu.value as unknown as HTMLElement;
      addLayer();
      class_layer.value = `layer_${Array.from(e.classList).at(-1)?.replace('layer_', '')}`;
      if (mode.value === 'horizontal') {
        (subMenu.value as unknown as Element as HTMLElement).addEventListener('mouseenter', (ev: MouseEvent) => {
          ev.stopPropagation();
          useShowSubMenu('mouseenter', ev, wrapperDom);
        });
        (subMenu.value as unknown as Element as HTMLElement).addEventListener('mouseleave', (ev: MouseEvent) => {
          ev.stopPropagation();
          useShowSubMenu('mouseleave', ev, wrapperDom);
        });
      }
      watch(isCollapsed, (newValue) => {
        const layer = Number(getLayer(e));
        if (!Number.isNaN(layer)) {
          layer > 2 && (isShow.value = !isCollapsed.value);
        }
        if (newValue) {
          el.style.padding !== '0' && (oldPadding = el.style.padding);
          setTimeout(() => {
            el.style.padding = '0';
            el.style.width = '';
            el.style.textAlign = `center`;
          }, 300);
          el.style.display = `block`;
        } else {
          el.style.padding = `${oldPadding}`;
          el.style.textAlign = ``;
          el.style.display = `flex`;
        }
      });
    });
    return () => {
      return (
        <ul v-show={isShow.value} onClick={clickHandle} class={[subNs.b(), class_layer.value]} ref={subMenu}>
          <div class={[`${subNs.b()}-title`, props['disable'] && `${subNs.b()}-disabled`]} style={`padding: 0 ${indent}px`} ref={title}>
            <span class={`${ns.b()}-icon`}>{ctx.slots?.icon?.()}</span>
            <span v-show={!isCollapsed.value} class={`${subNs.b()}-title-content`}>
              {props.title}
            </span>
            <i
              v-show={!isCollapsed.value && mode.value !== 'horizontal'}
              class={{
                'icon icon-chevron-up': !isOpen.value,
                'icon icon-chevron-down': isOpen.value,
              }}></i>
          </div>
          {mode.value === 'horizontal' ? (
            <div class={`${ns.b()}-item-horizontal-wrapper ${ns.b()}-item-horizontal-wrapper-hidden`} ref={wrapper}>
              {ctx.slots.default?.()}
            </div>
          ) : (
            <MenuTransition>
              <div class={[`${subNs.b()}-menu-item-vertical-wrapper`]} ref={subMenuItemContainer} v-show={isOpen.value}>
                {ctx.slots.default?.()}
              </div>
            </MenuTransition>
          )}
        </ul>
      );
    };
  },
});
