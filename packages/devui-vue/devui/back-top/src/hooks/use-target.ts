import type { BackTopProps, IBackTopRef } from '../back-top-types';

export default function (props: BackTopProps, backTopRef: IBackTopRef): Element | (Window & typeof globalThis) {
  const target = props.target; // target为元素选择器

  const getTargetEl = () => {
    const targetEl = document.querySelector(target);
    if (!targetEl) {throw new Error(`props ${target} is not existed`);}

    // 设置定位
    if (targetEl.parentElement) {
      targetEl.parentElement.style.position = 'relative';
    }
    if (backTopRef.value) {
      backTopRef.value.style.position = 'absolute';
    }
    return targetEl;
  };
  const currTarget =
    target === 'window' ? window || document.documentElement || document.body : getTargetEl();

  return currTarget;
}
