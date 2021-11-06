import { computed } from 'vue'
import { tagsProps, TagsProps } from '../tags-types'

export default function (props: TagsProps) {
  return computed(() => {
    const { type } = props
    console.log(type, 'type')

    return `devui-tag devui-tag-${type || 'default'}`
  })
}
