import type { PropType, ExtractPropTypes } from 'vue';

export interface IcommentProps {
  actions?: [];
  author?: [];
  avatar?: [];
  content?: [];
  datetime?: [];
}

// TODO: props 参数的类型需要明确定义
export const commentProps = {
  actions: {
    type: Object as PropType<IcommentProps>,
    default: null,
  },
  author: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  datetime: {
    type: Object as PropType<IcommentProps>,
    default: null,
  },
} as const;

export type CommentProps = ExtractPropTypes<typeof commentProps>;
