import './steps-guide.scss'

import { defineComponent, Teleport, ref, onMounted, reactive, computed } from 'vue'
import { stepsGuideProps, StepsGuideProps } from './steps-guide-types'

// 
export default defineComponent({
  name: 'DStepsGuide',
  props: stepsGuideProps,
  emits: [],
  setup(props: StepsGuideProps, ctx) {
    const teleport = Teleport
    const stepsCount = computed<number>(() => props.steps.length - 1)
    const stepIndex = ref<number>(0), showSteps = ref<boolean>(true)
    let stepsNodes
    const position = reactive({
      left: '',
      top: '',
      zIndex: 1100
    })

    onMounted(() => {
      stepsNodes = props.steps.map(step => document.querySelector(step.selector))
      updateGuidePosition()
    })
    function updateGuidePosition(){
      const triggerElement = stepsNodes[stepIndex.value]
      const targetRect = triggerElement.getBoundingClientRect();
      position.left = targetRect.left + triggerElement.clientWidth / 2 + 'px'
      position.top = targetRect.top + triggerElement.clientHeight / 2 + 'px'
    }
    function renderPrev(){
      return stepIndex.value > 0 ? <div class="devui-prev-step" onClick={ prevStep }>{ '上一步' }</div> : null
    }
    function renderNext(){
      return stepIndex.value === stepsCount.value ? 
        <div onClick={ closeSteps }>{ '我知道啦' }</div> :
        <div class="devui-next-step" onClick={ nextStep }>{ '我知道啦,继续' }</div>
    }
    function prevStep(){
      stepIndex.value--
      updateGuidePosition()
    }
    function nextStep(){
      stepIndex.value++
      updateGuidePosition()
    }
    function closeSteps(){
      showSteps.value = false
    }
    return () => showSteps.value ? 
      (<teleport to="body">
        <div class="d-steps-guide" style={ position }>
          <div class="devui-shining-dot"></div>
          <div class="devui-shining-plus"></div>
          <div class="devui-arrow"></div>
          <div class="devui-guide-container">
            <p class="devui-title">{ props.steps[stepIndex.value].title }</p>
            <div class="devui-content">{ props.steps[stepIndex.value].content }</div>
            <div class="devui-ctrl">
              <div class="devui-dots">
                <em class="icon icon-dot-status devui-active"></em>
              </div>
              <div class="devui-guide-btn">
                { renderPrev() }
                { renderNext() }
              </div>
            </div>
          </div>
        </div>
      </teleport>) : null
  }
})
