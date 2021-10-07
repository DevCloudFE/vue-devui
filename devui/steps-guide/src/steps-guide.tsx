import './steps-guide.scss'

import { defineComponent, Teleport, ref, onMounted, computed } from 'vue'
import { stepsGuideProps, StepsGuideProps } from './steps-guide-types'
import { useStepsGuideNav, useStepsGuideCtrl } from '../hooks'
export default defineComponent({
  name: 'DStepsGuide',
  props: stepsGuideProps,
  emits: [],
  setup(props: StepsGuideProps, ctx) {
    const stepsCount = computed<number>(() => props.steps.length - 1)
    const stepIndex = ref<number>(0)
    const {
      currentStep,
      stepsRef,
      guidePosition,
      guideClassList,
      updateGuidePosition } = useStepsGuideNav(props.steps, stepIndex)
    const { showSteps,
      closeSteps,
      setCurrentIndex } = useStepsGuideCtrl(stepsCount, stepIndex, updateGuidePosition)

    onMounted(() => {
      updateGuidePosition()
    })

    return {
      stepsCount,
      stepIndex,
      showSteps,
      guidePosition,
      guideClassList,
      stepsRef,
      currentStep,
      setCurrentIndex,
      closeSteps
    }
  },
  render(props) {
    const { showSteps,
      guidePosition,
      guideClassList,
      currentStep,
      stepIndex,
      stepsCount,
      setCurrentIndex,
      closeSteps,
      showClose,
      showDots } = props

    return showSteps ?
      (<Teleport to="body">
        <div style={guidePosition} class={guideClassList} ref="stepsRef">
          <div class="devui-shining-dot"></div>
          <div class="devui-shining-plus"></div>
          <div class="devui-arrow"></div>
          <div class="devui-guide-container">
            <p class="devui-title">{currentStep.title}</p>
            {showClose ? <div class="icon icon-close" onClick={closeSteps}></div> : null}
            <div class="devui-content">{currentStep.content}</div>
            <div class="devui-ctrl">
              {
                showDots ?
                  <div class="devui-dots">
                    {props.steps.map((step, index) => {
                      return <em class={ ['icon icon-dot-status', currentStep === step ? 'devui-active' : ''] } key={ index }></em>
                    })}
                  </div> : null
              }
              <div class="devui-guide-btn">
                {stepIndex > 0 ? <div class="devui-prev-step" onClick={() => setCurrentIndex(--props.stepIndex)}>{'上一步'}</div> : null}
                {stepIndex === stepsCount ?
                  <div onClick={closeSteps}>{'我知道啦'}</div> :
                  <div class="devui-next-step" onClick={() => { setCurrentIndex(++props.stepIndex) }}>{'我知道啦,继续'}</div>}
              </div>
            </div>
          </div>
        </div>
      </Teleport>) : null
  }
})
