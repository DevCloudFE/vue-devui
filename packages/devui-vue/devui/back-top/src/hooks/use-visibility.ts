import { onMounted, computed, ref } from 'vue';
import { BackTopProps } from '../back-top-types';
import { useTarget, useEventListener, useThrottle } from '.';
export default function (props: BackTopProps, backTopRef) {
  const visibleHeight = props.visibleHeight;
  const currScrollTop = ref(0);
  const ThrottleCBFn = function () {
    currScrollTop.value = currTarget === window ? window.pageYOffset : currTarget.scrollTop;
  };

  let currTarget = null;
  onMounted(() => {
    currTarget = useTarget(props, backTopRef);
    // 监听滚动事件 手动更新ScrollTop
    useEventListener(currTarget, 'scroll', useThrottle(ThrottleCBFn, 150));
  });

  const isVisible = computed(() => currScrollTop.value >= visibleHeight);

  return isVisible;
}
