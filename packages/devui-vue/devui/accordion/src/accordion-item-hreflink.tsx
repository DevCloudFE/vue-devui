import { defineComponent, toRefs, computed, inject } from 'vue';
import { accordionProps } from './accordion-types';
import { AccordionItemClickEvent, AccordionMenuItem, AccordionLinkableItem } from './accordion.type';
import DAccordionItem from './accordion-item';
import { getRootSlots } from './utils';

export default defineComponent({
  name: 'DAccordionItemHreflink',
  component: {
    DAccordionItem
  },
  props: {
    item: Object as () => AccordionLinkableItem,
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
      linkKey,
      linkTargetKey,
      linkDefaultTarget,
      // activeKey,
      disabledKey,
      itemTemplate
    } = toRefs(props);

    const rootSlots = getRootSlots();
    const accordionCtx = inject('accordionContext') as any;

    const title = computed(() => {
      return item.value && item.value[titleKey.value];
    });

    const link = computed(() => {
      return item.value && item.value[linkKey.value];
    });

    // const active = computed(() => {
    //   return item.value && item.value[activeKey.value]
    // })

    // const childActived = computed(() => {
    //   return active.value
    // })

    const target = computed(() => {
      return item.value && (item.value[linkTargetKey.value] || linkDefaultTarget.value);
    });

    const disabled = computed(() => {
      return item.value && item.value[disabledKey.value];
    });

    const parentValue = parent.value;
    const deepValue = deepth.value;

    const linkItemClickFn = (itemEvent: AccordionItemClickEvent) => {
      if (item.value && !disabled.value) {
        accordionCtx.itemClickFn(itemEvent);
      }
    };

    const renderContent = () => {
      return (
        <>
          <div
            class={['devui-accordion-splitter', deepValue === 0 && 'devui-parent-list']}
            style={{ left: deepValue * 20 + 10 + 'px' }}
          ></div>
          {(!rootSlots.itemTemplate || itemTemplate.value === false) && <>{title.value}</>}
          {rootSlots.itemTemplate &&
            itemTemplate.value !== false &&
            rootSlots.itemTemplate?.({
              parent: parentValue,
              deepth: deepValue,
              item: item.value
            })}
        </>
      );
    };

    return () => {
      return (
        <>
          <div
            class={['devui-accordion-item-title', disabled.value && 'disabled']}
            style={{ textIndent: deepValue * 20 + 'px' }}
          >
            {!disabled.value && (
              <a
                href={link.value}
                target={target.value}
                class='devui-over-flow-ellipsis'
                title={title.value}
                onClick={(e) =>
                  linkItemClickFn({
                    item: item.value,
                    parent: parentValue,
                    event: e
                  })
                }
              >
                {renderContent()}
              </a>
            )}
            {disabled.value && (
              <a class='devui-over-flow-ellipsis' title={title.value}>
                {renderContent()}
              </a>
            )}
          </div>
        </>
      );
    };
  }
});
