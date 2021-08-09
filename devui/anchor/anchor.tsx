import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DAnchor',
  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus()
      }
    }
  },
  props: {
  },
  setup(props, ctx) {
    return () => {
      return (
        <input v-only2 /> 
      )
    }
  }
})