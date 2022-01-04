import { defineComponent, toRefs, computed, inject } from 'vue'
import {useRoute} from 'vue-router'
import { accordionProps } from './accordion-types'
import { AccordionItemClickEvent, AccordionMenuItem, AccordionLinkableItem } from './accordion.type'
import DAccordionItem from './accordion-item'
import { getRootSlots } from './utils'

export default defineComponent({
  name: 'DAccordionItemRouterlink',
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
      disabledKey,
      itemTemplate
    } = toRefs(props)

    const route = useRoute()
    const rootSlots = getRootSlots()
    const accordionCtx = inject('accordionContext') as any
    console.log(useRoute())

    const title = computed(() => {
      return item.value && item.value[titleKey.value]
    })

    const link = computed(() => {
      return item.value && item.value[linkKey.value]
    })

    const routerLinkActive = computed(() => {
      return route === link.value
    })

    const disabled = computed(() => {
      return item.value && item.value[disabledKey.value]
    })

    const parentValue = parent.value
    const deepValue = deepth.value

    const linkItemClickFn = (itemEvent: AccordionItemClickEvent) => {
      if (item.value && !disabled.value) {
        accordionCtx.itemClickFn(itemEvent)
      }
    }

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
      )
    }

    return () => {
      return (
        <>
          {!disabled.value && (
            <router-link
              to={link.value}
              class={[
                'devui-accordion-item-title',
                'devui-over-flow-ellipsis',
              ]}
              active-class='.devui-router-active'
              style={{ textIndent: deepValue * 20 + 'px' }}
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
            </router-link>
          )}
          {disabled.value && (
            <active
              class={[
                'devui-accordion-item-title',
                'devui-over-flow-ellipsis',
                disabled.value && 'disabled'
              ]}
              style={{ textIndent: deepValue * 20 + 'px' }}
              title={title.value}
            >
              {renderContent()}
            </active>
          )}
        </>
      )
    }
  }
})
