import { computed, ComputedRef } from 'vue';
import { Column } from '../column/column.type';
import { TableBodyPropsTypes } from './body.type';

interface Data {
  rowColumns: ComputedRef<(Record<string, any> & { columns: Column[] })[]>;
}
