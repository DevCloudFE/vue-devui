import type { ExtractPropTypes, InjectionKey, PropType, SetupContext, Ref } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';

export type OutputFormat = 'line-by-line' | 'side-by-side';
export type ExpandDirection = 'up' | 'down' | 'updown' | 'all';
export type LineSide = 'left' | 'right';
export type IncrementCodeInsertDirection = 'up' | 'down';
export interface CommentPosition {
  left: number;
  right: number;
}
export interface CodeReviewMethods {
  toggleFold: (status?: boolean) => void;
  insertComment: (lineNumber: number, lineSide: LineSide, commentDom: HTMLElement) => void;
  removeComment: (lineNumber: number, lineSide: LineSide) => void;
}

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
  // 展开所有代码行的阈值，低于此阈值全部展开，高于此阈值分向上和向下两个操作展开
  expandAllThreshold: {
    type: Number,
    default: 50,
  },
  codeLoader: {
    type: Function as PropType<(interval: Array<number | undefined>, update: (code: string) => void) => void>,
  },
};
export type CodeReviewProps = ExtractPropTypes<typeof codeReviewProps>;

export interface CodeReviewContext {
  reviewContentRef: Ref<HTMLElement>;
  diffInfo: DiffFile;
  isFold: Ref<boolean>;
  rootCtx: SetupContext;
}
export const CodeReviewInjectionKey: InjectionKey<CodeReviewContext> = Symbol('d-code-review');
