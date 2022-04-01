import type { PropType, ExtractPropTypes } from 'vue';
export interface IcommentProps {
  [prop: string]: any;
}

// TODO: props 参数的类型需要明确定义
export const commentProps = {
  actions: {
    type: Object as PropType<IcommentProps>,
    default: null,
  },
  author: {
    type: Object as PropType<IcommentProps>,
    default: null,
  },
  avatar: {
    type: Object as PropType<IcommentProps>,
    default: null,
  },
  content: {
    type: Object as PropType<IcommentProps>,
    default: null,
  },
  datetime: {
    type: Object as PropType<IcommentProps>,
    default: null,
  },
} as const;

export type CommentProps = ExtractPropTypes<typeof commentProps>;
