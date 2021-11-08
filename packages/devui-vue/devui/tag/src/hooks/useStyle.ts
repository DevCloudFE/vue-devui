import { computed } from 'vue'
import { tagProps, TagProps } from '../tag-types'

export default function (props: TagProps) {
  return computed(() => {
    const { type } = props

    return `devui-tag devui-tag-${type || 'default'}`
  })
}
