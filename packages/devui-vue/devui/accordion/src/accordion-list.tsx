import { computed, defineComponent, inject, toRefs, Fragment } from 'vue'
import type { AccordionMenuItem } from './accordion.type'
import DAccordionMenu from './accordion-menu'
import DAccordionItem from './accordion-item'
import { accordionProps } from './accordion-types'

export default defineComponent({
  name: 'DAccordionList',
  inheritAttrs: false,
  components: {
    DAccordionMenu,
    DAccordionItem
  },
  props: {
    data: {
      type: Array as () => Array<AccordionMenuItem>,
      default: null
    },
    deepth: {
      type: Number,
      default: 0
    },
    parent: {
      type: Object as () => AccordionMenuItem,
      default: null
    },
    innerListTemplate: Boolean,
    ...accordionProps
  },
  setup(props, { attrs, slots }) {
    const { childrenKey, innerListTemplate, deepth, parent, data, linkType } = toRefs(props)

    const accordionCtx = inject('accordionContext') as any

    return () => {
      return (
        <>
          {!innerListTemplate.value && (
            <ul class={['devui-accordion-list']} {...attrs}>
              {data.value.map((item) => {
                return (
                  <li class='devui-accordion-item' key={item.title}>
                    {/* // TODO 菜单类型 d-accordion-menu */}
                    {item[childrenKey.value] !== undefined && (
                      <div class="devui-accordion-menu-item">
                        <d-accordion-menu
                          item={item}
                          deepth={deepth.value}
                          parent={parent.value}
                        ></d-accordion-menu>
                      </div>
                    )}
                    {/* 非菜单类型 */}
                    {item[childrenKey.value] === undefined && (
                      <Fragment>
                        {/* 普通类型 */}
                        {(!linkType.value || linkType.value === '') && (
                          <div class="">
                            <d-accordion-item
                              item={item}
                              deepth={deepth.value}
                              parent={parent.value}
                            ></d-accordion-item>
                          </div>
                        )}
                      </Fragment>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          {innerListTemplate.value && deepth.value !== 0 && (
            <div>
              {slots.innerListTemplate
                ? slots.innerListTemplate({
                    item: parent.value,
                    deepth: deepth.value,
                    itemClickFn: accordionCtx.itemClickFn,
                    menuToggleFn: accordionCtx.menuToggleFn
                  })
                : ''}
            </div>
          )}
        </>
      )
    }
  }
})
