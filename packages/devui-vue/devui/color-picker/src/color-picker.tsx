import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  provide,
  Teleport,
  unref,
  reactive,
  readonly,
  Transition
} from 'vue'
import { colorPickerProps, ColorPickerProps } from './color-picker-types'
import colorPanel from './components/color-picker-panel/color-picker-panel'
import './color-picker.scss'
import { fromRGBA, parseColor, extractColor, RGBAtoCSS } from './utils/color-utils'
export default defineComponent({
  name: 'DColorPicker',
  components: {
    colorPanel
  },
  props: colorPickerProps,
  emits: ['update:modelValue'],
  setup(props: ColorPickerProps, { emit }) {
    const DEFAUTL_MODE = 'rgb'
    const provideData = reactive({
      showAlpha: useReactive(() => props.showAlpha),
      swatches: useReactive(() => props.swatches),
      tab: useReactive(() => props.defaultTab)
    })
    provide('provideData', readonly(provideData))
    const initialColor = ref(fromRGBA({ r: 255, g: 0, b: 0, a: 1 }))
    const colorCubeRef = ref<HTMLElement | null>()
    const pickerRef = ref<HTMLElement | null>()
    const containerRef = ref<HTMLElement | null>()
    const left = ref(0)
    const top = ref(0)
    const isChangeTextColor = ref(true)
    const showColorPicker = ref(false)
    const formItemText = ref(`${props.mode ?? DEFAUTL_MODE}`)
    const mode = ref(unref(props.mode))
    onMounted(() => {
      // resize 响应式 colorpicker
      window.addEventListener('resize', colorPickerResize)
      // 点击展示 colorpicker
      window.addEventListener('click', isExhibitionColorPicker)
    })
    // ** computeds
    // colorpicker panel 组件位置
    const colorPickerPostion = computed(() => {
      if (colorCubeRef.value) {
        return {
          transform: `translate(${left.value}px, ${top.value}px)`
        }
      }
      return null
    })
    // 交互触发item 颜色 面板
    const tiggerColor = computed(() => {
      const trigger = initialColor.value.rgba
      if (!props.showAlpha) {
        trigger.a = 1
      }
      return {
        backgroundColor: `${RGBAtoCSS(trigger)}`
      }
    })
    // 交互面板 的value 值 动态展示 根据不同 type
    const formItemValue = computed(() => {
      return extractColor(initialColor.value, '', formItemText.value, props.showAlpha)
    })
    // 动态 根据当前 透明度修改文本颜色 tips：根据不同 面板颜色 目前 不够优雅
    const textColor = computed(() => {
      if (initialColor.value.alpha > 0.5) {
        return isChangeTextColor.value ? { color: '#fff' } : { color: '#000' }
      } else {
        return { color: '#000' }
      }
    })
    // ** emits
    // 动态 交互面板 文本展示颜色  tips：根据不同 面板颜色 目前 不够优雅
    function changeTextColor(value: boolean) {
      isChangeTextColor.value = value
    }
    // 通过修改画板 颜色 修改 v-model 颜色
    function changePaletteColor(colorMap) {
      updateUserColor(colorMap)
    }
    // 通过用户点击触发修改 交互面板 文本类型
    function changeTextModeType(type: string) {
      mode.value = type
      formItemText.value = type
    }
    function useReactive(source) {
      const model = ref(source())
      watch(source, (newValue) => {
        model.value = newValue
      })
      return model
    }
    // 初始化的时候 确定 colopicker位置
    watch(
      () => showColorPicker.value,
      (newValue) => {
        const textPalette = colorCubeRef.value?.getBoundingClientRect()
        newValue &&
          nextTick(() => {
            pickerRef.value.style.transform = `translate(${textPalette.left + 'px'}, ${
              textPalette.top + textPalette.height + 'px'
            })`
          })
      },
      {
        deep: true,
        immediate: true
      }
    )
    // 监听用户输入 2021.12.10
    watch(
      () => props.modelValue,
      (newValue) => {
        // 全部转换成对象
        updateUserColor(parseColor(newValue, initialColor.value))
      },
      { immediate: true }
    )
    // 更新用户输入颜色 2021.12.10
    function updateUserColor(color) {
      initialColor.value = color
      // 提取颜色 2021.12.10
      const value = extractColor(initialColor.value, props.modelValue, mode.value, props.showAlpha)
      emit('update:modelValue', value)
    }
    function colorPickerResize() {
      const rect = colorCubeRef.value?.getBoundingClientRect()
      left.value = rect.left
      top.value = rect.top + rect.height
    }
    function isExhibitionColorPicker(e) {
      if (colorCubeRef.value?.contains(e.target)) {
        showColorPicker.value = true
      }
      if (!!pickerRef.value && !pickerRef.value?.contains(e.target)) {
        showColorPicker.value = !showColorPicker.value
      }
    }
    return () => {
      return (
        <div class='devui-color-picker' ref={colorCubeRef}>
          <div class='devui-color-picker-container'>
            <div class='devui-color-picker-container-wrap'>
              <div
                class='devui-color-picker-container-wrap-current-color'
                style={tiggerColor.value}
              ></div>
              <div
                class={[
                  'devui-color-picker-container-wrap-transparent',
                  'devui-color-picker-container-wrap-current-color-transparent'
                ]}
              ></div>
              <div class='devui-color-picker-color-value'>
                <p style={textColor.value}>{formItemValue.value}</p>
              </div>
            </div>
          </div>
          <Teleport to='body'>
            <Transition name='color-picker-transition'>
              {showColorPicker.value ? (
                <div
                  ref={pickerRef}
                  style={colorPickerPostion.value}
                  class={['devui-color-picker-position']}
                >
                  <color-panel
                    v-model={initialColor.value}
                    ref={containerRef}
                    mode={mode.value}
                    onChangeTextColor={changeTextColor}
                    onChangePaletteColor={changePaletteColor}
                    onChangeTextModeType={changeTextModeType}
                  ></color-panel>
                </div>
              ) : null}
            </Transition>
          </Teleport>
        </div>
      )
    }
  }
})
