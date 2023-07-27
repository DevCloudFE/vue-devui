import { ExtractPropTypes, PropType } from "vue";

export const devuiChartProps = {
  option: {
    type: Object as PropType<any>,
    default: {}
  }
};

export type DevuiChartProps = ExtractPropTypes<typeof devuiChartProps>;
