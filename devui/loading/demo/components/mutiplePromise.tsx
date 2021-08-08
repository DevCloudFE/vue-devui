import { defineComponent, shallowReactive } from "vue";
import dLoading from '../../src/directive'

export default defineComponent({
  name: 'showLoading',
  directives: {
    dLoading
  },
  setup() {
    let promises: any = shallowReactive({
      value: []
    })
    const fetchMutiplePromise = () => {
      let list = []
      for (let i = 0; i < 3; i++) {
        list.push(new Promise((res: any) => {
          setTimeout(() => {
            res(true)
          }, (i + 1) * 1000)
        }))
      }
      promises.value = list
    }

    return {
      fetchMutiplePromise,
      promises
    }
  },
  render() {
    const {
      fetchMutiplePromise,
      promises
    } = this

    return (
      <>
        <div>
          <button style="border: 1px solid #000;" onClick={fetchMutiplePromise}>click me!</button>
        </div>
        {/* @ts-ignore */}
        <div v-dLoading={promises.value}  backdrop={true} message="One moment please..."
          style="margin-top: 20px; width: 100%; height: 80px; padding: 10px;"
        >loading will show here2</div>
      </>
    )
  }
})
