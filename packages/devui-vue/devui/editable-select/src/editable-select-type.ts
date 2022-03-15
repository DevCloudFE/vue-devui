export type OptionsType = Array<OptionType>;
export type OptionType = string | number | OptionObjectItem;
export interface OptionObjectItem {
  label: string;
  value: string | number;
  [key: string]: any;
}
