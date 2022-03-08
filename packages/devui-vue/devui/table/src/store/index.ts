import { watch, Ref, ref, computed } from 'vue';
import { Column, CompareFn, FilterResults } from '../column/column.type';
import { SortDirection } from '../table.type';
export interface TableStore<T = Record<string, any>> {
  states: {
    _data: Ref<T[]>;
    _columns: Ref<Column[]>;
    _checkList: Ref<boolean[]>;
    _checkAll: Ref<boolean>;
    _halfChecked: Ref<boolean>;
    isFixedLeft: Ref<boolean>;
  };
  insertColumn(column: Column): void;
  sortColumn(): void;
  removeColumn(column: Column): void;
  getCheckedRows(): T[];
  sortData(field: string, direction: SortDirection, compareFn: CompareFn<T>): void;
  filterData(field: string, results: FilterResults): void;
  resetFilterData(): void;
}

export function createStore<T>(dataSource: Ref<T[]>): TableStore<T> {
  const _data: Ref<T[]> = ref([]);
  watch(
    dataSource,
    (value: T[]) => {
      _data.value = [...value];
    },
    { deep: true, immediate: true }
  );

  const { _columns, insertColumn, removeColumn, sortColumn } = createColumnGenerator();
  const { _checkAll, _checkList, _halfChecked, getCheckedRows } = createSelection(dataSource, _data);
  const { sortData } = createSorter(dataSource, _data);
  const { filterData, resetFilterData } = createFilter(dataSource, _data);

  const { isFixedLeft } = createFixedLogic(_columns);

  return {
    states: {
      _data,
      _columns,
      _checkList,
      _checkAll,
      _halfChecked,
      isFixedLeft,
    },
    insertColumn,
    sortColumn,
    removeColumn,
    getCheckedRows,
    sortData,
    filterData,
    resetFilterData,
  };
}

/**
 * 列生成器
 * @returns
 */
const createColumnGenerator = () => {
  const _columns: Ref<Column[]> = ref([]);

  /**
   * 插入当前列
   * @param {Column} column
   */
  const insertColumn = (column: Column) => {
    _columns.value.push(column);
    // 实际上就是插入排序
    _columns.value.sort((a, b) => a.order - b.order);
  };

  /**
   * 对 column 进行排序
   */
  const sortColumn = () => {
    _columns.value.sort((a, b) => (a.order > b.order ? 1 : -1));
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
  };
  return { _columns, insertColumn, removeColumn, sortColumn };
};

/**
 * 选择功能
 * @param dataSource
 * @param _data
 * @returns
 */
const createSelection = <T>(dataSource: Ref<T[]>, _data: Ref<T[]>) => {
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
    },
  });
  const _halfChecked = ref(false);

  watch(
    dataSource,
    (value: T[]) => {
      _checkList.value = new Array(value.length).fill(false);
    },
    { deep: true, immediate: true }
  );

  // checkList 只有全为true的时候
  watch(
    _checkList,
    (list) => {
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
    },
    { immediate: true, deep: true }
  );

  /**
   * 获取当前已选数据
   * @returns {T[]}
   */
  const getCheckedRows = (): T[] => {
    return _data.value.filter((_, index) => _checkList.value[index]);
  };

  return {
    _checkList,
    _checkAll,
    _halfChecked,
    getCheckedRows,
  };
};

/**
 * 排序功能
 * @template T
 * @param dataSource
 * @param _data
 */
const createSorter = <T>(dataSource: Ref<T[]>, _data: Ref<T[]>) => {
  /**
   * 对数据进行排序
   * @param {string} field
   * @param {SortDirection} direction
   * @param {CompareFn<T>} compareFn
   */
  const sortData = (
    field: string,
    direction: SortDirection,
    compareFn: CompareFn<T> = (fieldKey: string, a: T, b: T) => a[fieldKey] > b[fieldKey]
  ) => {
    if (direction === 'ASC') {
      _data.value = _data.value.sort((a, b) => (compareFn(field, a, b) ? 1 : -1));
    } else if (direction === 'DESC') {
      _data.value = _data.value.sort((a, b) => (!compareFn(field, a, b) ? 1 : -1));
    } else {
      _data.value = [...dataSource.value];
    }
  };
  return { sortData };
};

/**
 * 过滤功能
 * @template T
 * @param dataSource
 * @param _data
 * @returns
 */
const createFilter = <T>(dataSource: Ref<T[]>, _data: Ref<T[]>) => {
  // 过滤数据所需要的
  const fieldSet = new Set<string>();
  /**
   * 过滤数据
   */
  const filterData = (field: string, results: FilterResults) => {
    fieldSet.add(field);
    const fields = [...fieldSet];
    _data.value = dataSource.value.filter((item) => {
      return fields.reduce<boolean>((prev, fieldKey) => {
        return prev && results.indexOf(item[fieldKey]) !== -1;
      }, true);
    });
  };
  /**
   * 重置数据为最开始的状态
   */
  const resetFilterData = () => {
    fieldSet.clear();
    _data.value = [...dataSource.value];
  };
  return { filterData, resetFilterData };
};

const createFixedLogic = (columns: Ref<Column[]>) => {
  const isFixedLeft = computed(() => {
    return columns.value.reduce((prev, current) => prev || !!current.fixedLeft, false);
  });

  return { isFixedLeft };
};
