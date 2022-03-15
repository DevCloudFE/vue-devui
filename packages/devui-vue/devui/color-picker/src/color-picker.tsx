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
  readonly,
  Transition
} from 'vue';
import {
  useReactive,
  colorPickerResize,
  isExhibitionColorPicker,
  changeColorValue
} from './utils/composeable';
import { colorPickerProps, ColorPickerProps } from './color-picker-types';
import colorPanel from './components/color-picker-panel/color-picker-panel';
import './color-picker.scss';
import { parseColor, extractColor, RGBAtoCSS } from './utils/color-utils';
import { ColorPickerColor } from './utils/color-utils-types';
export default defineComponent({
  name: 'DColorPicker',
  components: {
    colorPanel
  },
  props: colorPickerProps,
  emits: ['update:modelValue'],
  setup(props: ColorPickerProps, { emit }) {
    const DEFAUTL_MODE = 'rgb';
    const provideData = {
      showAlpha: useReactive(() => props.showAlpha),
      swatches: useReactive(() => props.swatches),
      dotSize: useReactive(() => props.dotSize),
      showHistory: useReactive(() => props.showHistory)
    };
    provide('provideData', readonly(provideData));
    const initialColor = ref(null);
    const colorCubeRef = ref<HTMLElement | null>();
    const pickerRef = ref<HTMLElement | null>();
    const containerRef = ref<HTMLElement | null>();
    const left = ref(0);
    const top = ref(0);
    const isChangeTextColor = ref(true);
    const showColorPicker = ref(false);
    const formItemText = ref(`${props.mode ?? DEFAUTL_MODE}`);
    const mode = ref(unref(props.mode));
    onMounted(() => {
      // resize 响应式 colorpicker
      window.addEventListener('resize', resize);
      // 点击展示 colorpicker
      window.addEventListener('click', isExhibition);
    });
    // ** computeds
    // colorpicker panel 组件位置
    const colorPickerPostion = computed(() => {
      if (colorCubeRef.value) {
        return {
          transform: `translate(${left.value}px, ${top.value}px)`
        };
      }
      return null;
    });
    // 交互触发item 颜色 面板  动态修改alpha后要还原 alpha 2021.12.18
    const tiggerColor = computed(() => {
      const currentColor = initialColor.value.rgba;
      const trigger = { ...currentColor, a: props.showAlpha ? currentColor.a : 1 };
      return {
        backgroundColor: `${RGBAtoCSS(trigger)}`
      };
    });
    // 交互面板 的value 值 动态展示 根据不同 type
    const formItemValue = computed(() => {
      return extractColor(initialColor.value, '', formItemText.value, props.showAlpha);
    });
    // 动态 根据当前 透明度修改文本颜色 tips：根据不同 面板颜色 目前 不够优雅
    const textColor = computed(() => {
      // 数字代表 hsv 中的value 值 纵轴 动态切换 文本颜色
      return changeColorValue(initialColor.value, 0.5);
    });
    // ** emits
    // 动态 交互面板 文本展示颜色  tips：根据不同 面板颜色 目前 不够优雅
    function changeTextColor(value: boolean): void {
      isChangeTextColor.value = value;
    }
    // 通过修改画板 颜色 修改 v-model 颜色
    function changePaletteColor(colorMap: ColorPickerColor): void {
      updateUserColor(colorMap);
    }
    // 通过用户点击触发修改 交互面板 文本类型
    function changeTextModeType(type: string): void {
      mode.value = type;
      formItemText.value = type;
    }

    // 初始化的时候 确定 colopicker位置  由于 pickerref 默认 为 undefined 所以监听 showcolorpicker
    watch(
      () => showColorPicker.value,
      (newValue) => {
        const textPalette = colorCubeRef.value?.getBoundingClientRect();
        newValue &&
          nextTick(() => {
            pickerRef.value.style.transform = `translate(${textPalette.left + 'px'}, ${
              textPalette.top + window.scrollY + textPalette.height + 'px'
            })`;
          });
      }
    );
    // 监听用户输入 2021.12.10
    watch(
      () => props.modelValue,
      (newValue) => {
        // 全部转换成对象
        updateUserColor(parseColor(newValue, initialColor.value));
      },
      { immediate: true }
    );
    // 更新用户输入颜色 2021.12.10
    function updateUserColor(color) {
      initialColor.value = color;
      // 提取颜色 2021.12.10
      const value = extractColor(initialColor.value, props.modelValue, mode.value, props.showAlpha);
      emit('update:modelValue', value);
    }
    function resize() {
      return colorPickerResize(colorCubeRef, top, left);
    }
    function isExhibition(event: Event) {
      return isExhibitionColorPicker(event, colorCubeRef, pickerRef, showColorPicker);
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
      );
    };
  }
});
