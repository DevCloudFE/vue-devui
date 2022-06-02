import { watch, Ref, ref, computed, unref, ComponentInternalInstance } from 'vue';
import { Column, SortMethod, SortDirection } from '../components/column/column-types';
import { DefaultRow, Table } from '../table-types';
import { TableStore } from './store-types';


function replaceColumn(array: any[], column: any) {
  return array.map((item) => {
    if (item.id === column.id) {
      return column;
    } else if (item.children?.length) {
      item.children = replaceColumn(item.children, column);
    }
    return item;
  });
}

function doFlattenColumns(columns: any) {
  const result: any = [];
  columns.forEach((column: any) => {
    if (column.children) {
      // eslint-disable-next-line prefer-spread
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
}

function createColumnGenerator(this: void) {
  const _columns: Ref<Column[]> = ref([]);
  const flatColumns: Ref<Column[]> = ref([]);

  const sortColumn = () => {
    _columns.value.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const insertColumn = (column: Column, parent: any) => {
    const array = unref(_columns);
    let newColumns = [];
    if (!parent) {
      array.push(column);
      newColumns = array;
    } else {
      if (parent && !parent.children) {
        parent.children = [];
      }
      parent.children.push(column);
      newColumns = replaceColumn(array, parent);
    }
    sortColumn();
    _columns.value = newColumns;
  };

  const removeColumn = (column: Column) => {
    const i = _columns.value.findIndex((v) => v === column);
    if (i === -1) {
      return;
    }
    _columns.value.splice(i, 1);
  };

  const updateColumns = () => {
    flatColumns.value = [].concat(doFlattenColumns(_columns.value));
  };

  return {
    _columns,
    flatColumns,
    insertColumn,
    removeColumn,
    sortColumn,
    updateColumns
  };
}


function createSelection<T>(this: void, dataSource: Ref<T[]>, trackBy: (item: T, index: number) => string) {
  const _checkSet: Ref<Set<string>> = ref(new Set());

  const checkRow = (toggle: boolean, row: T, index: number) => {
    if (toggle) {
      _checkSet.value.add(trackBy(row, index));
    } else {
      _checkSet.value.delete(trackBy(row, index));
    }
  };

  const isRowChecked = (row: T, index: number) => {
    return _checkSet.value.has(trackBy(row, index));
  };

  const getCheckedRows = (): T[] => {
    return dataSource.value.filter((item, index) => isRowChecked(item, index));
  };

  const _checkAllRecord: Ref<boolean> = ref(false);
  const _checkAll: Ref<boolean> = computed({
    get: () => _checkAllRecord.value,
    set: (val: boolean) => {
      _checkAllRecord.value = val;
      dataSource.value.forEach((item, index) => {
        checkRow(val, item, index);
      });
    },
  });
  const _halfChecked = ref(false);

  watch(
    _checkSet,
    (set) => {
      if (set.size === 0) {
        return;
      }
      let allTrue = true;
      let allFalse = true;
      const items = dataSource.value;
      for (let i = 0; i < items.length; i++) {
        const checked = isRowChecked(items[i], i);
        allTrue &&= checked;
        allFalse &&= !checked;
      }

      _checkAllRecord.value = allTrue;
      _halfChecked.value = !(allFalse || allTrue);
    },
    { immediate: true, deep: true }
  );

  watch(dataSource, (value) => {
    _checkAllRecord.value = value.findIndex((item, index) => !isRowChecked(item, index)) === -1;
  });

  return {
    _checkSet,
    _checkAll,
    _halfChecked,
    getCheckedRows,
    checkRow,
    isRowChecked
  };
}

function createSorter<T>(this: void, dataSource: Ref<T[]>, _data: Ref<T[]>) {
  const sortData = (direction: SortDirection, sortMethod: SortMethod<T>) => {
    if (direction === 'ASC') {
      _data.value = _data.value.sort((a, b) => (sortMethod ? (sortMethod(a, b) ? 1 : -1) : 0));
    } else if (direction === 'DESC') {
      _data.value = _data.value.sort((a, b) => (sortMethod ? (sortMethod(a, b) ? -1 : 1) : 0));
    } else {
      _data.value = [...dataSource.value];
    }
  };

  const thList: ComponentInternalInstance[] = [];
  return { sortData, thList };
}

function createFixedLogic(this: void, columns: Ref<Column[]>) {
  const isFixedLeft = computed(() => {
    return columns.value.reduce((prev, current) => prev || !!current.fixedLeft, false);
  });

  return { isFixedLeft };
}


/**
 * 创建 TableStore
 * @param dataSource 数据源
 * @param table 表对象
 * @returns TableStore
 */
export function createStore<T>(dataSource: Ref<T[]>, table: Table<DefaultRow>): TableStore<T> {
  const _data: Ref<T[]> = ref([]);
  //
  watch(
    dataSource,
    (value: T[]) => {
      _data.value = [...value];
    },
    { deep: true, immediate: true }
  );

  const {
    _columns,
    flatColumns,
    insertColumn,
    removeColumn,
    sortColumn,
    updateColumns
  } = createColumnGenerator();

  const {
    _checkAll,
    _checkSet,
    _halfChecked,
    getCheckedRows,
    isRowChecked,
    checkRow
  } = createSelection(_data, table.props.trackBy as (v: T) => string);

  const { sortData, thList } = createSorter(dataSource, _data);

  const { isFixedLeft } = createFixedLogic(_columns);

  return {
    _table: table,
    states: {
      _data,
      _columns,
      flatColumns,
      _checkSet,
      _checkAll,
      _halfChecked,
      isFixedLeft,
      thList,
    },
    insertColumn,
    sortColumn,
    removeColumn,
    updateColumns,
    getCheckedRows,
    sortData,
    isRowChecked,
    checkRow
  };
}
