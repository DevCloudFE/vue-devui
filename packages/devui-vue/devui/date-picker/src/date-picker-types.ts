import type { ExtractPropTypes, PropType } from 'vue';

export type TState = {
  range?: boolean;
  current?: Date;
  next?: Date;
  start?: Date;
  end?: Date;
  hover?: Date;
  show?: boolean;
  input?: string;
  value?: string;
  placeholder?: string;
};

export const datePickerProps = {
  selectedDateChange: {
    type: Function as PropType<(...args: unknown[]) => void>
  },
  autoClose: {
    type: Boolean,
    default: false
  },
  range: {
    type: Boolean,
    default: false
  },
  showTime: {
    type: Boolean,
    default: false
  },
  format: {
    type: String,
    default: 'y/MM/dd'
  },
  rangeSpliter: {
    type: String,
    default: '-'
  },
  attachInputDom: {
    type: String
  },
  dateMin: {
    type: String
  },
  dateMax: {
    type: String
  },
} as const;

export const datePickerPopupProps = {
  attach: {
    type: String
  },
  onBinding: {
    type: Function as PropType<(...args: unknown[]) => void>
  },
  onClosed: {
    type: Function as PropType<(...args: unknown[]) => void>
  },
  onOpen: {
    type: Function as PropType<(...args: unknown[]) => void>
  },
  show: {
    type: Boolean
  },
} as const;

export const timePickerProps = {
  time: {
    type: Date
  }
} as const;

export const verticalSliderProps = {
  size: {
    type: Number,
    default: 26
  },
  items: {
    type: Array
  },
  selectedIndex: {
    type: Number
  },
  className: {
    type: String
  },
  itemClassNormal: {
    type: String
  },
  itemClassSelected: {
    type: String
  },
  onChange: {
    type: Function as PropType<(...args: unknown[]) => void>
  }
} as const;

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
export type DatePickerPopupProps = ExtractPropTypes<typeof datePickerPopupProps>;
export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>;
export type VerticalSliderProps = ExtractPropTypes<typeof verticalSliderProps>;
