import './steps-guide.scss'

import { defineComponent, Teleport, ref, onMounted, reactive } from 'vue'
import { stepsGuideProps, StepsGuideProps } from './steps-guide-types'

// 
export default defineComponent({
  name: 'DStepsGuide',
  props: stepsGuideProps,
  emits: [],
  setup(props: StepsGuideProps, ctx) {
    console.log(props, ctx, Teleport)
    const containerRef = ref(null)
    const position = reactive({
      left: '',
      top: '',
      zIndex: 1100
    })
    onMounted(() => {
      const triggerElement = containerRef.value.firstElementChild
      const targetRect = triggerElement.getBoundingClientRect();
      position.left = targetRect.left + triggerElement.clientWidth / 2 + 'px'
      position.top = targetRect.top + triggerElement.clientHeight / 2 + 'px'
    })
    return () => 
      (<div class="d-steps-guide-container" ref={ containerRef }>
        {/* 指引位置默认只允许存在根元素 */}
        { ctx.slots.default()[0] }
        <Teleport to="body">
          <div class="d-steps-guide" style={ position }>
            <div class="devui-shining-dot"></div>
            <div class="devui-shining-plus"></div>
            <div class="devui-arrow"></div>
            <div class="devui-guide-container">
              <p class="devui-title">{ props.title }</p>
              <div class="devui-content">{ props.content }</div>
            </div>
          </div>
        </Teleport>
      </div>)
  }
})
