import { defineComponent } from 'vue'

type IIconSize = 'lg' | 'md' | 'sm'
const SIZE_MAP = {
  sm: '12px',
  md: '16px',
  lg: '24px'
}

export default defineComponent({
  name: 'DIcon',
  props: {
    name: {
      type: String
    },
    size: {
      type: String as () => IIconSize,
      default: 'md'
    },
    color: {
      type: String,
      default: '#252b3a'
    },
    classPrefix: {
      type: String,
      default: 'icon'
    },
  },
  setup(props) {
    return {
      ...props
    }
  },
  render() {
    const { name, size, color, classPrefix } = this

    return (
      <i class={`${classPrefix} ${classPrefix}-${name}`} style={{
        fontSize: SIZE_MAP[size],
        color
      }}></i>
    )
  }
})