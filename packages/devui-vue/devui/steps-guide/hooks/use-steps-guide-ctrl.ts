import { ref, nextTick } from 'vue'

export function useStepsGuideCtrl(stepsCount, stepIndex, updateGuidePosition) {
  const showSteps = ref<boolean>(true)
  const closeSteps = ():void => {
    showSteps.value = false
  }
  const setCurrentIndex = (index:number):void => {
    if (index > stepsCount.value || index < 0) index = 0
      stepIndex.value = index
      if (!showSteps.value) {
        showSteps.value = true
        nextTick(() => {
          updateGuidePosition()
        })
      } else {
        updateGuidePosition()
      }
  }
  return {
    showSteps,
    closeSteps,
    setCurrentIndex
  }
}