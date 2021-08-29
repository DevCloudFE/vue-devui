import { Emitter } from 'mitt'
import type { PropType, ExtractPropTypes } from 'vue'

export const formProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  formData: {
    type: Object as PropType<{ key: ''; }>,
    default: {}
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
  rules: {
    type: Object,
    default: {}, 
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
  rules: any
} 

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormLabelProps = ExtractPropTypes<typeof formLabelProps>

export interface IFormItem {
  dHasFeedback: boolean
  prop: string
  formItemMitt: Emitter<any>
  resetField(): void
}

export const dFormEvents = {
  addField: 'd.form.addField',
  removeField: 'd.form.removeField',
  inputBlur: 'd.form.inputBlur',
} as const

export const dFormItemEvents = {
  blur: 'd.form.blur',
  change: 'd.form.change',
  input: 'd.form.input',
} as const
