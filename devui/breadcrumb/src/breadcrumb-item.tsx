import { defineComponent } from 'vue'
import './breadcrumb-item.scss'

import {
  breadcrumbItemProps,
  BreadcrumbItemProps,
} from './breadcrumb-item-types'

export default defineComponent({
  name: 'DBreadcrumbItem',
  props: breadcrumbItemProps,
  setup(props: BreadcrumbItemProps, { slots }) {
    return () => {
      const renderBreadcrumbSperator = () => {
        return <span class="devui-breadcrumb-separator">/</span>
      }
      return (
        <div class="devui-breadcrumb-item">
          {slots?.default()}
          {renderBreadcrumbSperator()}
        </div>
      )
    }
  },
})
