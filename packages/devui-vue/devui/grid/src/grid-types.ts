import type { PropType, ExtractPropTypes } from 'vue';

export type Align = 'top' | 'middle' | 'bottom';

export type Justify = 'start' | 'end' | 'center' | 'around' | 'between';

export interface GutterScreenSizes {
  xs?: number | number[];
  sm?: number | number[];
  md?: number | number[];
  lg?: number | number[];
  xl?: number | number[];
  xxl?: number | number[];
  // 如果没有必选项，gutter将是unknown类型
  [key: string]: number | number[];
}

export const rowProps = {
  align: {
    type: String as PropType<Align>,
    default: 'top'
  },
  gutter: {
    type: [Number, Object, Array] as PropType<number | GutterScreenSizes | number[]>,
    default: 0
  },
  justify: {
    type: String as PropType<Justify>,
    default: 'start'
  },
  wrap: {
    type: Boolean as PropType<boolean>,
    default: false
  }
} as const;

export type RowProps = ExtractPropTypes<typeof rowProps>;

const numberProp = Number as PropType<number>;

export const colPropsBaseStyle = {
  flex: [String, Number] as PropType<string | number>,
  order: numberProp,
} as const;

export const colPropsBaseClass = {
  offset: numberProp,
  pull: numberProp,
  push: numberProp,
  span: numberProp
} as const;

export type ColPropsBaseClass = ExtractPropTypes<typeof colPropsBaseClass>;

export type ColPropsBaseStyle = ExtractPropTypes<typeof colPropsBaseStyle>;

const screenSizesProp = [Number, Object] as PropType<number | ColPropsBaseClass>;

export const screenSizes = {
  xs: screenSizesProp,
  sm: screenSizesProp,
  md: screenSizesProp,
  lg: screenSizesProp,
  xl: screenSizesProp,
  xxl: screenSizesProp,
} as const;

export type ScreenSizes = ExtractPropTypes<typeof screenSizes>;

export const colProps = { ...colPropsBaseStyle, ...colPropsBaseClass, ...screenSizes};

export type ColProps = ExtractPropTypes<typeof colProps>;
