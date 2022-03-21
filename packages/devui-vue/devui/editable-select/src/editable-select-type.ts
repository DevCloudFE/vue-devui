export interface OptionObjectItem {
  label: string;
  value: string | number;
  [key: string]: unknown;
}
export type OptionType = string | number | OptionObjectItem;

export type OptionsType = Array<OptionType>;
