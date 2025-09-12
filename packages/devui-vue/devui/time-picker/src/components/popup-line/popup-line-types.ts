import { ExtractPropTypes, PropType } from 'vue';
import { ArrType } from '../../types';

export const popupLineProps = {
  hourList: {
    type: Array as PropType<Array<ArrType>>,
    default: (): Array<ArrType> => [],
  },
  minuteList: {
    type: Array as PropType<Array<ArrType>>,
    default: (): Array<ArrType> => [],
  },
  secondList: {
    type: Array as PropType<Array<ArrType>>,
    default: (): Array<ArrType> => [],
  },
  format: {
    type: String,
    default: 'hh:mm:ss',
  },
  minTime: {
    type: String,
    default: '00:00:00',
  },
  maxTime: {
    type: String,
    default: '23:59:59',
  },
  itemHeight: {
    type: Number,
    default: 32,
  },
};

export type PopupLineProps = ExtractPropTypes<typeof popupLineProps>;
