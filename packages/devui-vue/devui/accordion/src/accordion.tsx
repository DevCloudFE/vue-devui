import { defineComponent, toRefs } from 'vue'
import AccordionList from './accordion-list'
import { accordionProps } from './accordion-types'
import './accordion.scss'

export default defineComponent({
  name: 'DAccordion',
  props: accordionProps,
  setup(props) {
    const { data, accordionType } = toRefs(props)
    console.log(111, toRefs(props))
    return () => {
      return <div class={`devui-accordion-menu devui-scrollbar ${accordionType.value === 'normal'?'devui-accordion-menu-normal':''}`}>
        <AccordionList
          data={data}
          deepth={0}
          parent={null}
          {...props as any}
        >
        </AccordionList>
      </div>
    }
  }
})