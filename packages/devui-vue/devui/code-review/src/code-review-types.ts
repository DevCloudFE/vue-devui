import type { ExtractPropTypes, InjectionKey, PropType, SetupContext, Ref } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';

export type DiffType = 'modify' | 'add' | 'delete' | 'rename';
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
  allowComment: {
    type: Boolean,
    default: true,
  },
  allowExpand: {
    type: Boolean,
    default: true,
  },
  showBlob: {
    type: Boolean,
    default: false,
  },
  diffType: {
    type: String as PropType<DiffType>,
    default: 'modify',
  },
  outputFormat: {
    type: String as PropType<OutputFormat>,
    default: 'line-by-line',
  },
  // 展开所有代码行的阈值，低于此阈值全部展开，高于此阈值分向上和向下两个操作展开
  expandThreshold: {
    type: Number,
    default: 50,
  },
  expandLoader: {
    type: Function as PropType<(interval: Array<number | undefined>, update: (code: string) => void) => void>,
  },
};
export type CodeReviewProps = ExtractPropTypes<typeof codeReviewProps>;

export interface CodeReviewContext {
  diffType: Ref<DiffType>;
  reviewContentRef: Ref<HTMLElement>;
  diffInfo: DiffFile;
  isFold: Ref<boolean>;
  rootCtx: SetupContext;
}
export const CodeReviewInjectionKey: InjectionKey<CodeReviewContext> = Symbol('d-code-review');
