import { Emitter } from 'mitt'
import type { PropType, ExtractPropTypes } from 'vue'

export const formProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  formData: {
    type: Object as PropType<{ key: ''; }>,
    default: null
  },
  layout: {
    type: String,
    default: 'horizontal', // 'horizontal'|'vertical'|'columns'
  },
  labelSize: {
    type: String,
    default: '', // 'sm' | '' | 'lg'
  },
  labelAlign: {
    type: String,
    default: 'start', // 'start' | 'center' | 'end'
  },
} as const

export const formLabelProps = {
  required: {
    type: Boolean,
    default: false
  },
  hasHelp: {
    type: Boolean,
    default: false
  },
  helpTips: {
    type: String,
    default: ''
  }
} as const

export interface ILabel {
  layout: string
  labelSize: string
  labelAlign: string
}
export interface IForm {
  formData: any
  labelData: ILabel
  formMitt: Emitter<any>
} 

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormLabelProps = ExtractPropTypes<typeof formLabelProps>

export interface IFormItem {
  dHasFeedback: boolean
  resetField(): void
}

export const dFormEvents = {
  addField: 'd.form.addField',
  removeField: 'd.form.removeField',
} as const
