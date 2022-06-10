import { Ref } from 'vue';

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

export type UseTimerPickerFn = {
  isActive: Ref<boolean>;
  showPopup: Ref<boolean>;
  devuiTimePicker: Ref<HTMLElement | undefined>;
  timePickerValue: Ref<string>;
  inputDom: Ref<HTMLElement | undefined>;
  timePopupDom: Ref<HTMLElement | undefined>;
  left: Ref<number>;
  top: Ref<number>;
  showClearIcon: Ref<boolean>;
  firsthandActiveTime: Ref<string>;
  vModeValue: Ref<string>;
  getPopupPosition: () => void;
  getTimeValue: (e: MouseEvent) => void;
  clickVerifyFun: (e: MouseEvent) => void;
  isOutOpen: () => void;
  vModelIsBeyond: () => void;
  clearAll: (e: MouseEvent) => void;
  chooseTime: (slotTime: TimeObj) => void;
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
