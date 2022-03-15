import type { PropType, ExtractPropTypes, VNode } from 'vue';
export interface IcommentProps {
  [prop: string]: any;
}

export const commentProps = {
  actions: {
    type:Object as PropType<IcommentProps>,
    default:null
  },
  author: {
    type:Object as PropType<IcommentProps>,
    default:null
  },
  avatar: {
    type:Object as PropType<IcommentProps>,
    default:null
  },
  content: {
    type:Object as PropType<IcommentProps>,
    default:null
  },
  datetime: {
    type:Object as PropType<IcommentProps>,
    default:null
  },

} as const;

export type CommentProps = ExtractPropTypes<typeof commentProps>;
