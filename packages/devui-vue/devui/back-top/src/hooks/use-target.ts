import { BackTopProps } from '../back-top-types';

export default function (props: BackTopProps, backTopRef) {
  const target = props.target; // target为元素选择器

  const getTargetEl = () => {
    const targetEl = document.querySelector(target);
    if (!targetEl) {throw new Error(`props ${target} is not existed`);}

    // 设置定位
    targetEl.parentElement.style.position = 'relative';
    backTopRef.value.style.position = 'absolute';
    return targetEl;
  };
  const currTarget =
    target === 'window' ? window || document.documentElement || document.body : getTargetEl();

  return currTarget;
}
