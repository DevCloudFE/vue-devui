import { defineComponent, toRefs, Fragment, computed, inject } from 'vue'
import { accordionProps } from './accordion-types'
import { AccordionItemClickEvent, AccordionMenuItem } from './accordion.type'

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

    const accordionCtx = inject('accordionContext') as any

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
            style={{ textIndent: deepth.value * 20 + 'px' }}
            onClick={(e) =>
              itemClick({
                item: item.value,
                parent: parent.value,
                event: e
              })
            }
          >
            <div
              class={['devui-accordion-splitter', deepth.value === 0 && 'devui-parent-list']}
              style={{ left: deepth.value * 20 + 10 + 'px' }}
            ></div>
            {!itemTemplate.value && <Fragment>{item.value.title}</Fragment>}
            {itemTemplate.value && <Fragment>{slots.itemTemplate()}</Fragment>}
          </div>
        </>
        // <ng-template
        //   *ngIf="itemTemplate"
        //   [ngTemplateOutlet]="itemTemplate"
        //   [ngTemplateOutletContext]="{
        //     parent: parent,
        //     item: item,
        //     deepth: deepth
        //   }"
        // ></ng-template>
      )
    }
  }
})
