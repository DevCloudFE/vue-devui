import { defineComponent, ref } from "vue";
import LoadingService from '../../src/service'

export default defineComponent({
  name: 'service',
  setup() {
    const serviceToBody = () => {
      const results = LoadingService.open()

      setTimeout(() => {
        results.loadingInstance.close()
      }, 2000)
    }

    const isShow = ref(true)
    let resultTarget: any
    const openTargetLoading = () => {
      resultTarget = LoadingService.open({
        target: document.querySelector('#me'),
        message: 'One moment please...',
        positionType: 'relative',
        zIndex: 1,
      })
      isShow.value = false
    }

    const closeTargetLoading = () => {
      resultTarget.loadingInstance.close()
      isShow.value = true
    }

    return {
      serviceToBody,
      isShow,
      openTargetLoading,
      closeTargetLoading
    }
  },
  render() {
    const {
      serviceToBody,
      isShow,
      openTargetLoading,
      closeTargetLoading
    } = this

    return (
      <>
        <div>
          <button style="border: 1px solid #000;" onClick={serviceToBody}>click me show full screen loading!</button> &nbsp;
          {
            isShow
              ? <button style="border: 1px solid #000;" onClick={openTargetLoading}>click me show loading in target!</button>
              : <button style="border: 1px solid #000;" onClick={closeTargetLoading}>click me close loading in target!</button>
          }
        </div>
        <div id="me" style="margin-top: 20px; width: 100%; height: 60px; padding: 10px;">loading will show here3</div>
      </>
    )
  }
})
