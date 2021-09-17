import {
  defineComponent,
  ref,
  watch,
  nextTick,
  inject,
  onMounted,
  onUpdated,
} from 'vue'
import {
  addClass,
  hasClass,
  removeClass,
} from '../../shared/util/class'
import { setStyle } from '../../shared/util/set-style'
import { useSplitterStore } from './splitter-store'
import './splitter-pane.scss'
import { splitterPaneProps, SplitterPaneProps } from './splitter-pane-type'

export default defineComponent({
  name: 'DSplitterPane',
  props: splitterPaneProps,
  emits: ['sizeChange', 'collapsedChange'],
  setup(props: SplitterPaneProps, { slots, expose, emit }) {
    const { setPanes } = useSplitterStore()

    const domRef = ref<null | HTMLElement>()
    watch(
      () => props.order,
      (order) => {
        nextTick(() => {
          const ele = domRef.value
          setStyle(ele, { order })
        })
      },
      { immediate: true }
    )

    // pane 初始化大小
    const setSizeStyle = (curSize) => {
      const ele = domRef.value
      ele.style.flexBasis = curSize
      const paneFixedClass = 'devui-splitter-pane-fixed'
      if (curSize) {
        // 设置 flex-grow 和 flex-shrink
        addClass(ele, paneFixedClass)
      } else {
        removeClass(ele, paneFixedClass)
      }
    }

    watch(
      () => props.size,
      (newSize) => {
        nextTick(() => {
          setSizeStyle(newSize)
        })
      },
      { immediate: true }
    )

    const panes = inject('panes')
    const orientation = inject('orientation')
    let initialSize = '' // 记录初始化挂载传入的大小
    onMounted(() => {
      initialSize = props.size
      setPanes({ panes })
    })

    onUpdated(() => {
      setPanes({ panes })
    })

    // 获取当前 pane大小
    const getPaneSize = (): number => {
      const el = domRef?.value
      if (orientation === 'vertical') {
        return el.offsetHeight
      } else {
        return el.offsetWidth
      }
    }

    const toggleCollapseClass = () => {
      const paneHiddenClass = 'devui-splitter-pane-hidden'
      nextTick(() => {
        const el = domRef.value
        if (!props.collapsed) {
          removeClass(el, paneHiddenClass)
        } else {
          addClass(el, paneHiddenClass)
        }

        if (props.collapsed && props.shrink) {
          removeClass(el, paneHiddenClass)
          setStyle(el, { flexBasis: `${props.shrinkWidth}px` })
        } else {
          setStyle(el, { flexBasis: initialSize })
        }
      })
    }
    watch(
      () => props.collapsed,
      () => {
        nextTick(() => {
          toggleCollapseClass()
        })
      }
    )

    // 收起时用于改变相邻 pane 的 flex-grow 属性来改变非自适应 pane 的 size
    const toggleNearPaneFlexGrow = (collapsed) => {
      nextTick(() => {
        const flexGrowClass = 'devui-splitter-pane-grow'
        if (hasClass(domRef.value, flexGrowClass)) {
          removeClass(domRef.value, flexGrowClass)
        } else if (collapsed) {
          addClass(domRef.value, flexGrowClass)
        }
      })
    }

    // 暴露给外部使用
    expose({
      getPaneSize,
      toggleNearPaneFlexGrow,
    })

    return () => {
      return (
        <div class="devui-splitter-pane" ref={domRef}>
          {slots.default?.()}
        </div>
      )
    }
  },
})
