import { watch, Ref, ref, computed } from 'vue';
import { Column } from '../column/column.type';
import { SortDirection } from '../table.type';

export interface TableStore<T = Record<string, any>> {
  states: {
    _data: Ref<T[]>
    _columns: Ref<Column[]>
    _checkList: Ref<boolean[]>
    _checkAll: Ref<boolean>
    _halfChecked: Ref<boolean>
  }
  insertColumn(column: Column): void
  removeColumn(column: Column): void
  getCheckedRows(): T[]
  sortData(field: string, direction: SortDirection): void
}

export function createStore<T>(dataSource: Ref<T[]>): TableStore<T> {
  const _data: Ref<T[]> = ref([]);
  const _columns: Ref<Column[]> = ref([]);
  const _checkList: Ref<boolean[]> = ref([]);
  const _checkAllRecord: Ref<boolean> = ref(false);
  const _checkAll: Ref<boolean> = computed({
    get: () => _checkAllRecord.value,
    set: (val: boolean) => {
      _checkAllRecord.value = val;
      // 只有在 set 的时候变更 _checkList 的数据
      for (let i = 0; i < _checkList.value.length; i++) {
        _checkList.value[i] = val;
      }
    }
  });
  const _halfChecked = ref(false);

  watch(dataSource, (value: T[]) => {
    _data.value = [...value];
    _checkList.value = new Array(value.length).fill(false);
  }, { deep: true, immediate: true });

  // checkList 只有全为true的时候
  watch(_checkList, (list) => {
    if (list.length === 0) {
      return;
    }
    let allTrue = true;
    let allFalse = true;
    for (let i = 0; i < list.length; i++) {
      allTrue &&= list[i];
      allFalse &&= !list[i];
    }

    _checkAllRecord.value = allTrue;
    _halfChecked.value = !(allFalse || allTrue);

  }, { immediate: true, deep: true });

  /**
   * 插入当前列
   * @param {Column} column 
   */
  const insertColumn = (column: Column) => {
    _columns.value.push(column);
  };

  /**
   * 移除当前列
   * @param {Column} column 
   * @returns 
   */
  const removeColumn = (column: Column) => {
    const i = _columns.value.findIndex((v) => v === column);
    if (i === -1) {
      return;
    }
    _columns.value.splice(i, 1);
  }

  /**
   * 获取当前已选数据
   * @returns {T[]}
   */
  const getCheckedRows = () => {
    return _data.value.filter((_, index) => _checkList.value[index]);
  }

  /**
   * 对数据进行排序
   * @param {string} field 
   * @param {SortDirection} direction 
   */
  const sortData = (field: string, direction: SortDirection) => {
    if (direction === 'ASC') {
      _data.value = _data.value.sort((a, b) => a[field] < b[field] ? 1 : -1);
    } else if (direction === 'DESC') {
      _data.value = _data.value.sort((a, b) => a[field] > b[field] ? 1 : -1);
    } else {
      _data.value = [...dataSource.value];
    }
  }

  return {
    states: {
      _data,
      _columns,
      _checkList,
      _checkAll,
      _halfChecked
    },
    insertColumn,
    removeColumn,
    getCheckedRows,
    sortData
  };
}