import './steps-guide.scss';
import { computed, ref, defineComponent, Teleport, onMounted } from 'vue';
import { stepsGuideProps, StepsGuideProps, Step } from './steps-guide-types';
import { useStepsGuidePosition, useStepsGuideCtrl } from '../hooks';

export default defineComponent({
  name: 'DStepsGuide',
  props: stepsGuideProps,
  emits: ['guide-close', 'update:stepIndex'],
  setup(props: StepsGuideProps, ctx) {
    const stepIndexData = ref<number>((props.stepIndex ?? 0) as number);
    const stepIndex = computed<number>({
      set: val => {
        if(props.stepIndex != null) {
          ctx.emit('update:stepIndex', val);
        }
        stepIndexData.value = val;
      },
      get: () => stepIndexData.value
    });
    const currentStep = computed<Step>(() => {
      const _step = props.steps[stepIndex.value];
      if(_step) {_step.position = _step.position || 'top';}
      return _step;
    });

    const {
      stepsRef,
      guidePosition,
      guideClassList,
      updateGuidePosition } = useStepsGuidePosition(props, currentStep);
    const {
      stepsCount,
      closeGuide,
      setCurrentIndex } = useStepsGuideCtrl(props, ctx, updateGuidePosition, stepIndex);

    onMounted(() => {
      updateGuidePosition();
    });
    ctx.expose({
      closeGuide,
      setCurrentIndex
    });
    return () => stepIndex.value > -1 && stepsCount.value > 0 ?
      (<Teleport to="body">
        <div style={ guidePosition } class={guideClassList} ref={ stepsRef }>
          <div class="devui-shining-dot"></div>
          <div class="devui-shining-plus"></div>
          <div class="devui-arrow"></div>
          <div class="devui-guide-container">
            <p class="devui-title">{currentStep.value.title}</p>
            {props.showClose ? <div class="icon icon-close" onClick={closeGuide}></div> : null}
            <div class="devui-content">{currentStep.value.content}</div>
            <div class="devui-ctrl">
              {
                props.showDots ?
                  <div class="devui-dots">
                    {props.steps.map((step, index) => {
                      return <em class={ ['icon icon-dot-status', currentStep.value === step ? 'devui-active' : ''] } key={ index }></em>;
                    })}
                  </div> : null
              }
              <div class="devui-guide-btn">
                {stepIndex.value > 0 ? <div class="devui-prev-step" onClick={() => setCurrentIndex(stepIndex.value - 1)}>{'上一步'}</div> : null}
                {stepIndex.value === stepsCount.value - 1 ?
                  <div onClick={closeGuide}>{'我知道啦'}</div> :
                  <div class="devui-next-step" onClick={() => { setCurrentIndex(stepIndex.value + 1); }}>{'我知道啦,继续'}</div>}
              </div>
            </div>
          </div>
        </div>
      </Teleport>) : null;
  }
});
