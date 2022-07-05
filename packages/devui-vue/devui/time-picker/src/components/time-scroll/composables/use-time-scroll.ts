import { ref } from 'vue';
import type { UseTimeScroll } from '../../../types';

export default function useTimeScroll(): UseTimeScroll {
  const scrollBoxDom = ref<HTMLElement | null>(null);
  const scrollContentDom = ref<HTMLElement | null>(null);
  const scrollThumbDom = ref<HTMLElement | null>(null);
  const scrollTrackDom = ref<HTMLElement | null>(null);

  const isDown = ref(false);

  // 获取滚动条 thumb高度
  const getScrollHeight = () => {
    const thumbHeight = ((scrollContentDom.value?.clientHeight || 0) / (scrollContentDom.value?.scrollHeight || 0)) * 100;
    scrollThumbDom.value && (scrollThumbDom.value.style.height = thumbHeight + '%');
  };

  // 设置滚动条 thumb位置
  const setVirtualScroll = () => {
    const thumbMoveY = ((scrollContentDom.value?.scrollTop || 0) * 100) / (scrollContentDom.value?.clientHeight || 0);
    scrollThumbDom.value && (scrollThumbDom.value.style.transform = `translateY(${thumbMoveY}%)`);
  };

  // 点击轨道 thumb滚动到相应位置
  const clickTrackFun = (e: MouseEvent) => {
    const offsetNum = (scrollTrackDom.value?.getBoundingClientRect?.()?.top || 0) - e.clientY;
    const offset = Math.abs(offsetNum > 0 ? 0 : offsetNum);
    const thumbCenter = (scrollThumbDom.value?.offsetHeight || 0) / 2;
    const thumbPosition = ((offset - thumbCenter) * 100) / (scrollContentDom.value?.offsetHeight || 0);
    if (scrollContentDom.value) {
      scrollContentDom.value.scrollTop = (thumbPosition * scrollContentDom.value.scrollHeight) / 100;
      scrollContentDom.value.style.top = scrollContentDom.value.scrollTop + 'px';
    }
  };

  const thumbMouseMove = (e: MouseEvent & { path?: string }) => {
    const path = (e.composedPath && e.composedPath()) || e.path;
    if (scrollBoxDom.value && path.includes(scrollBoxDom.value) || isDown.value) {
      scrollTrackDom.value && (scrollTrackDom.value.style.opacity = '1');
    } else {
      scrollTrackDom.value && (scrollTrackDom.value.style.opacity = '0');
    }
    if (!isDown.value) {
      return;
    }
    clickTrackFun(e);
  };

  // 鼠标拖到
  const mouseDownThum = () => {
    isDown.value = true;
    scrollTrackDom.value && (scrollTrackDom.value.style.opacity = '1');
  };
  // 鼠标离开
  const mouseOutThum = (e: MouseEvent) => {
    isDown.value = false;
    thumbMouseMove(e);
  };

  const getScrollWidth = () => {
    const ua = navigator.userAgent;
    let marginRight = -20;

    if (ua.indexOf('Chrome') > -1) {
      marginRight = -8;
    } else {
      const outer = document.createElement('div');
      outer.className = 'devui-scrollbar-wrap';
      outer.style.width = '100px';
      outer.style.visibility = 'hidden';
      outer.style.position = 'absolute';
      outer.style.top = '-9999px';
      document.body.appendChild(outer);

      const widthNoScroll = outer.offsetWidth;
      outer.style.overflow = 'scroll';

      const inner = document.createElement('div');
      inner.style.width = '100%';
      outer.appendChild(inner);

      const widthWithScroll = inner.offsetWidth;
      outer.parentNode?.removeChild(outer);

      marginRight = (widthNoScroll - widthWithScroll + 3) * -1;
    }

    return marginRight;
  };

  return {
    scrollThumbDom,
    scrollTrackDom,
    scrollContentDom,
    scrollBoxDom,
    isDown,
    getScrollHeight,
    setVirtualScroll,
    clickTrackFun,
    mouseDownThum,
    mouseOutThum,
    thumbMouseMove,
    getScrollWidth,
  };
}
