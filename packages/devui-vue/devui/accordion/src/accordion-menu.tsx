import { computed, defineComponent, toRefs, Fragment, inject, ref } from 'vue'
import {
  AccordionItemClickEvent,
  AccordionMenuItem,
  AccordionMenuToggleEvent
} from './accordion.type'
import DAccordionList from './accordion-list'
import { accordionProps } from './accordion-types'
import OpenIcon from './accordion-open-icon'

export default defineComponent({
  name: 'DAccordionMenu',
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
      openKey,
      menuItemTemplate,
      activeKey,
      autoOpenActiveMenu,
      disabledKey
    } = toRefs(props)

    const accordionCtx = inject('accordionContext') as any

    const toggle = (itemEvent: AccordionMenuToggleEvent) => {
      if (!itemEvent.open && item.value.children && item.value.children.some((i) => i.active)) {
        itemEvent.item.active = true
      } else {
        itemEvent.item.active = null
      }
      accordionCtx.menuToggleFn(itemEvent)
    }

    const keyOpen = computed(() => {
      return item.value && item.value[openKey.value]
    })
    const childActived = computed(() => {
      return item.value.active // TODO:待处理
    })

    const open = computed(() => {
      return keyOpen.value === undefined && autoOpenActiveMenu.value
        ? childActived.value
        : keyOpen.value
    })

    return () => {
      return (
        <>
          <div
            class={[
              'devui-accordion-item-title',
              'devui-over-flow-ellipsis',
              open.value && 'open',
              childActived.value && 'active',
              item.value[disabledKey.value] && 'disabled'
            ]}
            title={item.value.title}
            style={{ textIndent: deepth.value * 20 + 'px' }}
            onClick={(e) =>
              toggle({
                item: item.value,
                open: !open.value,
                parent: parent.value,
                event: e
              })
            }
          >
            <div
              class={['devui-accordion-splitter', deepth.value === 0 && 'devui-parent-list']}
              style={{ left: deepth.value * 20 + 10 + 'px' }}
            ></div>
            {!menuItemTemplate.value && <Fragment>{item.value.title}</Fragment>}
            <span class='devui-accordion-open-icon'>
              <OpenIcon />
            </span>
          </div>
          <DAccordionList
            class={[
              'devui-accordion-submenu',
              'devui-accordion-show-animate',
              !open.value && 'devui-accordion-menu-hidden'
            ]}
            // style={ open.value ? {opacity: 1, overflow: 'hidden'} : {opacity: 0, height: 0, overflow: 'hidden'}}
            deepth={deepth.value + 1}
            data={item.value.children || []}
            parent={item.value}
          ></DAccordionList>
        </>
      )
    }
  }
})
