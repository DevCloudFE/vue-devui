import { PropType, ExtractPropTypes } from '@vue/runtime-core';
import { IItem } from '../types';
import { transferCommon, transferDragFunctions } from './use-transfer-common';

const transferDragProps = {
  ...transferCommon,
  ...transferDragFunctions,
  itemData: {
    type: Object as PropType<IItem>
  },
  id: {
    type: Number,
    default: (): number | null => null
  },

};

export type TransferDragProps = ExtractPropTypes<typeof transferDragProps>;

export default transferDragProps;
