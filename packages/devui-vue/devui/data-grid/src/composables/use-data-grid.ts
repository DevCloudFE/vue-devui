import { toRefs, computed, watch, ref, nextTick, onMounted, onBeforeMount } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { useDataGridScroll } from './use-data-grid-scroll';
import { useColumnSort } from './use-column-sort';
import { useDataGridTree } from './use-data-grid-tree';
import { useDataGridColumnDrag } from './use-data-grid-drag';
import type { DataGridProps, InnerRowData, InnerColumnConfig, ScrollYParams, ScrollXParams } from '../data-grid-types';
import { ColumnType, RowHeightMap } from '../const';
import { calcEachColumnWidth } from '../utils';

export function useDataGrid(props: DataGridProps, ctx: SetupContext) {
  const { data, columns, size, virtualScroll } = toRefs(props);
  const scrollRef = ref<HTMLElement>();
  const headBoxRef = ref<HTMLElement>();
  const bodyContentWidth = ref(0);
  const bodyContentHeight = ref(0);
  const bodyScrollLeft = ref(0);
  const isTreeGrid = ref(false);
  const renderFixedLeftColumnData = ref<InnerColumnConfig[]>([]);
  const renderFixedRightColumnData = ref<InnerColumnConfig[]>([]);
  const renderRowData = ref<InnerRowData[]>([]);
  const renderColumnData = ref<InnerColumnConfig[]>([]);
  const sliceData = computed(() => data.value.slice());
  const sliceColumns = computed(() => columns.value.slice());
  const rowHeight = RowHeightMap[size.value];
  let tick = false;
  let resizeObserver: ResizeObserver;
  const scrollYParams: ScrollYParams = {
    distance: 0,
    renderCountPerScreen: 0,
    scrollScaleY: [0, 0],
    originRowData: [],
    defaultSortRowData: [],
  };
  const scrollXParams: ScrollXParams = {
    distance: 0,
    totalColumn: 0,
    bufferSize: 5,
    scrollViewWidth: 0,
    scrollScaleX: [0, 0],
    originColumnData: [],
  };
  const { translateX, translateY, virtualColumnData, virtualRowData, calcVirtualRowData, calcVirtualColumnData, resetVirtualRowData } =
    useDataGridScroll();
  const { sort, execSortMethod, addGridThContextToMap, clearAllSortState } = useColumnSort(scrollYParams, afterSort);
  const {
    allChecked,
    halfAllChecked,
    updateInnerRowsData,
    getShowRowsData,
    toggleRowExpansion,
    toggleAllRowExpansion,
    toggleRowChecked,
    toggleAllRowChecked,
    getCheckedRows,
  } = useDataGridTree(props, ctx, afterToggleExpandTree);
  const { afterColumnDragend } = useDataGridColumnDrag(
    bodyContentWidth,
    scrollRef,
    renderFixedLeftColumnData,
    renderFixedRightColumnData,
    renderColumnData
  );

  const initOriginRowData = () => {
    let bodyTotalHeight = 0;
    const rowsData = getShowRowsData();
    scrollYParams.originRowData = [];
    for (let i = 0; i < rowsData.length; i++) {
      const itemRow = rowsData[i];
      itemRow.height = rowHeight;
      itemRow.offsetTop = bodyTotalHeight;
      scrollYParams.originRowData.push(itemRow);
      bodyTotalHeight += rowHeight;
      if (!isTreeGrid.value) {
        isTreeGrid.value = !itemRow.isLeaf;
      }
    }
    if (!virtualScroll.value) {
      renderRowData.value = scrollYParams.originRowData;
    }
    scrollYParams.defaultSortRowData = scrollYParams.originRowData;
    bodyContentHeight.value = bodyTotalHeight;
  };
  const initVirtualRowData = (distance: number) => {
    scrollYParams.distance = distance;
    scrollYParams.renderCountPerScreen = Math.ceil(scrollRef.value!.clientHeight / rowHeight);
    scrollYParams.scrollScaleY = [distance, scrollYParams.renderCountPerScreen * rowHeight];
    calcVirtualRowData(scrollYParams);
  };

  const initOriginColumnData = () => {
    let bodyTotalWidth = 0;
    let columnId = 0;
    const scrollViewWidth = scrollRef.value?.clientWidth || 0;
    scrollXParams.totalColumn = columns.value.length;
    renderFixedLeftColumnData.value = [];
    renderFixedRightColumnData.value = [];
    scrollXParams.originColumnData = [];
    const columnsWithRealWidth = calcEachColumnWidth(columns.value, scrollViewWidth);
    for (let i = 0; i < scrollXParams.totalColumn; i++) {
      const itemColumn: InnerColumnConfig = {
        ...columnsWithRealWidth[i],
        offsetLeft: bodyTotalWidth,
        $columnId: `columnId-${columnId++}`,
      };
      const prevColumn = i > 0 ? columnsWithRealWidth[i - 1] : null;
      if (prevColumn) {
        if (prevColumn.type && ColumnType.includes(prevColumn.type) && !itemColumn.type) {
          itemColumn.$showExpandTreeIcon = true;
        }
      } else {
        if (!itemColumn.type) {
          itemColumn.$showExpandTreeIcon = true;
        }
      }

      if (itemColumn.fixed === 'left') {
        renderFixedLeftColumnData.value.push(itemColumn);
      } else if (itemColumn.fixed === 'right') {
        renderFixedRightColumnData.value.push(itemColumn);
      } else {
        scrollXParams.originColumnData.push(itemColumn);
      }
      bodyTotalWidth += itemColumn.width as number;
    }
    if (!virtualScroll.value) {
      renderColumnData.value = scrollXParams.originColumnData;
      translateX.value = renderColumnData.value[0]?.offsetLeft ?? 0;
    }
    bodyContentWidth.value = bodyTotalWidth;
  };
  const initVirtualColumnData = (distance = 0, scrollViewWidth: number) => {
    scrollXParams.distance = distance;
    scrollXParams.scrollViewWidth = scrollViewWidth;
    scrollXParams.scrollScaleX = [0, scrollRef.value!.clientWidth];
    calcVirtualColumnData(scrollXParams, false);
  };

  function afterSort() {
    scrollYParams.scrollScaleY = [0, 0];
    if (!virtualScroll.value) {
      renderRowData.value = scrollYParams.originRowData;
    } else {
      calcVirtualRowData(scrollYParams);
    }
  }

  function afterToggleExpandTree() {
    initOriginRowData();
    scrollYParams.scrollScaleY = [0, 0];
    virtualScroll.value && calcVirtualRowData(scrollYParams);
  }

  function refreshRowsData() {
    let distance = 0;
    updateInnerRowsData();
    initOriginRowData();
    nextTick(() => {
      if (virtualScroll.value && scrollRef.value && scrollYParams.originRowData.length) {
        const scrollTop = scrollRef.value.scrollTop;
        distance = scrollTop > scrollYParams.originRowData[scrollYParams.originRowData.length - 1].offsetTop! ? 0 : scrollTop;
        initVirtualRowData(distance);
      } else {
        resetVirtualRowData();
      }
    });
  }

  watch(
    sliceData,
    () => {
      refreshRowsData();
    },
    { immediate: true }
  );
  watch(
    sliceColumns,
    () => {
      if (!sliceColumns.value.length) {
        renderColumnData.value = [];
        return;
      }
      let distance = 0;
      nextTick(() => {
        initOriginColumnData();
        if (virtualScroll.value && scrollRef.value) {
          distance = scrollRef.value.scrollLeft;
          initVirtualColumnData(distance, scrollRef.value.clientWidth);
        }
      });
    },
    { immediate: true }
  );

  watch(
    virtualRowData,
    (val: InnerRowData[]) => {
      if (virtualScroll.value) {
        renderRowData.value = val;
      }
    },
    { immediate: true }
  );

  watch(
    virtualColumnData,
    (val: InnerColumnConfig[]) => {
      if (virtualScroll.value) {
        renderColumnData.value = val;
      }
    },
    { immediate: true }
  );

  const onScroll = (e: Event) => {
    if (tick) {
      return;
    }
    tick = true;
    requestAnimationFrame(() => {
      tick = false;
    });
    const scrollLeft = (e.target as HTMLElement).scrollLeft;
    const scrollTop = (e.target as HTMLElement).scrollTop;
    if (scrollLeft !== scrollXParams.distance) {
      headBoxRef.value && (headBoxRef.value.scrollLeft = scrollLeft);
      bodyScrollLeft.value = scrollLeft;
      if (scrollXParams.originColumnData.length === 0) {
        return;
      }
      scrollXParams.distance = scrollLeft;
      virtualScroll.value && calcVirtualColumnData(scrollXParams);
    } else if (scrollTop !== scrollYParams.distance) {
      if (scrollYParams.originRowData.length === 0) {
        return;
      }
      scrollYParams.distance = scrollTop;
      virtualScroll.value && calcVirtualRowData(scrollYParams);
    }
  };

  onMounted(() => {
    scrollRef.value?.addEventListener('scroll', onScroll);
    if (typeof window !== 'undefined' && scrollRef.value) {
      resizeObserver = new ResizeObserver(() => {
        if (scrollRef.value) {
          let distance = 0;
          initOriginColumnData();
          distance = scrollRef.value!.scrollLeft;
          virtualScroll.value && initVirtualColumnData(distance, scrollRef.value!.clientWidth);
        }
      });
      resizeObserver.observe(scrollRef.value);
    }
  });

  onBeforeMount(() => {
    resizeObserver?.disconnect();
  });

  return {
    scrollRef,
    headBoxRef,
    bodyScrollLeft,
    bodyContentHeight,
    bodyContentWidth,
    translateX,
    translateY,
    renderFixedLeftColumnData,
    renderFixedRightColumnData,
    renderColumnData,
    renderRowData,
    isTreeGrid,
    allChecked,
    halfAllChecked,
    sort,
    getCheckedRows,
    execSortMethod,
    addGridThContextToMap,
    clearAllSortState,
    toggleRowExpansion,
    toggleAllRowExpansion,
    toggleRowChecked,
    toggleAllRowChecked,
    afterColumnDragend,
    refreshRowsData,
  };
}

export function useDataGridStyle(props: DataGridProps, scrollRef: Ref<HTMLElement | undefined>) {
  const ns = useNamespace('data-grid');
  const { striped, rowHoveredHighlight, fixHeader, headerBg, borderType, shadowType, virtualScroll } = toRefs(props);
  const scrollPosition = ref('left');
  const sliceColumns = computed(() => props.columns.slice());

  const gridClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m('fix-header')]: fixHeader.value,
    [ns.m('striped')]: striped.value,
    [ns.m('row-hover-highlight')]: rowHoveredHighlight.value,
    [ns.m('header-bg')]: headerBg.value,
    [ns.m(borderType.value)]: Boolean(borderType.value),
    [ns.m(shadowType.value)]: Boolean(shadowType.value),
    [ns.m('is-virtual')]: Boolean(virtualScroll.value),
    [ns.m(`scroll-${scrollPosition.value}`)]: Boolean(scrollPosition.value),
  }));

  const onScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const scrollLeft = target.scrollLeft;
    if (scrollLeft === 0) {
      if (target.clientWidth === target.scrollWidth) {
        scrollPosition.value = '';
      } else {
        scrollPosition.value = 'left';
      }
    } else if (scrollLeft + target.clientWidth === target.scrollWidth) {
      scrollPosition.value = 'right';
    } else {
      scrollPosition.value = 'middle';
    }
  };

  const initScrollPosition = () => {
    scrollPosition.value = scrollRef.value!.clientWidth === scrollRef.value!.clientWidth ? '' : 'left';
  };

  watch(
    sliceColumns,
    () => {
      if (scrollRef.value) {
        // 等待列渲染完成再判断是否有滚动条
        setTimeout(initScrollPosition);
      }
    },
    { flush: 'post' }
  );

  onMounted(() => {
    if (scrollRef.value) {
      scrollRef.value.addEventListener('scroll', onScroll);
      // 等待列渲染完成再判断是否有滚动条
      setTimeout(initScrollPosition);
    }
  });

  return { gridClasses };
}
