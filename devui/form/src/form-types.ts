import { Emitter } from 'mitt'
import type { PropType, ExtractPropTypes } from 'vue'

export const formProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  formData: {
    type: Object,
    default: {}
  },
  layout: {
    type: String as PropType<'horizontal' | 'vertical' | 'columns'>,
    default: 'horizontal', // 'horizontal'|'vertical'|'columns'
  },
  labelSize: {
    type: String as PropType<'sm' | '' | 'lg'>,
    default: '', // 'sm' | '' | 'lg'
  },
  labelAlign: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'start', // 'start' | 'center' | 'end'
  },
  rules: {
    type: Object,
    default: {}, 
  },
  columnsClass: {
    type: String as PropType<'u-1-3'>,
    default: '', 
  },
} as const

export const formItemProps = {
  dHasFeedback: {
    type: Boolean,
    default: false
  },
  prop: {
    type: String,
    default: ''
  }
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

export const formControlProps = {
  feedbackStatus: {
    type: String,
    default: ''
  },
  extraInfo: {
    type: String,
    default: ''
  }
} as const

export const dFormEvents = {
  addField: 'd.form.addField',
  removeField: 'd.form.removeField',
} as const

export const dFormItemEvents = {
  blur: 'd.form.blur',
  change: 'd.form.change',
  input: 'd.form.input',
} as const


export interface IForm {
  formData: any
  labelData: IFormLabel
  formMitt: Emitter<any>
  rules: any
  columnsClass: string
} 

export interface IFormLabel {
  layout: string
  labelSize: string
  labelAlign: string
}

export interface IFormItem {
  dHasFeedback: boolean
  prop: string
  formItemMitt: Emitter<any>
  resetField(): void
}

export interface IFormControl {
  feedbackStatus: string
  extraInfo: string
  formItemMitt: Emitter<any>
  resetField(): void
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormLabelProps = ExtractPropTypes<typeof formLabelProps>
export type FormControlProps = ExtractPropTypes<typeof formControlProps>
