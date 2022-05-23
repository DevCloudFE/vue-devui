import { PropType, ExtractPropTypes, computed, ref, watchEffect, watch } from 'vue';
import type { SetupContext } from 'vue';
import { IItem, TKey, ICheckList } from '../transfer-types';

export const transferBodyProps = {
  height: {
    type: Number,
    default: 320
  },
  data: {
    type: Array as PropType<IItem[]>,
    default: () => []
  },
  defaultChecked: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  isSearch: {
    type: Boolean,
    default: false
  },
  queryString: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入关键词搜索'
  },
  isKeyupSearch: {
    type: Boolean,
    default: true
  },
  searching: {
    type: Function as PropType<(data: IItem[], keyword: TKey) => void>
  },
  isDrag: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function as PropType<(v: string[]) => void>,
    default: undefined
  },
  updateQueryString: {
    type: Function as PropType<(value: TKey) => void>,
    default: undefined
  },
  dragstart: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>
  },
  drop: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>
  },
  dragend: {
    type: Function as PropType<(event: DragEvent, item: IItem) => void>
  }
} as const;

export type TTransferBodyProps = ExtractPropTypes<typeof transferBodyProps>;

export const transferBodyState = (props: TTransferBodyProps, ctx: SetupContext) => {
  const bodyHeight = computed(() => `${props.height}px`);
  const query = ref('');
  const checkedListModels = ref<Array<ICheckList>>([]);
  const dragHighlight = ref<TKey | null>(null);
  const dragOverNodeKey = ref('');
  const dropPosition = ref<number | null>(null);
  const dragTimer = ref<number>(0);
  const dragRef = ref<HTMLElement | null>(null);

  /**
   * updateFilterQueryHandle: 更新搜索框modelValue
   * @param value 搜索框值
  */
  const updateFilterQueryHandle = (value: TKey) => {
    ctx.emit('updateQueryString', value);
  };
  /**
   * updateCheckedListModels: 更新穿梭框选中的model
   * @param idx 索引
   * @param value 值
  */
  const updateCheckedListModels = (idx: number, value: boolean): void => {
    checkedListModels.value[idx].checked = value;
    ctx.emit('change', checkedListModels.value.filter(item => item.checked).map(item => item.value));
  };
  /**
   * resetState: 重置状态
  */
  const resetState = () => {
    dragOverNodeKey.value = '';
    dropPosition.value = null;
    dragHighlight.value = null;
  };
  /**
   * calcDropPosition: 计算拖拽位置
   * @param event DragEvent
  */
  const calcDropPosition = (event: DragEvent): number => {
    const { clientY } = event;
    if (!dragRef.value) {
      return -1;
    }
    const { top, bottom, height } = (event.target as HTMLElement).getBoundingClientRect();// dragRef.value.getBoundingClientRect();
    const des = Math.max(height * 0.25, 2);

    if (clientY <= top + des) {
      return -1;
    }
    if (clientY >= bottom - des) {
      return 1;
    }
    return 0;
  };
  /**
   * dragstartHandle: 拖拽开始事件
   * @param event DragEvent
   * @param item 当前拖拽项
  */
  const dragstartHandle = (event: DragEvent, item: IItem,) => {
    event.stopPropagation();
    dragRef.value = event.target as HTMLElement;
    if (props.dragstart && typeof props.dragstart === 'function') {
      props.dragstart(event, item);
    }
  };
  /**
   * setCurrentDragItem: 设置当前拖拽值
   * @param event Event
   * @param item 当前拖拽项
   * @param reset 是否重置
  */
  const setCurrentDragItem = (event: Event, item: IItem, reset: boolean): void => {
    event.stopPropagation();
    dragHighlight.value = reset ? item.value : null;
    // dragRef.value = (event.target as HTMLElement).parentElement;
  };
  /**
   * setDragOverNodeKeyHandle: 设置经过的item
   * @param event DragEvent
   * @param item 当前经过item
  */
  const setDragOverNodeKeyHandle = (event: DragEvent, item: IItem) => {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(dragTimer.value);
    if (dragHighlight.value === item.value) {
      return;
    }
    const curDropPosition = calcDropPosition(event);
    dragTimer.value = window.setTimeout(() => {
      dragOverNodeKey.value = item.value;
      dropPosition.value = curDropPosition;
    }, 0);
  };
  /**
   * dragoverHandle: 拖拽经过事件处理函数
   * @param event DragEvent
   * @param item 当前经过item
  */
  const dragoverHandle = (event: DragEvent, item: IItem) => {
    event.preventDefault();
    event.stopPropagation();
    if (item.value === dragOverNodeKey.value) {
      const curDropPosition = calcDropPosition(event);
      if (curDropPosition === dropPosition.value) {
        return;
      }
      dropPosition.value = curDropPosition;
    }
  };
  /**
   * dragleaveHandle: 拖拽离开事件处理函数
   * @param event DragEvent
   * @param item 离开item
  */
  const dragleaveHandle = (event: DragEvent, item: IItem) => {
    event.stopPropagation();
  };
  /**
   * dropHandle: 拖拽放置事件处理函数
   * @param event DragEvent
   * @param item 放置的item
  */
  const dropHandle = (event: DragEvent, item: IItem) => {
    event.preventDefault();
    event.stopPropagation();
    if (props.drop && typeof props.drop === 'function') {
      props.drop(event, item);
    }
    ctx.emit('updateDataPosition', dragHighlight.value, item.value);
  };
  /**
   * dragendHandle: 拖拽完成事件处理函数
   * @param event DragEvent
   * @param item 放置的item
  */
  const dragendHandle = (event: DragEvent, item: IItem) => {
    event.stopPropagation();
    if (props.dragend && typeof props.dragend === 'function') {
      props.dragend(event, item);
    }
    resetState();
  };

  watchEffect(() => {
    const models: Array<ICheckList> = [];
    query.value = props.queryString;
    props.data.map(item => {
      models.push({
        value: item.value,
        checked: props.defaultChecked.includes(item.value)
      });
    });
    checkedListModels.value = models;
  });

  return {
    bodyHeight,
    query,
    checkedListModels,
    dragHighlight,
    dragOverNodeKey,
    dropPosition,
    dragTimer,
    dragRef,
    updateFilterQueryHandle,
    updateCheckedListModels,
    setCurrentDragItem,
    setDragOverNodeKeyHandle,
    dragoverHandle,
    dragleaveHandle,
    dropHandle,
    dragendHandle,
    dragstartHandle
  };
};


