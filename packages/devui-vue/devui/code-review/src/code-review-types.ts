import type { ExtractPropTypes, InjectionKey, PropType, SetupContext, Ref } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';

export type OutputFormat = 'line-by-line' | 'side-by-side';

export const codeReviewProps = {
  diff: {
    type: String,
    required: true,
    default: '',
  },
  fold: {
    type: Boolean,
    default: false,
  },
  outputFormat: {
    type: String as PropType<OutputFormat>,
    default: 'line-by-line',
  },
};
export type CodeReviewProps = ExtractPropTypes<typeof codeReviewProps>;

export interface CodeReviewContext {
  diffInfo: DiffFile;
  isFold: Ref<boolean>;
  rootCtx: SetupContext;
}
export const CodeReviewInjectionKey: InjectionKey<CodeReviewContext> = Symbol('d-code-review');
