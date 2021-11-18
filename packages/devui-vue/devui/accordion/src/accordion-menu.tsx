import { computed, defineComponent, toRefs } from 'vue'
import { AccordionMenuItem } from './accordion.type'
import DAccordionList from './accordion-list'
import { accordionProps } from './accordion-types'

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
    const { item, deepth } = toRefs(props)


    const menuItemClasses = computed(() => {
      return (keyOpen === undefined && props.autoOpenActiveMenu)
      ? childActived
      : keyOpen
    })
    
    const keyOpen = computed(() => {
      return item?.value[props.openKey];
    })
    const childActived = computed(() => {
      // return props.routerLinkActived || props.hasActiveChildren
    })

    return () => {
      return (
        <>
          <div
            class={["devui-accordion-item-title", "devui-over-flow-ellipsis", item.value.children ? 'open active': '']}
            title={item.value.title}
          >
            {item.value.title}
          </div>
          <DAccordionList
            class="devui-accordion-submenu devui-accordion-show-animate"
            style="opacity: 1; overflow: hidden;"
            deepth={deepth.value + 1}
            data={item.value.children || []}
            parent={item.value}
          >
          </DAccordionList>
        </>
      )
    }
  }
})