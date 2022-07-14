import { ExtractPropTypes, PropType } from 'vue';

export interface Message {
  severity?: string; // 预设值有 common、success、error、warn、info，超时时间参见 life 说明，未设置或非预设值时超时时间为 5000 毫秒，warn 和 error 为 10000 毫秒
  summary?: string; // 消息标题。当设置超时时间，未设置标题时，不展示标题和关闭按钮
  content?: string; // 消息内容，支持纯文本和模板，推荐使用
  life?: number; // 单个消息超时时间，需设置 lifeMode 为 single 。每个消息使用自己的超时时间，开启该模式却未设置时按 severity 判断超时时间
  id?: string | number; // 消息ID
}

export const toastProps = {
  value: {
    type: Array as PropType<Message[]>,
    required: true
  },
  life: {
    type: Number as PropType<number>,
    default: 5000
  },
  lifeMode: {
    type: String as PropType<'global' | 'single'>,
    default: 'global'
  },
  sticky: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export type ToastProps = ExtractPropTypes<typeof toastProps>;
