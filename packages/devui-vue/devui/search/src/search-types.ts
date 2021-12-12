import type { PropType, ExtractPropTypes, Ref, ComputedRef } from 'vue'

export type Size = 'lg' | 'sm' | ''
export type IconPosition = 'right' | 'left'

export const searchProps = {
  size: {
    type: String as PropType<Size>,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入关键字'
  },
  maxLength: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  delay: {
    type: Number,
    default: 300,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  isKeyupSearch: {
    type: Boolean,
    default: false
  },
  iconPosition: {
    type: String as PropType<IconPosition>,
    default: 'right',
  },
  noBorder: {
    type: Boolean,
    default: false
  },
  cssClass: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: '',
  },
  onSearch: {
    type: Function as PropType<(v: string) => void>,
    default: undefined
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(v: string) => void>,
    default: undefined
  },
} as const

export type SearchProps = ExtractPropTypes<typeof searchProps>

export interface KeywordsReturnTypes {
  keywords: Ref<string>
  clearIconShow: ComputedRef<boolean>
  onClearHandle: () => void
}

export interface KeydownReturnTypes {
  onInputKeydown: (e: KeyboardEvent) => void
  onClickHandle: () => void
  useEmitKeyword: (e: string) => void
}