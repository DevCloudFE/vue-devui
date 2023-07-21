import type { ExtractPropTypes, PropType } from 'vue';

export type OutputFormat = 'line-by-line' | 'side-by-side';

export const codeReviewProps = {
  diff: {
    type: String,
    required: true,
    default: '',
  },
  outputFormat: {
    type: String as PropType<OutputFormat>,
    default: 'line-by-line',
  },
};
export type CodeReviewProps = ExtractPropTypes<typeof codeReviewProps>;
