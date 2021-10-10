import {
  defineComponent,
  ref,
  watch,
  nextTick,
  reactive,
  computed,
  withDirectives,
  onMounted,
  inject,
} from 'vue'
import type { SplitterStore } from './splitter-store'
import { setStyle } from '../../shared/util/set-style'
import { addClass, removeClass } from '../../shared/util/class'
import dresize, { ResizeDirectiveProp } from './util/d-resize-directive'
import './splitter-bar.scss'
import { splitterBarProps, SplitterBarProps } from './splitter-bar-type'

export default defineComponent({
  name: 'DSplitterBar',
  props: splitterBarProps,
  setup(props: SplitterBarProps) {
    const store: SplitterStore = inject('splitterStore')
    const state = reactive({
      wrapperClass: `devui-splitter-bar devui-splitter-bar-${props.orientation}`,
    })
    const domRef = ref<null | HTMLElement>()
    onMounted(() => {
      watch([() => props.splitBarSize, domRef], ([curSplitBarSize, ele]) => {
        if (!(ele instanceof HTMLElement)) {
          return;
        }
        setStyle(ele, { flexBasis: curSplitBarSize })
      }, { immediate: true })

      watch([() => store.state.panes, domRef], ([panes, ele]) => {
        if (!store.isStaticBar(props.index)) {
          state.wrapperClass += ' resizable'
        } else {
          setStyle(ele, { flexBasis: props.disabledBarSize })
        }
      }, { deep: true })
    })

    // 指令输入值
    const coordinate = { pageX: 0, pageY: 0, originalX: 0, originalY: 0 }
    let initState
    // TODO 待优化，如何像 angular rxjs 操作一样优雅
    const resizeProp: ResizeDirectiveProp = {
      enableResize: true,
      onPressEvent: function ({ originalEvent }): void {
        originalEvent.stopPropagation() // 按下的时候，阻止事件冒泡
        if (!store.isResizable(props.index)) return
        initState = store.dragState(props.index)
        coordinate.originalX = originalEvent.pageX
        coordinate.originalY = originalEvent.pageY
      },
      onDragEvent: function ({ originalEvent }): void {
        originalEvent.stopPropagation() // 移动的时候，阻止事件冒泡
        if (!store.isResizable(props.index)) return
        coordinate.pageX = originalEvent.pageX
        coordinate.pageY = originalEvent.pageY
        let distance
        if (props.orientation === 'vertical') {
          distance = coordinate.pageY - coordinate.originalY
        } else {
          distance = coordinate.pageX - coordinate.originalX
        }
        store.setSize(initState, distance)
      },
      onReleaseEvent: function ({ originalEvent }): void {
        originalEvent.stopPropagation() // 释放的时候，阻止事件冒泡
        if (!store.isResizable(props.index)) return
        coordinate.pageX = originalEvent.pageX
        coordinate.pageY = originalEvent.pageY
        let distance
        if (props.orientation === 'vertical') {
          distance = coordinate.pageY - coordinate.originalY
        } else {
          distance = coordinate.pageX - coordinate.originalX
        }
        store.setSize(initState, distance)
      },
    }

    const queryPanes = (index, nearIndex) => {
      const pane = store.getPane(index)
      const nearPane = store.getPane(nearIndex)
      return {
        pane,
        nearPane,
      }
    }

    // 根据当前状态生成收起按钮样式
    const generateCollapseClass = (pane, nearPane, showIcon) => {
      // 是否允许收起
      const isCollapsible = pane?.component?.props?.collapsible && showIcon
      // 当前收起状态
      const isCollapsed = pane?.component?.props?.collapsed
      // 一个 pane 收起的时候，隐藏相邻 pane 的收起按钮
      const isNearPaneCollapsed = nearPane.collapsed
      return {
        'devui-collapse': isCollapsible,
        collapsed: isCollapsed,
        hidden: isNearPaneCollapsed,
      }
    }

    // 计算前面板收起操作样式
    const prevClass = computed(() => {
      const { pane, nearPane } = queryPanes(props.index, props.index + 1)
      // TODO 提示文字

      // 第一个面板或者其它面板折叠方向不是向后的， 显示操作按钮
      const showIcon =
        pane?.component?.props?.collapseDirection !== 'after' ||
        props.index === 0
      return generateCollapseClass(pane, nearPane, showIcon)
    })

    // 计算相邻面板收起操作样式
    const nextClass = computed(() => {
      const { pane, nearPane } = queryPanes(props.index + 1, props.index)
      // TODO 提示文字

      // 最后一个面板或者其它面板折叠方向不是向前的显示操作按钮
      const showIcon =
        pane?.component?.props?.collapseDirection !== 'before' ||
        props.index + 1 === store.state.paneCount - 1
      return generateCollapseClass(pane, nearPane, showIcon)
    })

    // 切换是否允许拖拽，收起时不能拖拽
    const toggleResize = () => {
      const { pane, nearPane } = queryPanes(props.index, props.index + 1)
      const isCollapsed =
        pane?.component?.props?.collapsed ||
        nearPane?.component?.props?.collapsed
      if (isCollapsed) {
        addClass(domRef.value, 'none-resizable')
      } else {
        removeClass(domRef.value, 'none-resizable')
      }
    }

    const handleCollapsePrePane = (lockStatus?: boolean) => {
      store.tooglePane(props.index, props.index + 1, lockStatus)
      toggleResize()
    }

    const handleCollapseNextPane = (lockStatus?: boolean) => {
      store.tooglePane(props.index + 1, props.index, lockStatus)
      toggleResize()
    }

    const initialCollapseStatus = () => {
      handleCollapsePrePane(true)
      handleCollapseNextPane(true)
    }

    onMounted(() => {
      initialCollapseStatus()
    })

    return () => {
      return withDirectives(
        <div class={state.wrapperClass} ref={domRef}>
          {props.showCollapseButton ? (
            <div
              class={['prev', prevClass.value]}
              onClick={() => {
                handleCollapsePrePane()
              }}
            ></div>
          ) : null}
          <div class="devui-resize-handle"></div>
          {props.showCollapseButton ? (
            <div
              class={['next', nextClass.value]}
              onClick={() => handleCollapseNextPane()}
            ></div>
          ) : null}
        </div>,
        [[dresize, resizeProp]]
      )
    }
  },
})
