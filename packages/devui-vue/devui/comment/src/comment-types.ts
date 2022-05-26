import type { ExtractPropTypes } from 'vue';

export const commentProps = {
  author: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  datetime: {
    type: String,
    default: '',
  },
} as const;

export type CommentProps = ExtractPropTypes<typeof commentProps>;
