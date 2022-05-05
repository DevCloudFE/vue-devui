import { defineComponent, toRefs, computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import { accordionProps } from './accordion-types';
import { AccordionItemClickEvent, AccordionMenuItem, AccordionLinkableItem } from './accordion.type';
import DAccordionItem from './accordion-item';
import { getRootSlots } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DAccordionItemRouterlink',
  component: {
    DAccordionItem,
  },
  props: {
    item: Object as () => AccordionLinkableItem,
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
    const { item, deepth, parent, titleKey, linkKey, linkDefaultTarget, disabledKey, itemTemplate } = toRefs(props);
    const ns = useNamespace('accordion');

    const route = useRoute();
    const rootSlots = getRootSlots();
    const accordionCtx = inject('accordionContext') as any;

    const title = computed(() => {
      return item.value && item.value[titleKey.value];
    });

    const link = computed(() => {
      return item.value && item.value[linkKey.value];
    });

    const isUsedVueRouter = computed(() => route !== undefined);

    const routerLinkActive = computed(() => {
      return route === link.value;
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
          <div class={[ns.e('splitter'), deepValue === 0 && ns.e('parent-list')]} style={{ left: deepValue * 20 + 10 + 'px' }}></div>
          {(!rootSlots.itemTemplate || itemTemplate.value === false) && <>{title.value}</>}
          {rootSlots.itemTemplate &&
            itemTemplate.value !== false &&
            rootSlots.itemTemplate?.({
              parent: parentValue,
              deepth: deepValue,
              item: item.value,
            })}
        </>
      );
    };

    return () => {
      return (
        <>
          <div class={[ns.e('item-title'), disabled.value && ns.m('disabled')]} style={{ textIndent: deepValue * 20 + 'px' }}>
            {!disabled.value && (
              <>
                {isUsedVueRouter.value && (
                  // TODO: vue-router解决方案
                  <router-link
                    to={link.value}
                    class={[ns.m('overflow-ellipsis'), routerLinkActive.value && ns.m('router-active')]}
                    custom
                    title={title.value}
                    onClick={(e) =>
                      linkItemClickFn({
                        item: item.value,
                        parent: parentValue,
                        event: e,
                      })
                    }>
                    {renderContent()}
                  </router-link>
                )}
                {!isUsedVueRouter.value && (
                  <a
                    href={link.value}
                    target={linkDefaultTarget.value}
                    class={ns.m('overflow-ellipsis')}
                    title={title.value}
                    onClick={(e) =>
                      linkItemClickFn({
                        item: item.value,
                        parent: parentValue,
                        event: e,
                      })
                    }>
                    {renderContent()}
                  </a>
                )}
              </>
            )}
            {disabled.value && (
              <a class={ns.m('overflow-ellipsis')} title={title.value}>
                {renderContent()}
              </a>
            )}
          </div>
        </>
      );
    };
  },
});
