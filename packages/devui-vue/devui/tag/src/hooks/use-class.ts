import { computed } from 'vue'
import { tagProps, TagProps } from '../tag-types'

export default function (props: TagProps) {
  return computed(() => {
    const { type, color, deletable } = props
    return `devui-tag devui-tag-${type || (color ? 'colorful' : '') || 'default'} ${
      deletable ? 'devui-tag-deletable' : ''
    }`
  })
}
