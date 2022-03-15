import { ExtractPropTypes, PropType } from 'vue';

export const timePickerProps = {
  modelValue:{
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '00:00:00'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  timePickerWidth: {
    type: Number,
    default: 212
  },
  minTime: {
    type: String,
    default: '00:00:00'
    // 默认时间优先级：minTime > modelValue
  },
  maxTime: {
    type: String,
    default: '23:59:59'
  },
  format:{
    type:String,
    default:'hh:mm:ss'
  },
  autoOpen:{
    type:Boolean,
    default:false
  },
  showAnimation:{
    type:Boolean,
    default:true
  }
} as const;

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>;
