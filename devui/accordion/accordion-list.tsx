import { defineComponent } from 'vue'
import { AccordionMenuItem } from './accordion.type'

export default defineComponent({
  name: 'd-accordion-list',
  inheritAttrs: false,
  props: {
    data: Array as () => Array<AccordionMenuItem>,
    deepth: {
      type: Number,
      default: 0
    },
    parent: Object as () => AccordionMenuItem,
    innerListTemplate: Boolean,
  },
  setup(props, ctx) {
    const { data, deepth, innerListTemplate } = props;

    return () => {
      return (!innerListTemplate || deepth === 0) && <ul class="devui-accordion-list" {...ctx.attrs}>
        { data.map(item => {
          return <li class="devui-accordion-item" key={item.title}>
            {
              // TODO 菜单类型 d-accordion-menu
            }
            <div class="devui-accordion-menu-item open" title={item.title}>
              <div title={item.title} class={`devui-accordion-item-title devui-over-flow-ellipsis open`}>{ item.title }</div>
              {
                // TODO 子菜单 d-accordion-list
              }
              <div class="devui-accordion-submenu devui-accordion-show-animate" style="opacity: 1; overflow: hidden;">
                <ul class="devui-accordion-list">
                  { item.children.map(component => {
                    return <li class="devui-accordion-item" key={component.title}>
                      {
                        // TODO 路由链接 d-accordion-item-routerlink
                      }
                      <div class="devui-accordion-item-title devui-over-flow-ellipsis" style="text-indent: 20px;" title={component.title}>
                        <router-link to={component.link}>
                          <div class="devui-accordion-splitter" style="left: 30px;"></div>
                          { component.title }
                        </router-link>
                      </div>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </li>
        }) }
      </ul>
    }
  }
})