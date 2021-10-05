import './steps-guide.scss'

import { defineComponent, Teleport, ref, onMounted, reactive, computed } from 'vue'
import { stepsGuideProps, StepsGuideProps, Step, positionConf } from './steps-guide-types'

export default defineComponent({
  name: 'DStepsGuide',
  props: stepsGuideProps,
  emits: [],
  setup(props: StepsGuideProps, ctx) {
    const teleport = Teleport
    const stepsRef = ref(null)
    const stepsCount = computed<number>(() => props.steps.length - 1)
    const stepIndex = ref<number>(0), showSteps = ref<boolean>(true)
    const currentStep = computed<Step>(() => {
      const _step = props.steps[stepIndex.value]
      _step.position = _step.position || 'top'
      return _step
    })
    const guideClassName = ['d-steps-guide']
    const position = reactive({
      left: '',
      top: '',
      zIndex: 1100
    })
    onMounted(() => {
      updateGuidePosition()
    })
    function updateGuidePosition(){
      const baseTop = window.pageYOffset - document.documentElement.clientTop
      const baseLeft = window.pageXOffset - document.documentElement.clientLeft
      const currentStepPosition = currentStep.value.position
      let left, top
      // 自定义 position位置
      if(typeof currentStepPosition !== 'string'){
        guideClassName[1] = currentStepPosition.type

        left = currentStepPosition.left
        top = currentStepPosition.top
      } else {
        guideClassName[1] = currentStepPosition
        const stepGuideElement = stepsRef.value
        const triggerSelector = currentStep.value.target || currentStep.value.trigger
        const triggerElement = document.querySelector(triggerSelector)
        const targetRect = triggerElement.getBoundingClientRect()
        left = targetRect.left + triggerElement.clientWidth / 2 - stepGuideElement.clientWidth / 2 + baseLeft
        top = targetRect.top + triggerElement.clientHeight / 2 - stepGuideElement.clientHeight / 2 + baseTop
        const positionTypes = currentStepPosition.split('-')
        switch(positionTypes[0]){
          case 'top':
            top += (-stepGuideElement.clientHeight / 2 - triggerElement.clientHeight)
          break
          case 'bottom':
            top += (stepGuideElement.clientHeight / 2 + triggerElement.clientHeight)
          break
          case 'left':
            top += (stepGuideElement.clientHeight / 2 - triggerElement.clientHeight)
            left += (-stepGuideElement.clientWidth / 2 - triggerElement.clientWidth / 2)
            break
          case 'right':
            top += (stepGuideElement.clientHeight / 2 - triggerElement.clientHeight)
            left += (stepGuideElement.clientWidth / 2 + triggerElement.clientWidth / 2)
            break
        }
        switch(positionTypes[1]){
          case 'left':
            left += (stepGuideElement.clientWidth / 2 - triggerElement.clientWidth / 2)
            break
          case 'right':
            left += (-stepGuideElement.clientWidth / 2 + triggerElement.clientWidth / 2)
            break
        }
      }
      position.left = left + 'px'
      position.top = top + 'px'
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
        <div style={ position } class={ guideClassName } ref={ stepsRef }>
          <div class="devui-shining-dot"></div>
          <div class="devui-shining-plus"></div>
          <div class="devui-arrow"></div>
          <div class="devui-guide-container">
            <p class="devui-title">{ currentStep.value.title }</p>
            <div class="devui-content">{ currentStep.value.content }</div>
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
