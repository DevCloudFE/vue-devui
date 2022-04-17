import { defineComponent, toRefs, computed, inject } from 'vue';
import { accordionProps } from './accordion-types';
import { AccordionItemClickEvent, AccordionMenuItem } from './accordion.type';
import { getRootSlots } from '../src/utils';

export default defineComponent({
  name: 'DAccordionItem',
  props: {
    item: Object as () => AccordionMenuItem,
    deepth: {
      type: Number,
      default: 0
    },
    parent: {
      type: Object as () => AccordionMenuItem,
      default: null
    },
    ...accordionProps
  },
  setup(props) {
    const {
      item,
      deepth,
      parent,
      titleKey,
      activeKey,
      disabledKey,
      itemTemplate
    } = toRefs(props);

    const rootSlots = getRootSlots();
    const accordionCtx = inject('accordionContext') as any;

    const parentValue = parent.value;
    const deepValue = deepth.value;

    const disabled = computed(() => {
      return item.value && item.value[disabledKey.value];
    });
    const title = computed(() => {
      return item.value && item.value[titleKey.value];
    });
    const active = computed(() => {
      return item.value && item.value[activeKey.value];
    });

    const childActived = computed(() => {
      return active.value;
    });

    const itemClick = (itemEvent: AccordionItemClickEvent) => {
      if (item.value && !disabled.value) {
        accordionCtx.itemClickFn(itemEvent);
      }
    };

    return () => {
      return (
        <>
          <div
            class={[
              'devui-accordion-item-title',
              'devui-over-flow-ellipsis',
              childActived.value && 'active',
              disabled.value && 'disabled'
            ]}
            title={title.value}
            style={{ textIndent: deepValue * 20 + 'px' }}
            onClick={(e) =>
              itemClick({
                item: item.value,
                parent: parentValue,
                event: e
              })
            }
          >
            <div
              class={['devui-accordion-splitter', deepValue === 0 && 'devui-parent-list']}
              style={{ left: deepValue * 20 + 10 + 'px' }}
            ></div>
            {(!rootSlots.itemTemplate || itemTemplate.value === false) && <>{title.value}</>}
            {rootSlots.itemTemplate && itemTemplate.value !== false &&
              rootSlots.itemTemplate?.({
                parent: parentValue,
                deepth: deepValue,
                item: item.value
              })}
          </div>
        </>
      );
    };
  }
});
