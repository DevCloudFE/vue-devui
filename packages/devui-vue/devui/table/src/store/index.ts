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

const createColumnGenerator = <T>() => {
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

  return { _columns, flatColumns, insertColumn, removeColumn, sortColumn, updateColumns };
};

const createSelection = <T>(dataSource: Ref<T[]>, trackBy: (item: T) => string) => {
  const _checkSet: Ref<Set<string>> = ref(new Set());

  const checkRow = (toggle: boolean, row: T) => {
    if (toggle) {
      _checkSet.value.add(trackBy(row));
    } else {
      _checkSet.value.delete(trackBy(row));
    }
  };

  const isRowChecked = (row: T) => {
    return _checkSet.value.has(trackBy(row));
  };

  const getCheckedRows = (): T[] => {
    return dataSource.value.filter((item) => isRowChecked(item));
  };

  const _checkAllRecord: Ref<boolean> = ref(false);
  const _checkAll: Ref<boolean> = computed({
    get: () => _checkAllRecord.value,
    set: (val: boolean) => {
      _checkAllRecord.value = val;
      dataSource.value.forEach((item) => {
        checkRow(val, item);
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
        const checked = isRowChecked(items[i]);
        allTrue &&= checked;
        allFalse &&= !checked;
      }

      _checkAllRecord.value = allTrue;
      _halfChecked.value = !(allFalse || allTrue);
    },
    { immediate: true, deep: true }
  );

  watch(dataSource, (value) => {
    _checkAllRecord.value = value.findIndex(item => !isRowChecked(item)) === -1;
  });

  return {
    _checkSet,
    _checkAll,
    _halfChecked,
    getCheckedRows,
    checkRow,
    isRowChecked
  };
};

const createSorter = <T>(dataSource: Ref<T[]>, _data: Ref<T[]>) => {
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
};

const createFixedLogic = (columns: Ref<Column[]>) => {
  const isFixedLeft = computed(() => {
    return columns.value.reduce((prev, current) => prev || !!current.fixedLeft, false);
  });

  return { isFixedLeft };
};

const createExpandRow = <T>(dataSource: Ref<T[]>, trackBy: (item: T) => string) => {
  const _expandedRows = ref(new Set());

  const isRowExpanded = (row: T): boolean => {
    return _expandedRows.value.has(trackBy(row));
  };

  const expandRow = (row: T): void => {
    _expandedRows.value.add(trackBy(row));
  };

  const collapseRow = (row: T): void => {
    _expandedRows.value.delete(trackBy(row));
  };

  const toggleRow = (row: T) => {
    if (isRowExpanded(row)) {
      collapseRow(row);
    } else {
      expandRow(row);
    }
  };

  const getExpandedRows = (): T[] => {
    return dataSource.value.filter((item) => isRowExpanded(item));
  };

  const expandAllRows = (): void => {
    dataSource.value.forEach(item => {
      expandRow(item);
    });
  };

  const collapseAllRows = (): void => {
    dataSource.value.forEach(item => {
      collapseRow(item);
    });
  };

  return {
    _expandedRows,
    toggleRow,
    expandRow,
    collapseRow,
    isRowExpanded,
    getExpandedRows,
    expandAllRows,
    collapseAllRows,
  };
};

export function createStore<T>(dataSource: Ref<T[]>, table: Table<DefaultRow>): TableStore<T> {
  const _data: Ref<T[]> = ref([]);
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
  const {
    _expandedRows,
    toggleRow,
    expandRow,
    collapseRow,
    isRowExpanded,
    getExpandedRows,
    expandAllRows,
    collapseAllRows,
  } = createExpandRow(dataSource, table.props.trackBy as (v: T) => string);

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
      _expandedRows,
    },
    insertColumn,
    sortColumn,
    removeColumn,
    updateColumns,
    getCheckedRows,
    sortData,
    isRowChecked,
    checkRow,

    toggleRow,
    expandRow,
    collapseRow,
    isRowExpanded,
    getExpandedRows,
    expandAllRows,
    collapseAllRows,
  };
}
