import { ref, reactive, ComputedRef, nextTick } from 'vue';
import { Step, positionConf, StepsGuideProps } from '../src/steps-guide-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

export function useStepsGuidePosition(props: StepsGuideProps, currentStep: ComputedRef<Step>) {
  const guideClassList = reactive([useNamespace('steps-guide').b()]);
  const stepsRef = ref(null);
  const guidePosition = reactive({
    left: '',
    top: '',
    zIndex: props.zIndex,
  });

  const updateGuidePosition = () => {
    if (!currentStep.value || !stepsRef.value) {
      return;
    }
    const baseTop = window.pageYOffset - document.documentElement.clientTop;
    const baseLeft = window.pageXOffset - document.documentElement.clientLeft;
    const currentStepPosition: positionConf = currentStep.value.position;
    const stepGuideElement = stepsRef.value;
    let _left, _top;
    // 自定义 position位置
    if (typeof currentStepPosition !== 'string') {
      const { top = 0, left = 0, type = 'top' } = currentStepPosition;
      guideClassList.splice(1, 1, type);
      _left = left;
      _top = top;
    } else {
      guideClassList.splice(1, 1, currentStepPosition);
      const triggerSelector = currentStep.value.target || currentStep.value.trigger;
      const triggerElement = document.querySelector(triggerSelector);
      if (!triggerElement) {
        console.warn(`${triggerSelector} 不存在!`);
        return false;
      }
      const targetRect = triggerElement.getBoundingClientRect();
      _left = targetRect.left + triggerElement.clientWidth / 2 - stepGuideElement.clientWidth / 2 + baseLeft;
      _top = targetRect.top + triggerElement.clientHeight / 2 - stepGuideElement.clientHeight / 2 + baseTop;

      const positionTypes = currentStepPosition.split('-');
      switch (positionTypes[0]) {
      case 'top':
        _top += -stepGuideElement.clientHeight / 2 - triggerElement.clientHeight;
        break;
      case 'bottom':
        _top += stepGuideElement.clientHeight / 2 + triggerElement.clientHeight;
        break;
      case 'left':
        _top += stepGuideElement.clientHeight / 2 - triggerElement.clientHeight;
        _left += -stepGuideElement.clientWidth / 2 - triggerElement.clientWidth / 2;
        break;
      case 'right':
        _top += stepGuideElement.clientHeight / 2 - triggerElement.clientHeight;
        _left += stepGuideElement.clientWidth / 2 + triggerElement.clientWidth / 2;
        break;
      }
      switch (positionTypes[1]) {
      case 'left':
        _left += stepGuideElement.clientWidth / 2 - triggerElement.clientWidth / 2;
        break;
      case 'right':
        _left += -stepGuideElement.clientWidth / 2 + triggerElement.clientWidth / 2;
        break;
      }
    }
    guidePosition.left = _left + 'px';
    guidePosition.top = _top + 'px';
    if (props.scrollToTargetSwitch && typeof stepGuideElement.scrollIntoView === 'function') {
      nextTick(() => {
        // 位置更新后滚动视图
        stepGuideElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      });
    }
  };
  return {
    stepsRef,
    guidePosition,
    guideClassList,
    updateGuidePosition,
  };
}
