import { ref, onMounted, watch } from 'vue';
import type { SetupContext } from 'vue';
import { initializeTimeData } from '../../../time-picker/src/utils';

export default function useTimePickerPanel(props, ctx: SetupContext): any {
  const timeListDom = ref();
  const hourList = initializeTimeData('hour');
  const minuteList = initializeTimeData('minute');
  const secondList = initializeTimeData('second');

  onMounted(() => {
    if (props.bindData) {
      timeListDom?.value?.setOuterTime(props.bindData);
    }
  });

  watch(
    () => [props.visible, props.bindData],
    ([visible, newTimeVal], [, oldTimeVal]) => {
      if (visible || newTimeVal !== oldTimeVal) {
        timeListDom.value.setOuterTime(newTimeVal);
      } else {
        timeListDom.value.resetScrollTop();
      }
    }
  );

  return {
    timeListDom,
    hourList,
    minuteList,
    secondList,
  };
}
