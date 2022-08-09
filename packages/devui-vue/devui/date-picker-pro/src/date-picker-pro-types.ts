import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';
import type { Dayjs } from 'dayjs';
import { ArrType } from '../../time-picker/src/types';
import type { InputSize } from '../../input/src/input-types';

export const datePickerProCommonProps = {
  format: {
    type: String,
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
  calendarRange: {
    type: Array as PropType<number[]>,
    default: [1970, 2099],
  },
  limitDateRange: {
    type: Array as PropType<Date[]>,
  },
  type: {
    type: String,
    default: 'date',
  },
};

export const datePickerProProps = {
  modelValue: {
    type: [Date, String] as PropType<Date | string>,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  ...datePickerProCommonProps,
} as const;

export type DatePickerProProps = ExtractPropTypes<typeof datePickerProProps>;

export interface UseDatePickerProReturnType {
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
  pickerSize: ComputedRef<'sm' | 'md' | 'lg'>;
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
  handleScrollMonthList: (e: UIEvent) => void;
  isDateSelected: (date: Date) => boolean;
  isStartDate: (date: Date) => boolean;
  isInRangeDate: (date: Date) => boolean;
  isEndDate: (date: Date) => boolean;
  isDisabled: (date: Date) => boolean;
}

export const datePickerProPanelProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  dateValue: {
    type: [Object, Array] as PropType<Dayjs | undefined | (Dayjs | undefined)[]>,
  },
  isRangeType: {
    type: Boolean,
    default: false,
  },
  focusType: {
    type: String,
    default: 'start',
  },
  ...datePickerProCommonProps,
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

export interface UseYearCalendarPanelReturnType {
  yarListScrollRef: Ref<HTMLElement | undefined>;
  yearList: Ref<number[][]>;
  getYearItemCls: (year: number) => Record<string, boolean>;
  handlerSelectYear: (year: number) => void;
}

export interface UseCalendarSelectedReturnType {
  today: Ref<Date>;
  calendarRange: Ref<number[]>;
  selectDate: Ref<Dayjs | undefined>;
  rangeSelectDate: Ref<(Dayjs | undefined)[]>;
  minDate: ComputedRef<Date>;
  maxDate: ComputedRef<Date>;
  fixRangeDate: () => void;
  getToDate: (dateValue: Dayjs | undefined | (Dayjs | undefined)[]) => Dayjs | undefined;
  emitSelectedDate: () => void;
  isStartDate: (date: Date) => boolean;
  isInRangeDate: (date: Date) => boolean;
  isEndDate: (date: Date) => boolean;
}

export interface UseMonthCalendarPanelReturnType {
  yearScrollRef: Ref<HTMLElement | undefined>;
  monthScrollRef: Ref<HTMLElement | undefined>;
  yearList: Ref<YearAndMonthItem[]>;
  monthList: number[][];
  handlerSelectYear: (year: number) => void;
  handlerMonthScroll: (e: MouseEvent) => void;
  getMonthItemCls: (year: number, month: number) => Record<string, boolean>;
  handlerSelectMonth: (year: number, month: number) => void;
}
