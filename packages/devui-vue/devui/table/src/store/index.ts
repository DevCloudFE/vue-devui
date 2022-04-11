import { watch, Ref, ref, computed, unref, ComponentInternalInstance } from 'vue';
import { Column, SortMethod, FilterResults, SortDirection } from '../components/column/column-types';
import { TableStore } from './store-types';

function replaceColumn(array: any, column: any) {
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
    _columns.value.sort((a, b) => a.order - b.order);
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

const createSelection = <T>(dataSource: Ref<T[]>, _data: Ref<T[]>) => {
  const _checkList: Ref<boolean[]> = ref([]);
  const _checkAllRecord: Ref<boolean> = ref(false);
  const _checkAll: Ref<boolean> = computed({
    get: () => _checkAllRecord.value,
    set: (val: boolean) => {
      _checkAllRecord.value = val;
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

const createFilter = <T>(dataSource: Ref<T[]>, _data: Ref<T[]>) => {
  const fieldSet = new Set<string>();
  const filterData = (field: string, results: FilterResults) => {
    fieldSet.add(field);
    const fields = [...fieldSet];
    _data.value = dataSource.value.filter((item) => {
      return fields.reduce<boolean>((prev, fieldKey) => {
        return prev && results.indexOf(item[fieldKey]) !== -1;
      }, true);
    });
  };

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

export function createStore<T>(dataSource: Ref<T[]>): TableStore<T> {
  const _data: Ref<T[]> = ref([]);
  watch(
    dataSource,
    (value: T[]) => {
      _data.value = [...value];
    },
    { deep: true, immediate: true }
  );

  const { _columns, flatColumns, insertColumn, removeColumn, sortColumn, updateColumns } = createColumnGenerator();
  const { _checkAll, _checkList, _halfChecked, getCheckedRows } = createSelection(dataSource, _data);
  const { sortData, thList } = createSorter(dataSource, _data);
  const { filterData, resetFilterData } = createFilter(dataSource, _data);

  const { isFixedLeft } = createFixedLogic(_columns);

  return {
    states: {
      _data,
      _columns,
      flatColumns,
      _checkList,
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
    filterData,
    resetFilterData,
  };
}
