
export type timeType = 'hh' | 'HH' | 'mm' | 'MM' | 'ss' | 'SS';
export type TimeObj = {
  time: string;
  type?: timeType;
};

export type ArrType = {
  type: 'hour' | 'minute' | 'seconde';
  isActive: boolean;
  isDisabled: boolean;
  time: string;
  flag: string;
};
