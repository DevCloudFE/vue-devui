import { defineComponent } from 'vue'
import { getRootClass } from './use-class'
import './index.scss'
import { cascaderulProps, CascaderulProps } from './cascader-list-types'
import { DCascaderItem } from '../cascader-item'
export default defineComponent({
  name: 'DCascaderList',
  props: cascaderulProps,
  setup(props: CascaderulProps) {
    const rootClasses = getRootClass()
    return () => (
      <ul class={rootClasses.value}>
        {props.cascaderlis.map((item, index) => {
          return <DCascaderItem cascaderli={item} liIndex={index} {...props}></DCascaderItem>
        })}
      </ul>
    )
  }
})
