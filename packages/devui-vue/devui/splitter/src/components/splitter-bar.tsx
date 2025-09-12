import { defineComponent, ref, watch, reactive, computed, withDirectives, onMounted, inject, getCurrentInstance } from 'vue';

import DToolTip from '../../../tooltip/src/tooltip';
import { setStyle } from '../../../shared/utils/set-style';
import { addClass, removeClass } from '../../../shared/utils/class';
import dresize, { ResizeDirectiveProp } from '../d-resize-directive';
import type { SplitterStore, DragState, SplitterPane } from '../splitter-store';
import { splitterBarProps, SplitterBarProps } from './splitter-bar-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { isHTMLElement } from '../../../shared/utils';
import './splitter-bar.scss';
import { createI18nTranslate } from '../../../locale/create';

export default defineComponent({
  name: 'DSplitterBar',
  components: {
    DToolTip,
  },
  props: splitterBarProps,
  setup(props: SplitterBarProps) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DSplitterBar', app);

    const ns = useNamespace('splitter');
    const store = inject<SplitterStore>('splitterStore');
    const state = reactive({
      wrapperClass: `${ns.e('bar')} ${ns.em('bar', props.orientation)} `,
    });
    const domRef = ref<null | HTMLElement>();

    watch(
      [() => props.splitBarSize, domRef],
      ([curSplitBarSize, ele]) => {
        if (!isHTMLElement(ele)) {
          return;
        }
        setStyle(ele, { flexBasis: curSplitBarSize });
      },
      { immediate: true }
    );

    watch(
      [() => store?.state.panes, domRef],
      ([, ele]) => {
        if (!store || !props || props.index === undefined) {
          return;
        }
        if (!store.isStaticBar(props.index)) {
          state.wrapperClass += ' resizable';
        } else if (ele) {
          setStyle(ele, { flexBasis: props.disabledBarSize });
        }
      },
      { deep: true }
    );

    const queryPanes = (index: number, nearIndex: number) => {
      if (!store) {
        return {};
      }
      const pane = store.getPane(index);
      const nearPane = store.getPane(nearIndex);
      return {
        pane,
        nearPane,
      };
    };

    // 根据当前状态生成收起按钮样式
    const generateCollapseClass = (pane: SplitterPane | undefined, nearPane: SplitterPane | undefined, showIcon: boolean) => {
      // 是否允许收起
      const isCollapsible = pane?.component?.props?.collapsible && showIcon;
      // 当前收起状态
      const isCollapsed = pane?.component?.props?.collapsed;
      // 一个 pane 收起的时候，隐藏相邻 pane 的收起按钮
      const isNearPaneCollapsed = nearPane?.collapsed;
      return {
        [ns.e('collapse')]: isCollapsible,
        collapsed: isCollapsed,
        hidden: isNearPaneCollapsed,
      };
    };

    // 计算前面板收起操作样式
    const prevClass = computed(() => {
      if (!props || props.index === undefined) {
        return {};
      }
      const { pane, nearPane } = queryPanes(props.index, props.index + 1);
      // 第一个面板或者其它面板折叠方向不是向后的， 显示操作按钮
      const showIcon = pane?.component?.props?.collapseDirection !== 'after' || props.index === 0;
      return generateCollapseClass(pane, nearPane, showIcon);
    });

    // 计算相邻面板收起操作样式
    const nextClass = computed(() => {
      if (!store || !props || props.index === undefined) {
        return {};
      }
      const { pane, nearPane } = queryPanes(props.index + 1, props.index);
      // 最后一个面板或者其它面板折叠方向不是向前的显示操作按钮
      const showIcon = pane?.component?.props?.collapseDirection !== 'before' || props.index + 1 === store.state.paneCount - 1;
      return generateCollapseClass(pane, nearPane, showIcon);
    });

    // 切换是否允许拖拽，收起时不能拖拽
    const toggleResize = () => {
      if (!domRef.value || !props || props.index === undefined) {
        return;
      }
      const { pane, nearPane } = queryPanes(props.index, props.index + 1);
      const isCollapsed = pane?.component?.props?.collapsed || nearPane?.component?.props?.collapsed;
      if (isCollapsed) {
        addClass(domRef.value, 'none-resizable');
      } else {
        removeClass(domRef.value, 'none-resizable');
      }
    };

    const handleCollapsePrePane = (lockStatus?: boolean) => {
      if (!store || !props || props.index === undefined) {
        return;
      }
      store.tooglePane(props.index, props.index + 1, lockStatus);
      toggleResize();
    };

    const handleCollapseNextPane = (lockStatus?: boolean) => {
      if (!store || !props || props.index === undefined) {
        return;
      }
      store.tooglePane(props.index + 1, props.index, lockStatus);
      toggleResize();
    };

    const initialCollapseStatus = () => {
      handleCollapsePrePane(true);
      handleCollapseNextPane(true);
    };

    // 指令输入值
    const coordinate = {
      pageX: 0,
      pageY: 0,
      originalX: 0,
      originalY: 0,
    };
    let initState: DragState;
    // TODO 待优化，如何像 angular rxjs 操作一样优雅
    const resizeProp: ResizeDirectiveProp = {
      enableResize: true,
      onPressEvent: function ({ originalEvent }): void {
        originalEvent.stopPropagation(); // 按下的时候，阻止事件冒泡
        if (!store || !props || props.index === undefined) {
          return;
        }
        if (!store.isResizable(props.index)) {
          return;
        }
        initState = store.dragState(props.index);
        coordinate.originalX = originalEvent.pageX;
        coordinate.originalY = originalEvent.pageY;
      },
      onDragEvent: function ({ originalEvent }): void {
        originalEvent.stopPropagation(); // 移动的时候，阻止事件冒泡
        if (!store || !props || props.index === undefined) {
          return;
        }
        if (!store.isResizable(props.index)) {
          return;
        }
        coordinate.pageX = originalEvent.pageX;
        coordinate.pageY = originalEvent.pageY;
        let distance;
        if (props.orientation === 'vertical') {
          distance = coordinate.pageY - coordinate.originalY;
        } else {
          distance = coordinate.pageX - coordinate.originalX;
        }
        store.setSize(initState, distance);
      },
      onReleaseEvent: function ({ originalEvent }): void {
        originalEvent.stopPropagation(); // 释放的时候，阻止事件冒泡
        if (!store || !props || props.index === undefined) {
          return;
        }
        if (!store.isResizable(props.index)) {
          return;
        }
        coordinate.pageX = originalEvent.pageX;
        coordinate.pageY = originalEvent.pageY;
        let distance;
        if (props.orientation === 'vertical') {
          distance = coordinate.pageY - coordinate.originalY;
        } else {
          distance = coordinate.pageX - coordinate.originalX;
        }
        store.setSize(initState, distance);
      },
    };

    onMounted(() => {
      initialCollapseStatus();
    });

    const renderCollapsedTip = () => {
      if (!props || props.index === undefined) {
        return t('collapse');
      }
      const { pane, nearPane } = queryPanes(props.index, props.index + 1);
      const isCollapsed = pane?.component?.props?.collapsed || nearPane?.component?.props?.collapsed;
      return isCollapsed ? t('expand') : t('collapse');
    };

    return () => {
      return withDirectives(
        <div class={state.wrapperClass} ref={domRef}>
          {props.showCollapseButton && (
            <DToolTip content={renderCollapsedTip()}>
              <div
                class={['prev', prevClass.value]}
                onClick={() => {
                  handleCollapsePrePane();
                }}></div>
            </DToolTip>
          )}
          {props.showCollapseButton && (
            <DToolTip content={renderCollapsedTip()}>
              <div class={['next', nextClass.value]} onClick={() => handleCollapseNextPane()}></div>
            </DToolTip>
          )}
        </div>,
        [[dresize, resizeProp]]
      );
    };
  },
});
