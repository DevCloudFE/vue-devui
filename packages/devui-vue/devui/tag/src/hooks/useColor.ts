import { computed } from 'vue'
import { tagProps, TagProps } from '../tag-types'

export default function (props: TagProps) {
  return computed(() => {
    const { color } = props

    const colorMap = {
      'blue-w98': '#3383ff',
      'aqua-w98': '#39afcc',
      'olivine-w98': '#2fa898',
      'green-w98': '#4eb15e',
      'yellow-w98': '#b08d1a',
      'orange-w98': '#d47f35',
      'red-w98': '#f66f6a',
      'pink-w98': '#f3689a',
      'purple-w98': '#a97af8'
    }

    if (!color) return {}
    // 判断传入的color是colorMap成员or颜色码
    const themeColor = colorMap[color] || color
    //color无？ 有 值为map？为#？
    return {
      color: themeColor,
      borderColor: themeColor,
      backgroundColor: '#fff'
    }
  })
}
