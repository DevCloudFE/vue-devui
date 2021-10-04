import type { ExtractPropTypes, PropType } from 'vue'

export interface SourceConfig {
  title: string // 显示的名称
  link?: string // 跳转的路径
  target?: string // 规定在何处打开链接文档
  noNavigation?: boolean // 链接是否不可跳转,一般用于当前所处位置不可跳转的配置
}

export const breadcrumbProps = {
  source: {
    type: Array as PropType<Array<SourceConfig>>,
    default: [],
  },
} as const

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
