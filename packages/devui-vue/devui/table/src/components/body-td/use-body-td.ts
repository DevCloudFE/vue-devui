import { onBeforeMount, onMounted, ref } from 'vue';
import { BodyTdProps, UseBodyTd } from './body-td-types';
import { inBrowser } from '../../../../shared/utils';

export function useBodyTd(props: BodyTdProps): UseBodyTd {
  const tooltipContent = ref();
  const isShowTooltip = ref(false);
  const tdRef = ref<HTMLElement>();
  let observer: ResizeObserver;

  function getTooltipContent() {
    return tdRef.value?.innerText || tdRef.value?.textContent;
  }

  function shouldShowTooltip() {
    if (!tdRef.value) {
      return;
    }
    const range = document.createRange();
    range.setStart(tdRef.value, 0);
    range.setEnd(tdRef.value, tdRef.value.childNodes.length);
    const rangeWidth = range.getBoundingClientRect().width;
    const padding =
      parseInt(window.getComputedStyle(tdRef.value)['paddingLeft'], 10) +
      parseInt(window.getComputedStyle(tdRef.value)['paddingRight'], 10);
    isShowTooltip.value = props.column.showOverflowTooltip && rangeWidth + padding > tdRef.value.offsetWidth;
  }

  onMounted(() => {
    if (inBrowser && window.ResizeObserver && props.column.showOverflowTooltip) {
      const observer = new window.ResizeObserver(shouldShowTooltip);
      tdRef.value && observer.observe(tdRef.value);
    }
    tooltipContent.value = getTooltipContent();
  });

  onBeforeMount(() => {
    tdRef.value && observer.unobserve(tdRef.value);
  });

  return { tdRef, isShowTooltip, tooltipContent };
}
