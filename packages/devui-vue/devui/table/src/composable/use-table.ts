import { computed, ComputedRef, CSSProperties, Ref, ToRefs } from 'vue';
import { Column } from '../components/column/column-types';
import { TablePropsTypes } from '../table-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

interface TableConfig {
  classes: ComputedRef<Record<string, boolean>>;
  style: ComputedRef<CSSProperties>;
}

export function useTable(props: TablePropsTypes): TableConfig {
  const ns = useNamespace('table');
  const classes = computed(() => ({
    [ns.e('view')]: true,
    [ns.m('striped')]: props.striped,
    [ns.m('header-bg')]: props.headerBg,
    [ns.m('layout-auto')]: props.tableLayout === 'auto',
    [ns.m(`${props.size}`)]: true,
    [ns.m(`${props.borderType}`)]: props.borderType,
  }));
  const style: ComputedRef<CSSProperties> = computed(() => ({
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    height: props.tableHeight,
    width: props.tableWidth,
  }));
  return { classes, style };
}

export const useFixedColumn = (column: Ref<Column>): ToRefs<{ stickyCell: string; offsetStyle: string }> => {
  const ns = useNamespace('table');
  const stickyCell = computed(() => {
    const col = column.value;
    if (col.fixedLeft) {
      return `${ns.m('sticky-cell')} left`;
    }

    if (col.fixedRight) {
      return `${ns.m('sticky-cell')} right`;
    }
    return undefined;
  });

  const offsetStyle = computed(() => {
    const col = column.value;
    if (col.fixedLeft) {
      return `left:${col.fixedLeft}`;
    }

    if (col.fixedRight) {
      return `right:${col.fixedRight}`;
    }

    return undefined;
  });

  return {
    stickyCell,
    offsetStyle,
  };
};
