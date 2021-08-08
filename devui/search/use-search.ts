import { PropType, ExtractPropTypes } from 'vue'
type Size = 'lg' | 'sm'
type IconPosition = 'right' | 'left'
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
  }
}

export type SearchProps = ExtractPropTypes<typeof searchProps>
