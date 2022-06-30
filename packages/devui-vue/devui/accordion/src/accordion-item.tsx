import { defineComponent, toRefs, computed, inject } from 'vue';
import type { HTMLAttributes } from 'vue';
import { accordionProps } from './accordion-types';
import type { AccordionItemClickEvent, AccordionMenuItem, IAccordionContext } from './accordion.type';
import { getRootSlots } from '../src/utils';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DAccordionItem',
  props: {
    item: {
      type: Object as () => AccordionMenuItem,
      required: true,
    },
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
    const { item, deepth, parent, titleKey, activeKey, disabledKey, itemTemplate } = toRefs(props);
    const ns = useNamespace('accordion');

    const rootSlots = getRootSlots();
    const accordionCtx = inject<IAccordionContext>('accordionContext');

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
        accordionCtx?.itemClickFn(itemEvent);
      }
    };

    return () => {
      return (
        <>
          <div
            class={[
              ns.e('item-title'),
              ns.m('overflow-ellipsis'),
              childActived.value && ns.m('active'),
              disabled.value && ns.m('disabled'),
            ]}
            title={title.value as HTMLAttributes['title']}
            style={{ textIndent: deepValue * 20 + 'px' }}
            onClick={(e) =>
              itemClick({
                item: item.value,
                parent: parentValue,
                event: e,
              })
            }>
            <div class={[ns.e('splitter'), deepValue === 0 && ns.e('parent-list')]} style={{ left: deepValue * 20 + 10 + 'px' }}></div>
            {(!rootSlots?.itemTemplate || itemTemplate.value === false) && <>{title.value}</>}
            {rootSlots?.itemTemplate &&
              itemTemplate.value !== false &&
              rootSlots.itemTemplate?.({
                parent: parentValue,
                deepth: deepValue,
                item: item.value,
              })}
          </div>
        </>
      );
    };
  },
});
