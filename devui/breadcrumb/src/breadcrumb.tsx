import { defineComponent } from 'vue'
import {
  breadcrumbProps,
  BreadcrumbProps,
  SourceConfig,
} from './breadcrumb-types'
import DBreadcrumbItem from './breadcrumb-item'
import './breadcrumb.scss'

export default defineComponent({
  name: 'DBreadcrumb',
  components: {
    DBreadcrumbItem,
  },
  props: breadcrumbProps,
  setup(props: BreadcrumbProps, { slots }) {
    const renderBreadItemList = (source: SourceConfig[]) => {
      return source.map((item: SourceConfig) => {
        return (
          <d-breadcrumb-item>
            {!item.noNavigation ? (
              <a href={item.link} target={item.target ? item.target : '_self'}>
                {item.title}
              </a>
            ) : null}
            {item.noNavigation ? <span>{item.title}</span> : null}
          </d-breadcrumb-item>
        )
      })
    }
    return () => {
      return (
        <div class="devui-breadcrumb">
          {props.source && props.source.length
            ? renderBreadItemList(props.source)
            : slots?.default()}
        </div>
      )
    }
  },
})
