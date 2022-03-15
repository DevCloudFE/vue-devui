import { Ref } from 'vue';

export type ColorModeType = 'hsl' | 'rgb' | 'hsv' | 'hsv' | 'hex';
export interface provideColorOptions {
  mode?: ColorModeType;
  showAlpha?: boolean;
  tab?: string;
  dotSize?: number;
  swatches?: string[];
  showHistory?: boolean;
}
export interface CssColorObject {
  color?: Hex;
}
export interface ColorPickerColor {
  alpha: number;
  hex: Hex;
  hexa: Hexa;
  hsla: HSLA;
  hsva: HSVA;
  hue: number;
  rgba: RGBA;
  hsv?: any;
  hsl?: any;
}
export interface position {
  left?: Ref<number>;
  top?: Ref<number>;
  right?: Ref<number>;
  bottom?: Ref<number>;
}
// Types
export type ColorInt = number;
export type HSV = { h: number; s: number; v: number };
export type HSVA = HSV & { a: number };
export type RGB = { r: number; g: number; b: number };
export type RGBA = RGB & { a: number };
export type HSL = { h: number; s: number; l: number };
export type HSLA = HSL & { a: number };
export type Hex = string;
export type Hexa = string;
export type Color = string | number | {};
