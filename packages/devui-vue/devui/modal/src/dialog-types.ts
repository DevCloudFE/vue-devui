import type { PropType, ExtractPropTypes } from 'vue'
import { IButtonVariant } from '../../button'

export interface ButtonOptions {
  variant: IButtonVariant
  text: string
  disabled: boolean
  handler: ($event: Event) => void
}

export const dialogProps = {
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
    type: [Promise, Function] as PropType<Promise<boolean> | (() => boolean | Promise<boolean>)>
  },

  buttons: {
    type: Array as PropType<ButtonOptions[]>,
    default: []
  },

  dialogType: {
    type: String as PropType<'standard' | 'success' | 'failed' | 'warning' | 'info'>,
    default: 'standard'
  },


  modelValue: {
    type: Boolean,
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(value: boolean) => void>
  }
} as const

export type DialogProps = ExtractPropTypes<typeof dialogProps>
