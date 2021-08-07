import { defineComponent } from 'vue'

type IIconSize = 'sm' | 'md' | 'lg'
const SIZE_MAP = {
  sm: '12px',
  md: '16px',
  lg: '24px'
}

export default defineComponent({
  name: 'DIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String as () => IIconSize,
      default: 'md',
      validator: (value: string) => {
        return Object.keys(SIZE_MAP).includes(value)
      }
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
      <i className={`${classPrefix} ${classPrefix}-${name}`} style={{
        fontSize: SIZE_MAP[size],
        color
      }}></i>
    )
  }
})