import { defineComponent, inject } from 'vue'

import {
  breadcrumbItemProps,
  BreadcrumbItemProps
} from './breadcrumb-item-types'
import './breadcrumb-item.scss'

export default defineComponent({
  name: 'DBreadcrumbItem',
  props: breadcrumbItemProps,
  setup(props: BreadcrumbItemProps, { slots }) {
    const separatorIcon = inject('separatorIcon')
    return () => {
      const renderBreadcrumbSperator = () => {
        return <span class="devui-breadcrumb-separator">{separatorIcon}</span>
      }
      return (
        <div class="devui-breadcrumb-item">
          {slots?.default()}
          {renderBreadcrumbSperator()}
        </div>
      )
    }
  }
})
