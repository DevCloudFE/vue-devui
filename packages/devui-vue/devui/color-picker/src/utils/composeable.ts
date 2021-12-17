import { Ref, ref, watch } from 'vue'
import { provideColor } from './color-utils-types'
export function colorPickerResize(
  colorCubeRef: Ref<HTMLElement>,
  top: Ref<number>,
  left: Ref<number>
): void {
  const rect = colorCubeRef.value?.getBoundingClientRect()
  left.value = rect.left
  top.value = rect.top + rect.height
}
export function isExhibitionColorPicker(
  event: PointerEvent,
  colorCubeRef: Ref<HTMLElement>,
  pickerRef: Ref<HTMLElement>,
  showColorPicker: Ref<boolean>
): void {
  if (colorCubeRef.value?.contains(event.target)) {
    showColorPicker.value = true
  }
  if (!!pickerRef.value && !pickerRef.value?.contains(event.target)) {
    showColorPicker.value = !showColorPicker.value
  }
}
export function useReactive(source): Ref<provideColor> {
  const model = ref(source())
  watch(source, (newValue) => {
    model.value = newValue
  })
  return model
}
