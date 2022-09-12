import { randomId } from '../../../../shared/utils/random-id';
import type { ComponentInternalInstance, Ref } from 'vue';
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  ref,
  watch,
  watchEffect
} from 'vue';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useClick } from '../../composables/use-click';
import { addLayer, clearSelect, getLayer, pushElement } from '../../composables/use-layer-operate';
import { useNearestMenuElement } from '../../composables/use-nearest-menu-element';
import MenuTransition from '../menu-transition/menu-transition';
import { SubMenuProps, subMenuProps } from './sub-menu-types';
import { useShowSubMenu } from './use-sub-menu';

const ns = useNamespace('menu');
const subNs = useNamespace('submenu');

const subMenuClass = subNs.b();

interface clickEvent extends MouseEvent {
  path: HTMLElement[];
}
export default defineComponent({
  name: 'DSubMenu',
  props: subMenuProps,
  setup(props: SubMenuProps, ctx) {
    const isShow = ref(true);
    const {
      vnode: { key }
    } = getCurrentInstance() as ComponentInternalInstance;
    let key_ = String(key);
    const defaultOpenKeys = inject('openKeys') as Ref<string[]>;
    const isOpen = ref(defaultOpenKeys.value.includes(key_));
    const indent = inject('defaultIndent');
    const isCollapsed = inject('isCollapsed') as Ref<boolean>;
    const mode = inject('mode') as Ref<string>;
    const subMenuItemContainer = ref(null) as Ref<null>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parentEmit = inject('rootMenuEmit') as (eventName: 'submenu-change', ...args: any[]) => void;
    const isHorizontal = mode.value === 'horizontal';
    if (key_ === 'null') {
      console.warn(`[devui][menu]: Key can not be null`);
      key_ = `randomKey-${randomId(16)}`;
    }
    const clickHandle = (e: MouseEvent) => {
      e.stopPropagation();
      const ele = useNearestMenuElement(e.target as HTMLElement);
      if (ele.classList.contains(subMenuClass) && isHorizontal) {
        return;
      }
      if (isHorizontal) {
        clearSelect(ele, e, true);
        useClick(e as clickEvent);
      }
      if (!props.disabled && mode.value !== 'horizontal') {
        const cur = useNearestMenuElement(e.target as HTMLElement);
        const idx = defaultOpenKeys.value.indexOf(key_);
        if (idx >= 0 && cur.tagName === 'UL') {
          defaultOpenKeys.value.splice(idx, 1);
        } else {
          if (cur.tagName === 'UL'){
            defaultOpenKeys.value.push(key_);
          }
        }
        isOpen.value = defaultOpenKeys.value.indexOf(key_) >= 0;
        parentEmit('submenu-change', {
          type: 'submenu-change',
          state: isOpen.value,
          key: key_,
          el: ele
        });
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pushElement({ el: subMenu.value } as any);
      },
      { flush: 'post' }
    );
    watch(
      () => defaultOpenKeys,
      (n) => {
        if (n.value.includes(key_)){
          isOpen.value = true;
        } else {
          isOpen.value = false;
        }
      },{deep: true}
    );
    onMounted(() => {
      const subMenuTitle = title.value as unknown as HTMLElement;
      const subMenuWrapper = subMenu.value as unknown as HTMLElement;
      addLayer();
      class_layer.value = `layer_${Array.from(subMenuWrapper.classList).at(-1)?.replace('layer_', '')}`;
      if (isHorizontal && !props.disabled) {
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
        const layer = Number(getLayer(subMenuWrapper));
        if (!Number.isNaN(layer)) {
          layer > 2 && (isShow.value = !isCollapsed.value);
        }
        if (newValue) {
          subMenuTitle.style.padding !== '0' && (oldPadding = subMenuTitle.style.padding);
          setTimeout(() => {
            subMenuTitle.style.padding = '0';
            subMenuTitle.style.width = '';
            subMenuTitle.style.textAlign = `center`;
          }, 300);
          subMenuTitle.style.display = `block`;
        } else {
          subMenuTitle.style.padding = `${oldPadding}`;
          subMenuTitle.style.textAlign = ``;
          subMenuTitle.style.display = `flex`;
        }
      });
    });
    return () => {
      return (
        <ul
          v-show={isShow.value}
          onClick={clickHandle}
          class={[subMenuClass, class_layer.value, props['disabled'] && `${subMenuClass}-disabled`]}
          ref={subMenu}>
          <div
            class={[`${subMenuClass}-title`]}
            style={`padding: 0 ${indent}px`}
            ref={title}>
            <span class={`${ns.b()}-icon`}>{ctx.slots?.icon?.()}</span>
            <span v-show={!isCollapsed.value} class={`${subMenuClass}-title-content`}>
              {props.title}
            </span>
            <i
              v-show={!isCollapsed.value && key !== 'overflowContainer'}
              class={{
                'icon icon-chevron-up': class_layer.value !== `layer_${subMenuClass}`,
                'icon icon-chevron-right': class_layer.value === `layer_${subMenuClass}`,
                'is-opened': isOpen.value,
              }}></i>
          </div>
          {isHorizontal ? (
            <div
              class={`${ns.b()}-item-horizontal-wrapper ${ns.b()}-item-horizontal-wrapper-hidden`}
              ref={wrapper}
              v-show={!props.disabled}
            >
              {ctx.slots.default?.()}
            </div>
          ) : (
            <MenuTransition>
              <div class={[`${subMenuClass}-menu-item-vertical-wrapper`]} ref={subMenuItemContainer} v-show={isOpen.value}>
                {ctx.slots.default?.()}
              </div>
            </MenuTransition>
          )}
        </ul>
      );
    };
  },
});
