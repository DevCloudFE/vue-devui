import { BackTopProps } from '../back-top-types'

export default function (props: BackTopProps) {
  const target = props.target // target为元素选择器
  const currTarget =
    target === 'window'
      ? window || document.documentElement || document.body
      : document.querySelector(target) || window

  return currTarget
}
