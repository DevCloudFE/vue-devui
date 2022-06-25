import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';
import type { Dayjs } from 'dayjs';
import { ArrType } from '../../time-picker/src/types';
import type { InputSize } from '../../input/src/input-types';

export const datePickerProProps = {
  modelValue: {
    type: [Date, String] as PropType<Date | string>,
    default: '',
  },
  format: {
    type: String,
  },
  placeholder: {
    type: String,
    default: '请选择日期',
  },
  showTime: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

export type DatePickerProProps = ExtractPropTypes<typeof datePickerProProps>;

export interface UseDatePickerProReturnType {
  containerRef: Ref<HTMLElement | undefined>;
  originRef: Ref<HTMLElement | undefined>;
  inputRef: Ref<HTMLElement | undefined>;
  overlayRef: Ref<HTMLElement | undefined>;
  isPanelShow: Ref<boolean>;
  placeholder: ComputedRef<string>;
  format: ComputedRef<string>;
  dateValue: ComputedRef<Dayjs | undefined>;
  displayDateValue: ComputedRef<string>;
  isMouseEnter: Ref<boolean>;
  showCloseIcon: ComputedRef<boolean>;
  pickerDisabled: ComputedRef<boolean>;
  pickerSize: ComputedRef<string>;
  isValidateError: ComputedRef<boolean>;
  onFocus: (e: MouseEvent) => void;
  onSelectedDate: (date: Dayjs, isConfirm?: boolean) => void;
  handlerClearTime: (e: MouseEvent) => void;
}

export interface CalendarDateItem {
  day: string;
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isActive?: boolean;
}

export interface YearAndMonthItem {
  year: number;
  month?: number;
  isMonth?: boolean;
  active?: boolean;
  displayWeeks?: CalendarDateItem[][];
}

export interface UseDatePickerReturnType {
  calendarPanelRef: Ref<HTMLElement | undefined>;
  timeData: Ref<string>;
  onSelectedDate: (date: Dayjs) => void;
  handlerConfirm: () => void;
  handlerSelectedTime: (time: string) => void;
  onChangeRangeFocusType: (type: string) => void;
}

export interface UseCalendarPanelReturnType {
  yearScrollRef: Ref<HTMLElement | undefined>;
  monthScrollRef: Ref<HTMLElement | undefined>;
  yearAndMonthList: Ref<YearAndMonthItem[]>;
  allMonthList: Ref<YearAndMonthItem[]>;
  isListCollapse: Ref<boolean>;
  handlerSelectDate: (day: CalendarDateItem) => void;
  handlerYearCollapse: (date?: Date) => void;
  handlerClickMonth: (year: number, month: number | undefined) => void;
  handleScrollYearList: (e: UIEvent) => void;
  handleScrollMonthList: (e: UIEvent) => void;
  isDateSelected: (date: Date) => boolean;
  isStartDate: (date: Date) => boolean;
  isInRangeDate: (date: Date) => boolean;
  isEndDate: (date: Date) => boolean;
}

export const datePickerProPanelProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: 'YYYY/MM/DD',
  },
  dateValue: {
    type: [Object, Array] as PropType<Dayjs | undefined | (Dayjs | undefined)[]>,
  },
  showTime: {
    type: Boolean,
    default: false,
  },
  isRangeType: {
    type: Boolean,
    default: false,
  },
  focusType: {
    type: String,
    default: 'start',
  },
} as const;

export type DatePickerProPanelProps = ExtractPropTypes<typeof datePickerProPanelProps>;

export interface TimePickerItem {
  activeHour: Ref<string>;
  activeMinute: Ref<string>;
  activeSecond: Ref<string>;
}

export const timerPickerPanelProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  bindData: {
    type: String,
    default: '',
  },
} as const;

export type TimerPickerPanelProps = ExtractPropTypes<typeof timerPickerPanelProps>;

export interface UseTimePickerPanelReturnType {
  timeListDom: Ref<HTMLElement | undefined>;
  hourList: Array<ArrType>;
  minuteList: Array<ArrType>;
  secondList: Array<ArrType>;
  handlerTimeSelected: (date: TimePickerItem) => void;
}
