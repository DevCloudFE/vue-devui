import type { PropType, ExtractPropTypes } from 'vue'
import { IButtonStyle } from '../../button/src/button'

interface ButtonProps {
  bsStyle: IButtonStyle
  text: string
  disabled: boolean
  handler: ($event: Event) => void
}

export const modalProps = {
  // id: {
  //   type: String,
  //   required: true
  // },
  width: {
    type: String,
    default: '300px'
  },
  maxHeight: {
    type: String,
  },

  zIndex: {
    type: Number,
    default: 1050
  },
  backDropZIndex: {
    type: Number,
    default: 1049
  },

  placement: {
    type: String as PropType<'center' | 'top' | 'bottom'>,
    default: 'center'
  },
  offsetX: {
    type: String,
    default: '0px'
  },

  offsetY: {
    type: String,
    default: '0px'
  },

  title: {
    type: String
  },

  showAnimation: {
    type: Boolean,
    default: true
  },
  backdropCloseable: {
    type: Boolean,
    default: true
  },
  bodyScrollable: {
    type: Boolean,
    default: true
  },

  escapeable: {
    type: Boolean,
    default: true
  },

  onClose: {
    type: Function as PropType<() => void>,
  },
  beforeHidden: {
    type: Object as PropType<Promise<any> | (() => void)>
  },

  buttons: {
    type: Array as PropType<ButtonProps[]>,
    default: []
  },

  modelValue: {
    type: Boolean,
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(value: boolean) => void>
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>
