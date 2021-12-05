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
    const {
      childrenKey,
      innerListTemplate,
      deepth,
      parent,
      data,
      linkType,
      showNoContent,
      loadingKey,
      noContentTemplate
    } = toRefs(props)

    let parentValue = parent.value
    let deepValue = deepth.value

    const accordionCtx = inject('accordionContext') as any

    const loading = computed(() => {
      return parentValue && parentValue[loadingKey.value]
    })
    const noContent = computed(() => {
      let dataValue = data.value
      return dataValue === undefined || dataValue === null || dataValue.length === 0
    })

    return () => {
      return (
        <>
          {(!innerListTemplate.value || deepth.value === 0) && (
            <ul class={['devui-accordion-list']} {...attrs}>
              {data.value.map((item) => {
                return (
                  <li class='devui-accordion-item' key={item.title}>
                    {/* // TODO 菜单类型 d-accordion-menu */}
                    {item[childrenKey.value] !== undefined && (
                      <div class='devui-accordion-menu-item'>
                        <d-accordion-menu
                          item={item}
                          deepth={deepValue}
                          parent={parentValue}
                        ></d-accordion-menu>
                      </div>
                    )}
                    {/* 非菜单类型 */}
                    {item[childrenKey.value] === undefined && (
                      <>
                        {/* 普通类型 */}
                        {(!linkType.value || linkType.value === '') && (
                            <d-accordion-item
                              item={item}
                              deepth={deepValue}
                              parent={parentValue}
                            ></d-accordion-item>
                        )}
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          {innerListTemplate.value && deepValue !== 0 && (
            <div>
              {slots.innerListTemplate
                ? slots.innerListTemplate({
                    item: parentValue,
                    deepth: deepValue,
                    itemClickFn: accordionCtx.itemClickFn,
                    menuToggleFn: accordionCtx.menuToggleFn
                  })
                : ''}
            </div>
          )}
          {!innerListTemplate.value && (loading.value || (noContent.value && showNoContent.value)) && (
            <ul class={['devui-accordion-list']} {...attrs}>
              {
                // <!--无数据-->
                showNoContent.value &&
                  !loading.value &&
                  noContent.value &&
                  !noContentTemplate.value && (
                    <li class='devui-accordion-item'>
                      <div
                        class='devui-accordion-item-title devui-over-flow-ellipsis disabled'
                        style={{ textIndent: deepValue * 20 + 'px' }}
                      >
                        没有数据
                      </div>
                    </li>
                  )
              }
            </ul>
          )}
        </>
      )
    }
  }
})
