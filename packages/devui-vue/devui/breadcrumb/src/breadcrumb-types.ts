import type { ExtractPropTypes, PropType } from 'vue';

export interface SourceConfig {
  title: string; // 显示的名称
  link?: string; // 跳转的路径
  target?: string; // 规定在何处打开链接文档
  noNavigation?: boolean; // 链接是否不可跳转,一般用于当前所处位置不可跳转的配置
  linkType?: 'hrefLink' | 'routerLink'; // 链接类型，默认为'hrefLink'方式，可选'hrefLink' 或 'routerLink'
  replace: boolean; // 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
}

export const breadcrumbProps = {
  /**
   * 可选，面包屑根据配置的 source 按照默认渲染方式显示
   */
  source: {
    type: Array as PropType<Array<SourceConfig>>,
    default: []
  },
  /**
   * 可选，自定义分隔符样式
   */
  separatorIcon: {
    type: String
  }
} as const;

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
