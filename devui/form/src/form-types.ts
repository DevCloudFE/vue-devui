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


export interface IValidators {
  required: boolean
  minlength: number
  maxlength: number
  min: number
  max: number
  requiredTrue: boolean
  email: boolean
  pattern: RegExp
  whiteSpace: boolean
}

const Validators: IValidators = {
  required: false,
  minlength: 0,
  maxlength: 0,
  min: 0,
  max: 0,
  requiredTrue: false,
  email: false,
  pattern: undefined,
  whiteSpace: false
}

export const dDefaultValidators = {
  'required': Validators.required, // 配置不能为空限制，rule中使用：{ required: true }
  'minlength': Validators.minlength, // 配置最小长度限制，rule中使用：{ minlength: 5 }
  'maxlength': Validators.maxlength, // 配置最大长度限制，rule中使用：{ maxlength: 128 }
  'min': Validators.min, // 配置最小值限制，rule中使用：{ min: 0 }
  'max': Validators.max, // 配置最大值限制，rule中使用：{ max: 100 }
  'requiredTrue': Validators.requiredTrue, // 配置需要为true，rule中使用：{ requiredTrue: true }
  'email': Validators.email, // 配置邮箱校验，rule中使用：{ email: true }
  'pattern': Validators.pattern, // 配置正则校验，rule中使用：{ pattern: RegExp }
  'whitespace': Validators.whiteSpace, // 配置输入不能全为空格限制，rule中使用：{ whitespace: true }
};
