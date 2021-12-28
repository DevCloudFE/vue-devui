import type { ExtractPropTypes, PropType } from 'vue'

export const drawerProps = {
  width: { // 宽度
    type: String,
    default: '300px',
  },
  visible: { // 是否可见
    type: Boolean,
    default: false,
  },
  zIndex: { // 层级
    type: Number,
    default: 1000,
  },
  isCover: { // 是否有遮罩层
    type: Boolean,
    default: true,
  },
  escKeyCloseable: { // 是否可通过esc关闭
    type: Boolean,
    default: true,
  },
  position: { // 位置 只有左和右
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  backdropCloseable: { // 点击遮罩层是否可关闭
    type: Boolean,
    default: true,
  },
  beforeHidden: { // 关闭前的回调
    type: [Promise, Function] as PropType<Promise<boolean> | (() => boolean | Promise<boolean>)>,
  },
  content: { // 默认内容插槽
    type: [Object, Function],
  },
  header: { // 头部内容插槽
    type: [Object, Function],
  },
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
