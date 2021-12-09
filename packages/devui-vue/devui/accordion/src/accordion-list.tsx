import {
  computed,
  defineComponent,
  inject,
  toRefs,
  Fragment,
  ComponentInternalInstance,
  getCurrentInstance
} from 'vue'
import type { AccordionMenuItem } from './accordion.type'
import DAccordionMenu from './accordion-menu'
import DAccordionItem from './accordion-item'
import { accordionProps } from './accordion-types'
import { getRootSlots } from '../src/utils'

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

  setup(props, { attrs }) {
    const {
      childrenKey,
      deepth,
      parent,
      data,
      linkType,
      showNoContent,
      loadingKey,
      titleKey
    } = toRefs(props)

    let parentValue = parent.value
    let deepValue = deepth.value

    const rootSlots = getRootSlots()

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
          {(!rootSlots.innerListTemplate || deepth.value === 0) && (
            <ul class={['devui-accordion-list']} {...attrs}>
              {data.value.map((item) => {
                return (
                  <li class='devui-accordion-item' key={item[titleKey.value]}>
                    {/* // TODO 菜单类型 d-accordion-menu */}
                    {item[childrenKey.value] !== undefined && (
                      <div class='devui-accordion-menu-item'>
                        <d-accordion-menu
                          {...(props as any)}
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
                          {...(props as any)}
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
          {rootSlots.innerListTemplate &&
            deepValue !== 0 &&
            rootSlots.innerListTemplate?.({
              item: parentValue,
              deepth: deepValue,
              itemClickFn: accordionCtx.itemClickFn,
              menuToggleFn: accordionCtx.menuToggleFn
            })}
          {!rootSlots.innerListTemplate &&
            (loading.value || (noContent.value && showNoContent.value)) && (
              <ul class={['devui-accordion-list']} {...attrs}>
                {
                  // 加载中
                  loading.value && !rootSlots.loadingTemplate && (
                    <li class='devui-accordion-item'>
                      <div
                        class={['devui-accordion-item-title', 'devui-over-flow-ellipsis']}
                        style={{ textIndent: deepValue * 20 + 'px' }}
                      >
                        加载中...
                      </div>
                    </li>
                  )
                }
                {
                  // 自定义加载
                  loading.value &&
                    rootSlots.loadingTemplate &&
                    rootSlots.loadingTemplate?.({
                      item: parentValue,
                      deepth: deepValue
                    })
                }
                {
                  // 无数据
                  showNoContent.value &&
                    !loading.value &&
                    noContent.value &&
                    !rootSlots.noContentTemplate && (
                      <li class='devui-accordion-item'>
                        <div
                          class={[
                            'devui-accordion-item-title',
                            'devui-over-flow-ellipsis disabled'
                          ]}
                          style={{ textIndent: deepValue * 20 + 'px' }}
                        >
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
                    rootSlots.noContentTemplate?.({
                      item: parentValue,
                      deepth: deepValue
                    })
                }
              </ul>
            )}
        </>
      )
    }
  }
})
