import type { ExtractPropTypes, PropType } from 'vue';

export interface Suggestion {
  __index?: number;

  [x: string]: unknown;
}

export const tagInputProps = {
  modelValue: {
    type: Array as PropType<Suggestion[]>,
    default: (): [] => [],
  },
  displayProperty: {
    type: String,
    default: 'name',
  },
  placeholder: {
    type: String,
    default: '',
  },
  minLength: {
    type: Number,
    default: 3,
  },
  maxLength: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  maxTags: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  maxTagsText: {
    type: String,
    default: '',
  },
  spellcheck: {
    type: Boolean,
    default: true,
  },
  suggestionList: {
    type: Array as PropType<Suggestion[]>,
    default: (): [] => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isAddBySpace: {
    type: Boolean,
    default: true,
  },
  disabledText: {
    type: String,
    default: '',
  },
  noData: {
    type: String,
    default: '暂无数据',
  },
  caseSensitivity: {
    type: Boolean,
    default: false,
  },
} as const;

export type TagInputProps = ExtractPropTypes<typeof tagInputProps>;

export type HandleEnter = () => void;
export type OnSelectIndexChange = (isUp: boolean) => void;

export interface UseInputKeydownReturnTypes {
  onInputKeydown: (e: KeyboardEvent) => void;
}
