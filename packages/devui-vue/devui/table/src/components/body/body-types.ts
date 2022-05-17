import { DefaultRow } from '../../table-types';
import { Column } from '../column/column-types';

export interface CellClickArg {
  columnIndex: number;
  rowIndex: number;
  column: Column;
  row: DefaultRow;
}
