import { computed, defineComponent, toRefs, inject } from 'vue';
import { AccordionMenuItem, AccordionMenuToggleEvent } from './accordion.type';
import AccordionList from './accordion-list';
import { accordionProps } from './accordion-types';
import OpenIcon from './accordion-open-icon';
import { getRootSlots } from '../src/utils';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DAccordionMenu',
  components: {
    OpenIcon,
  },
  props: {
    item: Object as () => AccordionMenuItem,
    deepth: {
      type: Number,
      default: 0,
    },
    parent: {
      type: Object as () => AccordionMenuItem,
      default: null,
    },
    ...accordionProps,
  },
  setup(props) {
    const { item, deepth, parent, openKey, activeKey, autoOpenActiveMenu, disabledKey, childrenKey, titleKey, menuItemTemplate } =
      toRefs(props);
    const ns = useNamespace('accordion');

    const rootSlots = getRootSlots();
    const accordionCtx = inject('accordionContext') as any;

    const parentValue = parent.value;
    const deepValue = deepth.value;

    const toggle = (itemEvent: AccordionMenuToggleEvent) => {
      accordionCtx.menuToggleFn(itemEvent);
    };

    const hasActiveChildren = (item) => {
      if (item[activeKey.value] === true) {
        return true;
      }
      if (item[childrenKey.value]) {
        return hasChildActive(item[childrenKey.value]);
      }
    };
    const hasChildActive = (arr) => {
      let flag = false;
      if (!arr.length) {
        return false;
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][activeKey.value] === true) {
          flag = true;
          break;
        }
        if (arr[i][childrenKey.value]) {
          flag = hasChildActive(arr[i][childrenKey.value]);
          if (flag) {
            break;
          }
        }
      }
      return flag;
    };

    const keyOpen = computed(() => {
      return item.value && item.value[openKey.value];
    });
    const disabled = computed(() => {
      return item.value && item.value[disabledKey.value];
    });
    const title = computed(() => {
      return item.value && item.value[titleKey.value];
    });
    const children = computed(() => {
      return item.value && item.value[childrenKey.value];
    });

    const childActived = computed(() => {
      return hasActiveChildren(item.value);
    });

    const open = computed(() => {
      return keyOpen.value === undefined && autoOpenActiveMenu.value ? childActived.value : keyOpen.value;
    });

    return () => {
      return (
        <>
          <div
            class={[
              ns.e('item-title'),
              ns.m('overflow-ellipsis'),
              open.value && ns.m('open'),
              childActived.value && ns.m('active'),
              disabled.value && ns.m('disabled'),
            ]}
            title={title.value}
            style={{ textIndent: deepValue * 20 + 'px' }}
            onClick={(e) =>
              !disabled.value &&
              toggle({
                item: item.value,
                open: !open.value,
                parent: parentValue,
                event: e,
              })
            }>
            <div class={[ns.e('splitter'), deepValue === 0 && ns.e('parent-list')]} style={{ left: deepValue * 20 + 10 + 'px' }}></div>
            {(!rootSlots.menuItemTemplate || menuItemTemplate.value === false) && <>{title.value}</>}
            {rootSlots.menuItemTemplate &&
              menuItemTemplate.value !== false &&
              rootSlots.menuItemTemplate?.({
                parent: parentValue,
                deepth: deepValue,
                item: item.value,
              })}
            <span class={ns.e('open-icon')}>
              <OpenIcon />
            </span>
          </div>
          <div class={[!open.value && ns.m('menu-hidden'), ns.e('submenu'), ns.m('show-animate')]}>
            <AccordionList {...(props as any)} deepth={deepValue + 1} data={children.value || []} parent={item.value}></AccordionList>
          </div>
        </>
      );
    };
  },
});
