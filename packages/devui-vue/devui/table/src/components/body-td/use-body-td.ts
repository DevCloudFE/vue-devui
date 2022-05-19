import { onMounted, ref, Text } from 'vue';
import { BodyTdProps, UseBodyTd } from './body-td-types';
import { inBrowser } from '../../../../shared/utils';

export function useBodyTd(props: BodyTdProps): UseBodyTd {
  const tooltipContent = ref();
  const isShowTooltip = ref(false);
  const tdRef = ref<HTMLElement>();

  function getTooltipContent() {
    return tdRef.value?.innerText || tdRef.value?.textContent;
  }

  function shouldShowTooltip() {
    const tdEl = tdRef.value as HTMLElement;
    const range = document.createRange();
    range.setStart(tdEl, 0);
    range.setEnd(tdEl, tdEl.childNodes.length);
    const rangeWidth = range.getBoundingClientRect().width;
    const padding =
      parseInt(window.getComputedStyle(tdEl)['paddingLeft'], 10) + parseInt(window.getComputedStyle(tdEl)['paddingRight'], 10);
    isShowTooltip.value = props.column.showOverflowTooltip && rangeWidth + padding > tdEl.offsetWidth;
  }

  onMounted(() => {
    if (inBrowser && window.ResizeObserver) {
      const observer = new window.ResizeObserver(shouldShowTooltip);
      tdRef.value && observer.observe(tdRef.value);
    }
    tooltipContent.value = getTooltipContent();
  });

  return { tdRef, isShowTooltip, tooltipContent };
}
