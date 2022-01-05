import { Ref, ref, watch } from 'vue'
import { ColorPickerColor, CssColorObject } from './color-utils-types'
export function colorPickerResize(
  colorCubeRef: Ref<HTMLElement>,
  top: Ref<number>,
  left: Ref<number>
): void {
  const rect = colorCubeRef.value?.getBoundingClientRect()
  left.value = rect?.left
  top.value = rect?.top + window.scrollY + rect?.height
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
export function useReactive<T>(source: () => T): Ref<T> {
  const model = ref<T>()
  model.value = source()
  watch(source, (newValue) => {
    model.value = newValue
  })
  return model
}

// 根据 value  饱和度 判断文本颜色
export function changeColorValue(value: ColorPickerColor, maxValue: number): CssColorObject {
  if (value.alpha > maxValue) {
    return value.hsva.v > maxValue && value.hsva.s < maxValue
      ? { color: '#000' }
      : { color: '#fff' }
  } else {
    return { color: '#000' }
  }
}
// 判断当前可视区是否完整显示 picker 面板
export function panelPostion(pickerRef: Ref<HTMLElement>, colorCubeRef: Ref<HTMLElement>): void {
  if (pickerRef.value) {
    const picker = pickerRef.value?.getBoundingClientRect()
    const textPalette = colorCubeRef.value?.getBoundingClientRect()
    if (
      window.innerHeight - textPalette.y - textPalette.height <
      pickerRef.value?.getBoundingClientRect().height
    ) {
      pickerRef.value.style.transform = `translate(${textPalette.left + 'px'}, ${
        textPalette.top + window.scrollY - picker.height + 'px'
      })`
      return
    }
    pickerRef.value.style.transform = `translate(${textPalette.left + 'px'}, ${
      textPalette.top + window.scrollY + textPalette.height + 'px'
    })`
  }
}