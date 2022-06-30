import { onMounted, computed, ref } from 'vue';
import type { ComputedRef } from 'vue';
import { BackTopProps, IBackTopRef } from '../back-top-types';
import { useTarget, useEventListener, useThrottle } from '.';
type ICurrentTarget = HTMLElement & Window & typeof globalThis;
export default function (props: BackTopProps, backTopRef: IBackTopRef): ComputedRef<boolean> {
  const visibleHeight = props.visibleHeight;
  const currScrollTop = ref(0);
  let currTarget: ICurrentTarget;
  const ThrottleCBFn = function () {
    currScrollTop.value = currTarget === window ? window.pageYOffset : currTarget.scrollTop;
  };

  onMounted(() => {
    currTarget = useTarget(props, backTopRef) as ICurrentTarget;
    // 监听滚动事件 手动更新ScrollTop
    useEventListener(currTarget, 'scroll', useThrottle(ThrottleCBFn, 150));
  });

  const isVisible = computed(() => currScrollTop.value >= visibleHeight);

  return isVisible;
}
