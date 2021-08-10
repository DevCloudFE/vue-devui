import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '16px'
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
        fontSize: size,
        color
      }}></i>
    )
  }
})