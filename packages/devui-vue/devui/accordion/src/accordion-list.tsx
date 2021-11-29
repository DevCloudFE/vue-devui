import { defineComponent, toRefs } from 'vue'
import type { AccordionMenuItem } from './accordion.type'
import DAccordionMenu from './accordion-menu'
import { accordionProps } from './accordion-types'


export default defineComponent({
  name: 'DAccordionList',
  inheritAttrs: false,
  components: {
    DAccordionMenu
  },
  props: {
    data: {
      type: Array as () => Array<AccordionMenuItem>,
      default: null
    },
    deepth: {
      type: Number,
      default: 0
    },
    parent: {
      type: Object as () => AccordionMenuItem,
      default: null
    },
    innerListTemplate: Boolean,
    ...accordionProps,
  },
  setup(props, {attrs, slots}) {
    const {
      childrenKey,
      innerListTemplate,
      deepth
    } = toRefs(props)
    return () => {
      return (
        <>
          {
            !innerListTemplate.value &&
            <ul class="devui-accordion-list" {...attrs}>
              {props.data.map(item => {
                return <li class="devui-accordion-item" key={item.title}>
                  {/* // TODO 菜单类型 d-accordion-menu */}
                  {childrenKey !== undefined && <d-accordion-menu item={item} deepth={props.deepth} parent={props.parent} {...accordionProps}></d-accordion-menu>}
                  {/* <div class="devui-accordion-menu-item open" title={item.title}>
                    <div title={item.title} class={`devui-accordion-item-title devui-over-flow-ellipsis open`}>{ item.title }</div>
                    {
                      // TODO 子菜单 d-accordion-list
                    }
                    <div class="devui-accordion-submenu devui-accordion-show-animate" style="opacity: 1; overflow: hidden;">
                      <ul class="devui-accordion-list">
                        { item.children?.map(component => {
                          return <li class="devui-accordion-item" key={component.title}>
                            {
                              // TODO 路由链接 d-accordion-item-routerlink
                            }
                            <div class="devui-accordion-item-title devui-over-flow-ellipsis" style="text-indent: 20px;" title={component.title}>
                              <router-link to={component.link}>
                                <div class="devui-accordion-splitter" style="left: 30px;"></div>
                                { component.title }
                                { component.done && <span class="tag-done">已完成</span> }
                              </router-link>
                            </div>
                          </li>
                        })}
                      </ul>
                    </div>
                  </div> */}
                </li>
              }
              )}
            </ul>
          }
          {
            innerListTemplate.value && deepth.value !== 0 &&
            <div>
              {slots.default ? slots.innerListTemplate() : ''}
            </div>
          }
        </>
      )
    }
  }
})