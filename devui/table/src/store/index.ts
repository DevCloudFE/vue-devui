import { watch, Ref, ref, computed } from 'vue';
import { Column } from '../column/column.type';

export interface TableStore<T = Record<string, any>> {
  states: {
    _data: Ref<T[]>
    _columns: Ref<Column[]>
    _checkAll: Ref<boolean>
    _checkList: Ref<boolean[]>
  }
  insertColumn(column: Column): void
  removeColumn(column: Column): void
  getCheckedRows(): T[]
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
    for (let i = 0; i < list.length; i++) {
      if (!list[i]) {
        allTrue = false;
        break;
      }
    }
    if (_checkAllRecord.value !== allTrue) {
      _checkAllRecord.value = allTrue;
    }
  }, { immediate: true, deep: true });

  const insertColumn = (column: Column) => {
    _columns.value.push(column);
  };

  const removeColumn = (column: Column) => {
    const i = _columns.value.findIndex((v) => v === column);
    if (i === -1) {
      return;
    }
    _columns.value.splice(i, 1);
  }

  const getCheckedRows = () => {
    return _data.value.filter((_, index) => _checkList.value[index]);
  }

  return {
    states: {
      _data,
      _columns,
      _checkList,
      _checkAll
    },
    insertColumn,
    removeColumn,
    getCheckedRows
  };
}