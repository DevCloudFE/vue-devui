import type { PropType, ExtractPropTypes, Slot } from 'vue'
import { IButtonStyle } from '../../button/src/button'

export interface ButtonOption {
  btnStyle: IButtonStyle
  text: string
  disabled: boolean
  handler: ($event: Event) => void
}

export interface ModalPropsType {
  width: string
  maxHeight: string
  zIndex: number
  backdropZIndex: number
  placement: 'center' | 'top' | 'bottom'
  offsetX: string
  offsetY: string
  showAnimation: boolean
  backdropCloseable: boolean
  escapeable: boolean
  bodyScrollable: boolean

  title: string
  content: Slot
  buttons: ButtonOption[]

  onClose(): void
  beforeHidden: (() => boolean) | Promise<boolean>
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
  backdropZIndex: {
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
    default: false
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
    type: Object as PropType<Promise<boolean> | (() => boolean)>
  },

  buttons: {
    type: Array as PropType<ButtonOption[]>,
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
