import { computed, ref } from 'vue'
import { BackTopProps } from '../back-top-types'
import { useTarget, useEventListener, useThrottle } from '../hooks'
export default function (props: BackTopProps) {
  const visibleHeight = props.visibleHeight

  const currTarget = useTarget(props)

  const currScrollTop = ref(0)
  const ThrottleCBFn = function () {
    currScrollTop.value = currTarget === window ? window.pageYOffset : currTarget.scrollTop
    console.log(currScrollTop.value)
  }
  // 监听滚动事件 手动更新ScrollTop
  useEventListener(currTarget, 'scroll', useThrottle(ThrottleCBFn, 150))

  // const currScrollTop = ref(currTarget === window ? window.pageYOffset : currTarget.scrollTop)
  const isVisible = computed(() => currScrollTop.value >= visibleHeight)

  return isVisible
}
