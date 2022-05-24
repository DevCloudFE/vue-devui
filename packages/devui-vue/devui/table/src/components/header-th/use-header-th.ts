import { ref, Ref, computed, getCurrentInstance, inject, onMounted } from 'vue';
import { Column, FilterConfig, SortDirection } from '../column/column-types';
import { TABLE_TOKEN } from '../../table-types';
import { UseSort, UseFilter, UseBaseRender, UseDragColumnWidth } from './header-th-types';

export function useBaseRender(column: Ref<Column>): UseBaseRender {
  const baseClass = computed(() => ({
    operable: column.value.filterable || column.value.sortable || column.value.resizeable,
    resizeable: column.value.resizeable,
  }));

  return { baseClass };
}

export function useSort(column: Ref<Column>): UseSort {
  const table = inject(TABLE_TOKEN);
  const store = table.store;
  const direction = ref<SortDirection>(column.value.sortDirection);
  const sortClass = computed(() => ({
    'sort-active': Boolean(direction.value),
  }));
  const thInstance = getCurrentInstance();
  thInstance && store.states.thList.push(thInstance);
  onMounted(() => {
    column.value.sortable && column.value.sortDirection && store.sortData?.(direction.value, column.value.sortMethod);
  });
  const execClearSortOrder = () => {
    store.states.thList.forEach((th) => {
      if (th !== thInstance) {
        th.exposed?.clearSortOrder?.();
      }
    });
  };

  const handleSort = (val: SortDirection) => {
    direction.value = val;
    execClearSortOrder();
    store.sortData?.(direction.value, column.value.sortMethod);
    table.emit('sort-change', { field: column.value.field, direction: direction.value });
  };

  const clearSortOrder = () => {
    direction.value = '';
  };

  return { direction, sortClass, handleSort, clearSortOrder };
}

export function useFilter(column: Ref<Column>): UseFilter {
  const filter: Ref<FilterConfig | FilterConfig[] | null> = ref(null);
  const filterClass = computed(() => ({
    'filter-active': Boolean(filter.value || (Array.isArray(filter.value) && filter.value.length)),
  }));
  const handleFilter = (val: FilterConfig | FilterConfig[]) => {
    filter.value = val;
    column.value.ctx.emit('filter-change', val);
  };

  return { filterClass, handleFilter };
}

function handleWidth(width: string | number): number | undefined {
  if (!width) {
    return;
  }
  if (typeof width === 'number') {
    return width;
  }
  return parseInt(width, 10);
}

function getFinalWidth(newWidth: number, minWidth: string | number, maxWidth: string | number): number {
  const realMinWidth = handleWidth(minWidth);
  const realMaxWidth = handleWidth(maxWidth);

  const overMinWidth = !realMinWidth || newWidth >= realMinWidth;
  const underMaxWidth = !realMaxWidth || newWidth <= realMaxWidth;

  const finalWidth = !overMinWidth ? realMinWidth : !underMaxWidth ? realMaxWidth : newWidth;
  return finalWidth;
}

export function useDragColumnWidth(elementRef: Ref<HTMLElement>, column: Ref<Column>): UseDragColumnWidth {
  let initialWidth = 0;
  let mouseDownScreenX = 0;
  let resizeBarElement: HTMLElement;
  const table = inject(TABLE_TOKEN);
  const dragClass = ref('');
  const resizing = ref(false);
  const tableElement = table.tableRef;

  const onMousemove = (e: MouseEvent) => {
    const movementX = e.clientX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;
    const finalWidth = getFinalWidth(newWidth, column.value.minWidth, column.value.maxWidth);
    if (resizeBarElement) {
      resizeBarElement.style.left = `${finalWidth + elementRef.value.offsetLeft}px`;
    }
    column.value.ctx.emit('resizing', { width: finalWidth });
  };

  const onMouseup = (e: MouseEvent) => {
    const movementX = e.clientX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;
    const finalWidth = getFinalWidth(newWidth, column.value.minWidth, column.value.maxWidth);
    column.value.width = finalWidth;
    column.value.realWidth = finalWidth;
    table.updateColumnWidth();
    resizing.value = false;
    tableElement?.value.classList.remove('table-selector');
    dragClass.value = '';
    tableElement?.value.removeChild(resizeBarElement);
    column.value.ctx.emit('resize-end', { width: finalWidth, beforeWidth: initialWidth });
    document.removeEventListener('mouseup', onMouseup);
    document.removeEventListener('mousemove', onMousemove);
  };

  const onMousedown = (e: MouseEvent) => {
    const isHandle = (e.target as HTMLElement).classList.contains('resize-handle');
    if (isHandle) {
      column.value.ctx.emit('resize-start');
      const initialOffset = elementRef.value.offsetLeft;
      initialWidth = elementRef.value.clientWidth;
      mouseDownScreenX = e.clientX;
      e.stopPropagation();
      resizing.value = true;

      tableElement?.value.classList.add('table-selector');

      resizeBarElement = document.createElement('div');
      resizeBarElement.classList.add('resize-bar');
      if (tableElement.value) {
        resizeBarElement.style.display = 'block';
        resizeBarElement.style.left = initialOffset + initialWidth + 'px';
        tableElement.value.appendChild(resizeBarElement);
      }

      dragClass.value = 'hover-bg';

      document.addEventListener('mouseup', onMouseup);

      document.addEventListener('mousemove', onMousemove);
    }
  };

  return { resizing, dragClass, onMousedown };
}
