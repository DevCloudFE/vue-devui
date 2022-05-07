import { computed, ref, defineComponent, Teleport, onMounted } from 'vue';
import { stepsGuideProps, StepsGuideProps, Step } from './steps-guide-types';
import { useStepsGuidePosition, useStepsGuideCtrl } from '../composables';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './steps-guide.scss';

export default defineComponent({
  name: 'DStepsGuide',
  props: stepsGuideProps,
  emits: ['guide-close', 'update:stepIndex'],
  setup(props: StepsGuideProps, ctx) {
    const ns = useNamespace('steps-guide');
    const stepIndexData = ref<number>((props.stepIndex ?? 0) as number);
    const stepIndex = computed<number>({
      set: (val) => {
        if (props.stepIndex != null) {
          ctx.emit('update:stepIndex', val);
        }
        stepIndexData.value = val;
      },
      get: () => stepIndexData.value,
    });
    const currentStep = computed<Step>(() => {
      const _step = props.steps[stepIndex.value];
      if (_step) {
        _step.position = _step.position || 'top';
      }
      return _step;
    });

    const { stepsRef, guidePosition, guideClassList, updateGuidePosition } = useStepsGuidePosition(props, currentStep);
    const { stepsCount, closeGuide, setCurrentIndex } = useStepsGuideCtrl(props, ctx, updateGuidePosition, stepIndex);

    onMounted(() => {
      updateGuidePosition();
    });
    ctx.expose({
      closeGuide,
      setCurrentIndex,
    });
    return () =>
      stepIndex.value > -1 && stepsCount.value > 0 ? (
        <Teleport to="body">
          <div style={guidePosition} class={guideClassList} ref={stepsRef}>
            <div class={ns.e('shining-dot')}></div>
            <div class={ns.e('shining-plus')}></div>
            <div class={ns.e('arrow')}></div>
            <div class={ns.e('container')}>
              <p class={ns.e('title')}>{currentStep.value.title}</p>
              {props.showClose ? <div class="icon icon-close" onClick={closeGuide}></div> : null}
              <div>{currentStep.value.content}</div>
              <div class={ns.e('ctrl')}>
                {props.showDots ? (
                  <div class={ns.e('dots')}>
                    {props.steps.map((step, index) => {
                      return <em class={['icon icon-dot-status', currentStep.value === step ? ns.e('active') : '']} key={index}></em>;
                    })}
                  </div>
                ) : null}
                <div class={ns.e('btn')}>
                  {stepIndex.value > 0 ? (
                    <div class={ns.e('prev-step')} onClick={() => setCurrentIndex(stepIndex.value - 1)}>
                      {'上一步'}
                    </div>
                  ) : null}
                  {stepIndex.value === stepsCount.value - 1 ? (
                    <div onClick={closeGuide}>{'我知道啦'}</div>
                  ) : (
                    <div
                      onClick={() => {
                        setCurrentIndex(stepIndex.value + 1);
                      }}>
                      {'我知道啦,继续'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Teleport>
      ) : null;
  },
});
