import { defineComponent, toRefs, Fragment, computed, inject } from 'vue'
import { accordionProps } from './accordion-types'
import { AccordionItemClickEvent, AccordionMenuItem } from './accordion.type'
import { getRootSlots } from '../src/utils'

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
  setup(props, { slots }) {
    const {
      item,
      deepth,
      parent,
      openKey,
      menuItemTemplate,
      activeKey,
      autoOpenActiveMenu,
      disabledKey,
      itemTemplate
    } = toRefs(props)

    const rootSlots = getRootSlots()
    const accordionCtx = inject('accordionContext') as any

    let parentValue = parent.value
    let deepValue = deepth.value

    const itemClick = (itemEvent: AccordionItemClickEvent) => {
      if (item.value && !item.value.disabled) {
        accordionCtx.itemClickFn(itemEvent)
      }
    }

    const childActived = computed(() => {
      return item.value.active
    })

    return () => {
      return (
        <>
          <div
            class={[
              'devui-accordion-item-title',
              'devui-over-flow-ellipsis',
              childActived.value && 'active',
              item.value[disabledKey.value] && 'disabled'
            ]}
            title={item.value.title}
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
              style={{ textIndent: deepValue * 20 + 10 + 'px' }}
            ></div>
            {!rootSlots.itemTemplate && <>{item.value.title}</>}
            {rootSlots.itemTemplate &&
              rootSlots.itemTemplate?.({
                parent: parentValue,
                deepth: deepValue,
                item: item.value
              })}
          </div>
        </>
      )
    }
  }
})
