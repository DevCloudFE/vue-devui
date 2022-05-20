import { ref, Ref, computed, getCurrentInstance, inject, onMounted, unref } from 'vue';
import { Column, FilterConfig, SortDirection } from '../column/column-types';
import { TABLE_TOKEN } from '../../table-types';
import { UseSort, UseFilter } from './header-th-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

const ns = useNamespace('table', true);

export function useBaseRender(column: Ref<Column>) {
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

function handleWidth(width: string | number) {
  if (!width) {
    return;
  }
  if (typeof width === 'number') {
    return width;
  }
  if (width.includes('%')) {
    const tableElement = document.querySelector(ns.b());
    const tableWidth = tableElement?.clientWidth || 0;
    return (tableWidth * parseInt(width, 10)) / 100;
  }
  return parseInt(width.replace(/[^\d]+/, ''), 10);
}

function getFinalWidth(newWidth: number): number {
  return newWidth;
}

export function useDragColumnWidth(elementRef: Ref<HTMLElement>) {
  let initialWidth = 0;
  let mouseDownScreenX = 0;
  let nextElement: Element | null;
  let resizeBarElement: HTMLElement;
  let totalWidth = 0;
  const dragClass = ref('');
  const resizing = ref(false);
  const tableElement = document.querySelector(ns.b());

  const onMousemove = (e: MouseEvent) => {
    const movementX = e.clientX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;
    const finalWidth = getFinalWidth(newWidth);
    if (resizeBarElement) {
      resizeBarElement.style.left = `${finalWidth + elementRef.value.offsetLeft}px`;
    }
  };

  const onMouseup = (e: MouseEvent) => {
    const movementX = e.clientX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;
    const finalWidth = getFinalWidth(newWidth);
    resizing.value = false;
    tableElement?.classList.remove('table-selector');
    dragClass.value = '';
    tableElement?.removeChild(resizeBarElement);
    document.removeEventListener('mouseup', onMouseup);
    document.removeEventListener('mousemove', onMousemove);
  };

  const onMousedown = (e: MouseEvent) => {
    const isHandle = (e.target as HTMLElement).classList.contains('resize-handle');
    if (isHandle) {
      const initialOffset = elementRef.value.offsetLeft;
      initialWidth = elementRef.value.clientWidth;
      mouseDownScreenX = e.clientX;
      e.stopPropagation();
      nextElement = elementRef.value.nextElementSibling;
      resizing.value = true;
      totalWidth = nextElement ? initialWidth + nextElement.clientWidth : initialWidth;

      tableElement?.classList.add('table-selector');

      resizeBarElement = document.createElement('div');
      resizeBarElement.classList.add('resize-bar');
      if (tableElement) {
        resizeBarElement.style.display = 'block';
        resizeBarElement.style.left = initialOffset + initialWidth + 'px';
        tableElement.appendChild(resizeBarElement);
      }

      dragClass.value = 'hover-bg';

      document.addEventListener('mouseup', onMouseup);

      document.addEventListener('mousemove', onMousemove);
    }
  };

  return { resizing, dragClass, onMousedown };
}
