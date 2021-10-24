import { defineComponent, reactive, ref, provide, nextTick, onMounted } from 'vue'
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

    const domRef = ref<HTMLElement>()

    provide('orientation', props.orientation)
    provide('splitterStore', store)
    onMounted(() => {
      nextTick(() => {
        let containerSize = 0
        if (props.orientation === 'vertical') {
          containerSize = domRef.value.clientHeight
        } else {
          containerSize = domRef.value.clientWidth
        }
        store.setSplitter({ containerSize })
      })
    });

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
