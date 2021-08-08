import { defineComponent, ref } from "vue";
import dLoading from '../../src/directive'

export default defineComponent({
  name: 'showLoading',
  directives: {
    dLoading
  },
  setup() {

    const isShow = ref(false)

    const toggle = () => {
      isShow.value = true

      setTimeout(() => {
        isShow.value = false;
      }, 1000);
    }

    return {
      toggle,
      isShow
    }
  },
  render() {
    const {
      toggle,
      isShow
    } = this

    return (
      <>
        <div>
          <button style="border: 1px solid #000;" onClick={toggle}>click me!</button>
        </div>
        {/* @ts-ignore */}
        <div v-dLoading showLoading={isShow}
          style="margin-top: 20px; width: 100%; height: 60px; padding: 10px;"
        >loading will show here4</div>
      </>
    )
  }
})
