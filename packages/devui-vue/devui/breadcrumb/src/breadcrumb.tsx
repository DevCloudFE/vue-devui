import { defineComponent, provide } from 'vue';
import {
  breadcrumbProps,
  BreadcrumbProps,
  SourceConfig
} from './breadcrumb-types';
import DBreadcrumbItem from './breadcrumb-item';
import { getPropsSlot } from '../../shared/util/props-util';
import './breadcrumb.scss';

export default defineComponent({
  name: 'DBreadcrumb',
  components: {
    DBreadcrumbItem
  },
  props: breadcrumbProps,
  setup(props: BreadcrumbProps, { slots }) {
    const separatorIcon = getPropsSlot(slots, props, 'separatorIcon') ?? '/';
    provide('separatorIcon', separatorIcon);

    const renderBreadcrumbItemRouted = (item) => {
      return (
        <d-breadcrumb-item to={`path: ${item.link}`} replace={item.replace}>
          {item.title}
        </d-breadcrumb-item>
      );
    };
    const renderBreadItemList = (source: SourceConfig[]) => {
      return source.map((item: SourceConfig) => {
        if (!item.noNavigation && item.linkType === 'routerLink') {
          return renderBreadcrumbItemRouted(item);
        }
        return (
          <d-breadcrumb-item>
            {/* hrefLink */}
            {!item.noNavigation &&
            (!item.linkType || item.linkType === 'hrefLink') ? (
                <a href={item.link} target={item.target ? item.target : '_self'}>
                  {item.title}
                </a>
              ) : null}
            {/* normal */}
            {item.noNavigation ? <span>{item.title}</span> : null}
          </d-breadcrumb-item>
        );
      });
    };
    return () => {
      return (
        <div class="devui-breadcrumb">
          {props.source && props.source.length
            ? renderBreadItemList(props.source)
            : slots?.default()}
        </div>
      );
    };
  }
});
