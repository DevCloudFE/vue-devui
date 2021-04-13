import { defineComponent } from 'vue'
import AccordionList from './accordion-list'
import { AccordionMenuType } from './accordion.type'
import './accordion.scss'

export default defineComponent({
  name: 'd-accordion',
  props: {
    data: Array as () => Array<any> | AccordionMenuType,
    /* Key值定义, 用于自定义数据结构 */
    titleKey: { type : String, default: 'title' }, // 标题的key，item[titleKey]类型为string，为标题显示内容
    loadingKey: { type : String, default: 'loading' }, // 子菜单动态加载item[loadingKey]类型为boolean
    childrenKey: { type : String, default: 'children' }, // 子菜单Key
    disabledKey: { type : String, default: 'disabled' }, // 是否禁用Key
    activeKey: { type : String, default: 'active' }, // 菜单是否激活/选中
    openKey: { type : String, default: 'open' }, // 菜单是否打开

    /* 菜单模板 */
    menuItemTemplate: { type: String }, // 可展开菜单内容条模板
    itemTemplate: { type: String }, // 可点击菜单内容条模板

    menuToggle: Function as unknown as () => ((event: MouseEvent) => void), // 可展开菜单展开事件
    itemClick: Function as unknown as () => ((event: MouseEvent) => void), // 可点击菜单点击事件
    activeItemChange: Function as unknown as () => ((event: MouseEvent) => void),

    /** 高级选项和模板 */
    restrictOneOpen: { type: Boolean, default: false }, // 限制一级菜单同时只能打开一个
    autoOpenActiveMenu: { type: Boolean, default: false }, // 自动展开活跃菜单
    showNoContent: { type: Boolean, default: true }, // 没有内容的时候是否显示没有数据
    noContentTemplate: { type: String }, // 没有内容的时候使用自定义模板
    loadingTemplate: { type: String }, // 加载中使用自定义模板
    innerListTemplate: { type: String }, // 可折叠菜单内容完全自定义，用做折叠面板

    /* 内置路由/链接/动态判断路由或链接类型 */
    linkType: { type: String as () => 'routerLink' | 'hrefLink' | 'dependOnLinkTypeKey' | '' | string, default: '' },
    linkTypeKey: { type: String, default: 'linkType' }, // linkType为'dependOnLinkTypeKey'时指定对象linkType定义区
    linkKey: { type: String, default: 'link' }, // 链接内容的key
    linkTargetKey: { type: String, default: 'target' }, // 链接目标窗口的key
    linkDefaultTarget: { type: String, default: '_self' }, // 不设置target的时候target默认值

    accordionType: { type: String as () => 'normal' | 'embed', default: 'normal' },
  },
  setup(props, ctx) {
    const { data, accordionType } = props

    return () => {
      return <div class={`devui-accordion-menu devui-scrollbar ${accordionType === 'normal'?'devui-accordion-menu-normal':''}`}>
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