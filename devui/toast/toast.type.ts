import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export type IToastLifeMode = 'single' | 'global'
export type IToastSeverity = 'common' | 'success' | 'error' | 'warn' | 'info' | string
export type IToastSeverityConfig = { color: string; icon: string; }

export interface Message {
  /**
   * 消息级别。
   * 预设值有 common、success、error、warn、info，超时时间参见 life 说明，
   * 未设置或非预设值时超时时间为 5000 毫秒，warn 和 error 为 10000 毫秒。
   */
  severity?: IToastSeverity
  /**
   * 消息标题。
   * 当设置超时时间，未设置标题时，不展示标题和关闭按钮。
   */
  summary?: string
  /**
   * 消息内容，推荐使用content替换。
   */
  detail?: string
  /**
   * 消息内容，支持纯文本和插槽，推荐使用。
   */
  content?: string
  /**
   * 单个消息超时时间，需设置 lifeMode 为 single 。
   * 每个消息使用自己的超时时间，开启该模式却未设置时按 severity 判断超时时间。
   */
  life?: number
  /**
   * 消息 ID。
   */
  id?: any
}

export const toastProps = {
  /**
   * 必选，消息内容数组，Message 对象定义见下文。
   */
  value: {
    type: Array as PropType<Message[]>,
    required: true,
    default: () => []
  },
  /**
   * 可选，超时时间，超时后自动消失，鼠标悬停可以阻止消失，单位毫秒。
   *
   * @description 普通、成功、提示类默认为 5000 毫秒，错误、警告类默认为 10000 毫秒。
   */
  life: {
    type: Number,
    default: null
  },
  /**
   * 可选，超时时间模式，预设值为 global 和 single 。
   *
   * @description
   * 默认为 global，所有消息使用 life 或群组第一个消息的预设超时时间；
   * 设置为 single 时，每个消息使用自身的超时时间，参见 Message 中的 life 定义。
   *
   * @default 'global'
   */
  lifeMode: {
    type: String as PropType<IToastLifeMode>,
    default: 'global'
  },
  /**
   * 可选，是否常驻，默认自动关闭。
   *
   * @default false
   */
  sticky: {
    type: Boolean,
    default: false
  },
  /**
   * 可选，样式。
   */
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * 可选，类名。
   */
  styleClass: {
    type: String
  },
  onCloseEvent: {
    type: Function as PropType<(message: Message) => void>
  },
  onValueChange: {
    type: Function as PropType<(restMessages: Message[]) => void>
  }
} as const

export type ToastProps = ExtractPropTypes<typeof toastProps>
