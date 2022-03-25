import { computed, ComputedRef } from 'vue';
import { Column } from '../column/column-types';
import { TableBodyPropsTypes } from './body-types';

interface Data {
  rowColumns: ComputedRef<(Record<string, any> & { columns: Column[] })[]>;
}
