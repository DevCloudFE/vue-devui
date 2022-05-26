import { computed, ref } from 'vue';
import type { ComputedRef, CSSProperties, Ref } from 'vue';
import { Column } from '../components/column/column-types';
import { Table, DefaultRow, TablePropsTypes, UseTable, UseFixedColumn, UseTableLayout } from '../table-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useTable(props: TablePropsTypes, tableWidth: Ref): UseTable {
  const ns = useNamespace('table');
  const classes = computed(() => ({
    [ns.e('view')]: true,
    [ns.m('striped')]: props.striped,
    [ns.m('header-bg')]: props.headerBg,
    [ns.m('layout-auto')]: props.tableLayout === 'auto',
    [ns.m(`${props.size}`)]: true,
    [ns.m(`${props.borderType}`)]: Boolean(props.borderType),
  }));
  const styles: ComputedRef<CSSProperties> = computed(() => ({
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    height: props.tableHeight,
    width: tableWidth.value ? `${tableWidth.value}px` : props.tableWidth,
  }));
  return { classes, styles };
}

export const useFixedColumn = (column: Ref<Column>): UseFixedColumn => {
  const ns = useNamespace('table');
  const stickyClass = computed(() => ({
    [ns.e('checkable-cell')]: column.value.type === 'checkable',
    [ns.m('sticky-cell')]: Boolean(column.value.fixedLeft) || Boolean(column.value.fixedRight),
    left: Boolean(column.value.fixedLeft),
    right: Boolean(column.value.fixedRight),
    [`is-${column.value.align}`]: true,
  }));

  const stickyStyle = computed(() => ({
    left: column.value.fixedLeft,
    right: column.value.fixedRight,
  }));

  return { stickyClass, stickyStyle };
};

export function useTableLayout(table: Table<DefaultRow>): UseTableLayout {
  const tableWidth = ref();

  const updateColgroupWidth = () => {
    const cols = table?.vnode?.el?.querySelectorAll('colgroup > col') || [];
    if (!cols.length) {
      return;
    }
    const flatColumns = table.store.states.flatColumns;
    const columnMap: Record<string, any> = {};
    flatColumns.value.forEach((column: Column) => {
      columnMap[column.id] = column;
    });
    for (let i = 0, len = cols.length; i < len; i++) {
      const col = cols[i];
      const columnId = col.getAttribute('column-id');
      const column = columnMap[columnId];
      if (column) {
        col.setAttribute('width', column.realWidth);
      }
    }
  };

  const updateColumnWidth = () => {
    const tableClientWidth = table?.vnode?.el?.clientWidth;
    let tableMinWidth = 0;

    const flatColumns = table.store.states.flatColumns;
    const flexColumns = flatColumns.value.filter((column) => typeof column.width !== 'number');
    if (flexColumns.length) {
      flatColumns.value.forEach((column) => {
        tableMinWidth += Number(column.width || 80);
      });
      if (tableMinWidth <= tableClientWidth) {
        const totalFlexWidth = tableClientWidth - tableMinWidth;
        if (flexColumns.length === 1) {
          flexColumns[0].realWidth = Number(flexColumns[0].width || 80) + totalFlexWidth;
        } else {
          const allFlexColumnWidth = flexColumns.reduce((pre, column) => pre + Number(column.width || 80), 0);
          const flexWidthPercent = totalFlexWidth / allFlexColumnWidth;
          let exceptFistWidth = 0;
          flexColumns.forEach((column, index) => {
            if (index === 0) {
              return;
            }
            const perFlexWidth = Math.floor(Number(column.width || 80) * flexWidthPercent);
            exceptFistWidth += perFlexWidth;
            column.realWidth = Number(column.width || 80) + perFlexWidth;
          });
          flexColumns[0].realWidth = Number(flexColumns[0].width || 80) + totalFlexWidth - exceptFistWidth;
        }
      } else {
        flexColumns.forEach((column) => {
          column.realWidth = Number(column.width || 80);
        });
      }
      tableWidth.value = Math.max(tableMinWidth, tableClientWidth);
    } else {
      flatColumns.value.forEach((column) => {
        column.realWidth = column.width || 80;
        tableMinWidth += Number(column.realWidth);
      });
      tableWidth.value = tableMinWidth;
    }
    updateColgroupWidth();
  };

  return { tableWidth, updateColumnWidth };
}
