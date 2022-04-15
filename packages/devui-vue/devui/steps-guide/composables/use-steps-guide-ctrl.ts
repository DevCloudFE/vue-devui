import { ref, nextTick, computed, WritableComputedRef, SetupContext } from 'vue';
import { StepsGuideProps, Step } from '../src/steps-guide-types';

export function useStepsGuideCtrl(
  props: StepsGuideProps,
  ctx: SetupContext<('guide-close'|'update:stepIndex')[]>,
  updateGuidePosition: Function,
  stepIndex: WritableComputedRef<number>
) {
  const stepsCount = computed<number>(() => props.steps.length);

  const closeGuide = () => {
    // 缓存关闭前的index, 并在关闭后触发事件
    const _index = stepIndex.value;
    stepIndex.value = -1;
    nextTick(() => {
      ctx.emit('guide-close', _index);
    });
  };
  const setCurrentIndex = (index: number): void => {
    if(index !== -1 && props.stepChange()){
      if(index > -1 && index < stepsCount.value) {
        stepIndex.value = index;
        nextTick(() => {
          updateGuidePosition();
        });
      } else {
        console.error(`stepIndex is not within the value range`);
      }
    }
    if(index === -1) {closeGuide();}
  };
  return {
    stepsCount,
    closeGuide,
    setCurrentIndex
  };
}
