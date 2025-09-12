import type { ExtractPropTypes, PropType } from 'vue';

export interface MenuConfig {
  title: string; // 显示的名称
  link: string; // 跳转的路径，可为绝对路径与相对路径，注意需要与路由的配置一致
  target?: string; // 规定在何处打开链接文档
}

export const breadcrumbItemProps = {
  /**
   * 可选，是否需要显示下拉箭头及下拉列表内容
   */
  showMenu: {
    type: Boolean,
    default: false
  },
  /**
   * 可选，showMenu 为 true 时传入，下拉列表的显示内容
   */
  menuList: {
    type: Array as PropType<Array<MenuConfig>>
  },
  /**
   * 可选，showMenu 为 true 时传入，下拉列表是否需要搜索功能
   */
  isSearch: {
    type: Boolean,
    dafault: false
  },
  /**
   * 路由跳转对象，同 vue-router 的 to
   */
  to: {
    type: [String, Object] as PropType<string | Record<string, unknown>>,
    default: ''
  },
  /**
   * 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
   */
  replace: {
    type: Boolean,
    default: false
  }
} as const;

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>;
