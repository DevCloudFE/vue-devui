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
    [ns.m(`${props.borderType}`)]: Boolean(props.borderType),
  }));
  const style: ComputedRef<CSSProperties> = computed(() => ({
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    height: props.tableHeight,
    width: props.tableWidth,
  }));
  return { classes, style };
}

export const useFixedColumn = (
  column: Ref<Column>
): ToRefs<{ stickyClass: ComputedRef<Record<string, boolean>>; stickyStyle: ComputedRef<CSSProperties> }> => {
  const ns = useNamespace('table');
  const stickyClass = computed(() => ({
    [ns.e('checkable-cell')]: column.value.type === 'checkable',
    [ns.m('sticky-cell')]: Boolean(column.value.fixedLeft) || Boolean(column.value.fixedRight),
    [`is-${column.value.align}`]: true,
  }));

  const stickyStyle = computed(() => ({
    left: column.value.fixedLeft,
    right: column.value.fixedRight,
  }));

  return { stickyClass, stickyStyle };
};
