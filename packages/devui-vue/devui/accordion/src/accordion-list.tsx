import { computed, defineComponent, inject, toRefs } from 'vue';
import type { AccordionMenuItem } from './accordion.type';
import DAccordionMenu from './accordion-menu';
import DAccordionItem from './accordion-item';
import DAccordionItemHreflink from './accordion-item-hreflink';
import DAccordionItemRouterlink from './accordion-item-routerlink';
import { accordionProps } from './accordion-types';
import { getRootSlots } from '../src/utils';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DAccordionList',
  components: {
    DAccordionMenu,
    DAccordionItem,
    DAccordionItemHreflink,
    DAccordionItemRouterlink,
  },
  inheritAttrs: false,
  props: {
    data: {
      type: Array as () => Array<AccordionMenuItem>,
      default: null,
    },
    deepth: {
      type: Number,
      default: 0,
    },
    parent: {
      type: Object as () => AccordionMenuItem,
      default: null,
    },
    innerListTemplate: Boolean,
    ...accordionProps,
  },

  setup(props, { attrs }) {
    const {
      childrenKey,
      deepth,
      parent,
      data,
      linkType,
      showNoContent,
      loadingKey,
      titleKey,
      linkTypeKey,
      loadingTemplate,
      noContentTemplate,
      innerListTemplate,
    } = toRefs(props);
    const ns = useNamespace('accordion');

    const parentValue = parent.value;
    const deepValue = deepth.value;

    const rootSlots = getRootSlots();

    const accordionCtx = inject('accordionContext') as any;

    const loading = computed(() => {
      return parentValue && parentValue[loadingKey.value];
    });

    const noContent = computed(() => {
      const dataValue = data.value;
      return dataValue === undefined || dataValue === null || dataValue.length === 0;
    });

    return () => {
      return (
        <>
          {(!rootSlots.innerListTemplate || deepth.value === 0 || innerListTemplate.value === false) && (
            <ul class={[ns.e('list')]} {...attrs}>
              {data.value.map((item) => {
                return (
                  <li class={ns.e('item')} key={item[titleKey.value]}>
                    {/* // TODO 菜单类型 d-accordion-menu */}
                    {item[childrenKey.value] !== undefined && (
                      <div class={ns.e('menu-item')}>
                        <d-accordion-menu {...(props as any)} item={item} deepth={deepValue} parent={parentValue}></d-accordion-menu>
                      </div>
                    )}
                    {/* 非菜单类型 */}
                    {item[childrenKey.value] === undefined && (
                      <>
                        {/* 普通类型 */}
                        {(!linkType.value || linkType.value === '') && (
                          <d-accordion-item {...(props as any)} item={item} deepth={deepValue} parent={parentValue}></d-accordion-item>
                        )}
                        {/* 路由链接类型 */}
                        {linkType.value === 'routerLink' && (
                          <d-accordion-item-routerlink
                            {...(props as any)}
                            item={item}
                            deepth={deepValue}
                            parent={parentValue}></d-accordion-item-routerlink>
                        )}
                        {/* 普通链接类型 */}
                        {linkType.value === 'hrefLink' && (
                          <d-accordion-item-hreflink
                            {...(props as any)}
                            item={item}
                            deepth={deepValue}
                            parent={parentValue}></d-accordion-item-hreflink>
                        )}
                        {/* 动态链接类型 */}
                        {linkType.value === 'dependOnLinkTypeKey' && (
                          <>
                            {item[linkTypeKey.value] === 'routerLink' && (
                              <d-accordion-item-routerlink
                                {...(props as any)}
                                item={item}
                                deepth={deepValue}
                                parent={parentValue}></d-accordion-item-routerlink>
                            )}
                            {item[linkTypeKey.value] === 'hrefLink' && (
                              <d-accordion-item-hreflink
                                {...(props as any)}
                                item={item}
                                deepth={deepValue}
                                parent={parentValue}></d-accordion-item-hreflink>
                            )}
                            {item[linkTypeKey.value] !== 'routerLink' && item[linkTypeKey.value] !== 'hrefLink' && (
                              <d-accordion-item {...(props as any)} item={item} deepth={deepValue} parent={parentValue}></d-accordion-item>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {rootSlots.innerListTemplate &&
            innerListTemplate.value !== false &&
            deepValue !== 0 &&
            rootSlots.innerListTemplate?.({
              item: parentValue,
              deepth: deepValue,
              itemClickFn: accordionCtx.itemClickFn,
              menuToggleFn: accordionCtx.menuToggleFn,
            })}
          {(!rootSlots.innerListTemplate || innerListTemplate.value === false) &&
            (loading.value || (noContent.value && showNoContent.value)) && (
              <ul class={[ns.e('list')]} {...attrs}>
                {
                  // 加载中
                  loading.value && (!rootSlots.loadingTemplate || loadingTemplate.value === false) && (
                    <li class={ns.e('item')}>
                      <div class={[ns.e('item-title'), ns.m('overflow-ellipsis')]} style={{ textIndent: deepValue * 20 + 'px' }}>
                        加载中...
                      </div>
                    </li>
                  )
                }
                {
                  // 自定义加载
                  loading.value &&
                    rootSlots.loadingTemplate &&
                    loadingTemplate.value !== false &&
                    rootSlots.loadingTemplate?.({
                      item: parentValue,
                      deepth: deepValue,
                    })
                }
                {
                  // 无数据
                  showNoContent.value &&
                    !loading.value &&
                    noContent.value &&
                    (!rootSlots.noContentTemplate || noContentTemplate.value === false) && (
                      <li class={ns.e('item')}>
                        <div
                          class={[ns.e('item-title'), ns.m('overflow-ellipsis'), ns.m('disabled')]}
                          style={{ textIndent: deepValue * 20 + 'px' }}>
                          没有数据
                        </div>
                      </li>
                    )
                }
                {
                  // 自定义加载
                  showNoContent.value &&
                    !loading.value &&
                    noContent.value &&
                    rootSlots.noContentTemplate &&
                    noContentTemplate.value !== false &&
                    rootSlots.noContentTemplate?.({
                      item: parentValue,
                      deepth: deepValue,
                    })
                }
              </ul>
            )}
        </>
      );
    };
  },
});
