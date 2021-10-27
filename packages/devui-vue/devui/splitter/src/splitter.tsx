import { defineComponent, reactive, ref, provide, nextTick, watch } from 'vue'
import { splitterProps, SplitterProps } from './splitter-types'
import DSplitterBar from './splitter-bar'
import { SplitterStore } from './splitter-store'
import './splitter.scss'

export default defineComponent({
  name: 'DSplitter',
  components: {
    DSplitterBar,
  },
  props: splitterProps,
  emits: [],
  setup(props: SplitterProps, ctx) {
    const store: SplitterStore = new SplitterStore()
    const state = reactive({
      panes: [], // 内嵌面板
    })

    state.panes = ctx.slots.DSplitterPane?.() || []

    store.setPanes({ panes: state.panes })
    provide('orientation', props.orientation)
    provide('splitterStore', store)

    const domRef = ref<HTMLElement>()
    watch(domRef, (ele) => {
      if (!ele) {
        return;
      }
      let containerSize = 0
      if (props.orientation === 'vertical') {
        containerSize = ele.clientHeight
      } else {
        containerSize = ele.clientWidth
      }
      store.setSplitter({ containerSize })
    })

    return () => {
      const { splitBarSize, orientation, showCollapseButton } = props
      const wrapperClass = ['devui-splitter', `devui-splitter-${orientation}`]

      return (
        <div class={wrapperClass} ref={domRef}>
          {state.panes}
          {state.panes
            .filter((pane, index, arr) => index !== arr.length - 1)
            .map((pane, index) => {
              return (
                <d-splitter-bar
                  key={index}
                  style={`order: ${index * 2 + 1}`}
                  splitBarSize={splitBarSize}
                  orientation={orientation}
                  index={index}
                  showCollapseButton={showCollapseButton}
                ></d-splitter-bar>
              )
            })}
        </div>
      )
    }
  },
})
