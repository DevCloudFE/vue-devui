import './breadcrumb.scss'

import { defineComponent } from 'vue'
import { breadcrumbProps, BreadcrumbProps } from './breadcrumb-types'

export default defineComponent({
  name: 'DBreadcrumb',
  props: breadcrumbProps,
  setup(props: BreadcrumbProps, { slots }) {
    return () => {
      return <div class="devui-breadcrumb">{slots?.default()}</div>
    }
  },
})
