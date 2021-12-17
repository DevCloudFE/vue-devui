import { Ref, ref, watch } from 'vue'
import { ColorPickerColor, CssColorObject, provideColor } from './color-utils-types'
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

// 根据 value  饱和度 判断文本颜色
export function changeColorValue(value: ColorPickerColor, maxValue: number): CssColorObject {
  if (value.alpha > maxValue) {
    return value.hsva.v < maxValue ? { color: '#fff' } : { color: '#000' }
  } else {
    return { color: '#000' }
  }
}
