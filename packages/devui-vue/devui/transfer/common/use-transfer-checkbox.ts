import { ExtractPropTypes } from 'vue';
import { IItem } from '../types';
import { transferCommon } from './use-transfer-common';

const transferCheckboxProps = {
  ...transferCommon,
  data: {
    type: Object as () => IItem,
  },
  id: {
    type: Number
  }
};

export type TransferCheckboxProps = ExtractPropTypes<typeof transferCheckboxProps>;

export default transferCheckboxProps;
