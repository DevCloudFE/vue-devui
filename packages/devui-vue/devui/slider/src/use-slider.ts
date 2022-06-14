import { ref, SetupContext, onMounted, watch } from 'vue';
import { SliderProps, UseSliderEvent } from './slider-types';

export function useSliderEvent(props: SliderProps, ctx: SetupContext): UseSliderEvent {
  let isClick = true;
  let startPosition = 0;
  let startX = 0;

  const sliderRunway = ref<HTMLDivElement>();
  const currentValue = ref<number>(Number(props.modelValue));
  const currentPosition = ref<number>(0);
  const percentDisplay = ref<string>('');
  const popoverShow = ref(false);
  const newPosition = ref<number>(0);

  function getSliderWidth() {
    return Boolean(sliderRunway.value) ? sliderRunway.value?.clientWidth || 0 : 0;
  }

  function initCurrentPosition() {
    const sliderWidth = getSliderWidth();
    currentPosition.value = (sliderWidth * (currentValue.value - props.min)) / (props.max - props.min);
  }

  function setPosition(position: number) {
    const clientWidth = getSliderWidth();
    const sliderWidth: number = Math.round(clientWidth);
    if (position < 0) {
      position = 0;
    }
    const LengthPerStep = sliderWidth / ((props.max - props.min) / props.step);
    const steps = Math.round(position / LengthPerStep);
    const value: number = steps * LengthPerStep;
    if (Math.round(value) >= sliderWidth) {
      currentPosition.value = sliderWidth;
      currentValue.value = props.max;
      percentDisplay.value = '100%';
      ctx.emit('update:modelValue', props.max);
      return;
    }
    percentDisplay.value = Math.round((value * 100) / sliderWidth) + '%';
    currentValue.value = Math.round((value * (props.max - props.min)) / sliderWidth) + props.min;
    currentPosition.value = position;
    ctx.emit('update:modelValue', currentValue.value);
  }

  function dragStart(event: MouseEvent) {
    isClick = false;
    startX = event.clientX;
    startPosition = currentPosition.value;
    newPosition.value = startPosition;
  }

  function onDragging(event: MouseEvent) {
    popoverShow.value = true;
    const currentX = event.clientX;
    const pxOffset = currentX - startX;
    newPosition.value = startPosition + pxOffset;
    setPosition(newPosition.value);
  }

  function onDragEnd() {
    popoverShow.value = false;
    setTimeout(() => {
      isClick = true;
    }, 100);
    window.removeEventListener('mousemove', onDragging);
    window.removeEventListener('mouseup', onDragEnd);
  }

  function handleButtonMousedown(event: MouseEvent) {
    popoverShow.value = true;
    if (!props.disabled) {
      event.preventDefault();
      dragStart(event);
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
    }
  }

  function handleRunwayMousedown(event: MouseEvent) {
    if (!props.disabled && isClick) {
      const _e = event.target as Element;
      startX = _e.getBoundingClientRect().left;
      const currentX = event.clientX;
      setPosition(currentX - startX);
      handleButtonMousedown(event);
    }
  }

  watch(
    () => props.modelValue,
    () => {
      currentValue.value = Number(props.modelValue);

      if (currentValue.value > props.max) {
        percentDisplay.value = '100%';
      } else if (currentValue.value < props.min) {
        percentDisplay.value = '0%';
      } else {
        percentDisplay.value = ((currentValue.value - props.min) * 100) / (props.max - props.min) + '%';
      }

      initCurrentPosition();
    },
    { immediate: true }
  );

  onMounted(initCurrentPosition);

  return { sliderRunway, popoverShow, percentDisplay, currentValue, handleRunwayMousedown, handleButtonMousedown };
}
