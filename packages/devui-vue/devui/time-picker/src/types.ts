import { ComputedRef, Ref } from 'vue';

export type timeType = 'hh' | 'HH' | 'mm' | 'MM' | 'ss' | 'SS';
export type TimeObj = {
  time: string;
  type?: timeType;
};

export type timeDataType = 'hour' | 'minute' | 'second';

export type ArrType = {
  type: timeDataType;
  isActive: boolean;
  isDisabled: boolean;
  time: string;
  flag: string;
};

export interface TimeListItem {
  hh: ArrType[];
  mm: ArrType[];
  ss: ArrType[];
}
export interface popupTimeObj {
  activeHour: Ref<string>;
  activeMinute: Ref<string>;
  activeSecond: Ref<string>;
}

export type sizeType = 'lg' | 'md' | 'sm';

export type UseTimerPickerFn = {
  showPopup: Ref<boolean>;
  trueTimeValue: ComputedRef<string>;
  devuiTimePicker: Ref<HTMLElement | undefined>;
  timePickerValue: Ref<string>;
  inputDom: Ref<HTMLElement | undefined>;
  overlayRef: Ref<HTMLElement | undefined>;
  timePopupDom: Ref<HTMLElement | undefined>;
  showClearIcon: Ref<boolean>;
  firsthandActiveTime: Ref<string>;
  vModeValue: Ref<string>;
  clickVerifyFun: (e: MouseEvent) => void;
  isOutOpen: () => void;
  clearAll: (e: MouseEvent) => void;
  chooseTime: (slotTime: TimeObj) => void;
  changeTimeData: ({ activeHour, activeMinute, activeSecond }: popupTimeObj) => void;
};

export type UsePopupLineFn = {
  activeTime: Ref<string>;
  activeHour: Ref<string>;
  activeMinute: Ref<string>;
  activeSecond: Ref<string>;
  activeTimeFun: (e: any, item: ArrType, index: number) => void;
  resetTimeValue: (time: string) => void;
  getNewTime: () => void;
  resetScrollTop: () => void;
};
