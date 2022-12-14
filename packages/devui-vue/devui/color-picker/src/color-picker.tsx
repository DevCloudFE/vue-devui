import { defineComponent, ref, computed, onMounted, watch, nextTick, provide, unref, readonly, Transition } from 'vue';
import type { StyleValue, Ref } from 'vue';
import { computePosition, flip } from '@floating-ui/dom';
import { throttle } from 'lodash';
import { useReactive, colorPickerResize, isExhibitionColorPicker, changeColorValue } from './utils/composable';
import { colorPickerProps, ColorPickerProps } from './color-picker-types';
import colorPanel from './components/color-picker-panel/color-picker-panel';
import './color-picker.scss';
import { parseColor, extractColor, RGBAtoCSS } from './utils/color-utils';
import { ColorPickerColor } from './utils/color-utils-types';
export default defineComponent({
  name: 'DColorPicker',
  components: {
    colorPanel,
  },
  props: colorPickerProps,
  emits: ['update:modelValue'],
  setup(props: ColorPickerProps, { emit }) {
    const DEFAULT_MODE = 'rgb';
    const provideData = {
      showAlpha: useReactive(() => props.showAlpha),
      swatches: useReactive(() => props.swatches),
      dotSize: useReactive(() => props.dotSize),
      showHistory: useReactive(() => props.showHistory),
    };
    provide('provideData', readonly(provideData));
    const initialColor = ref<Partial<ColorPickerColor>>();
    const colorCubeRef = ref<HTMLElement | null>(null);
    const pickerRef = ref<HTMLElement | null>(null);
    const containerRef = ref<HTMLElement | null>(null);
    const left = ref(0);
    const top = ref(0);
    const isChangeTextColor = ref(true);
    const showColorPicker = ref(false);
    const formItemText = ref(`${props.mode ?? DEFAULT_MODE}`);
    const mode = ref(unref(props.mode));

    // 更新用户输入颜色 2021.12.10
    function updateUserColor(color: Partial<ColorPickerColor>) {
      initialColor.value = color;
      // 提取颜色 2021.12.10
      const value = extractColor(initialColor.value as ColorPickerColor, props.modelValue, mode.value as string, props.showAlpha);
      emit('update:modelValue', value);
    }
    function resize() {
      return colorPickerResize(colorCubeRef as Ref<HTMLElement>, top, left);
    }
    function isExhibition(event: Event) {
      return isExhibitionColorPicker(
        event as PointerEvent,
        colorCubeRef as Ref<HTMLElement>,
        pickerRef as Ref<HTMLElement>,
        showColorPicker
      );
    }
    onMounted(() => {
      // resize 响应式 colorpicker
      window.addEventListener('resize', resize);
      // 点击展示 colorpicker
      window.addEventListener('click', isExhibition, true);
    });
    // 交互触发item 颜色 面板  动态修改alpha后要还原 alpha 2021.12.18
    const triggerColor = computed(() => {
      const currentColor = (initialColor.value as ColorPickerColor).rgba;
      const trigger = { ...currentColor, a: props.showAlpha ? currentColor.a : 1 };
      return {
        backgroundColor: `${RGBAtoCSS(trigger)}`,
      };
    });
    // 交互面板 的value 值 动态展示 根据不同 type
    const formItemValue = computed(() => {
      return extractColor(initialColor.value as ColorPickerColor, '', formItemText.value, props.showAlpha);
    });
    // 动态 根据当前 透明度修改文本颜色 tips：根据不同 面板颜色 目前 不够优雅
    const textColor = computed(() => {
      // 数字代表 hsv 中的value 值 纵轴 动态切换 文本颜色
      return changeColorValue(initialColor.value as ColorPickerColor, 0.5);
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
    // floating 监听
    function handleWindowScroll() {
      computePosition(colorCubeRef.value as HTMLElement, pickerRef.value as HTMLElement, {
        middleware: [flip()],
      }).then(({ y }) => {
        Object.assign(pickerRef.value?.style as CSSStyleDeclaration, {
          top: `${y}px`,
        });
      });
    }
    const scroll = throttle(handleWindowScroll, 200);
    // 初始化的时候 确定 colopicker位置  由于 pickerref 默认 为 undefined 所以监听 showcolorpicker
    watch(
      () => showColorPicker.value,
      (newValue) => {
        if (!newValue) {
          window.removeEventListener('scroll', scroll);
        }
        newValue &&
          nextTick(() => {
            if (pickerRef.value) {
              window.addEventListener('scroll', scroll);
            }
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

    return () => {
      return (
        <div class="devui-color-picker" ref={colorCubeRef}>
          <div class="devui-color-picker-container">
            <div class="devui-color-picker-container-wrap">
              <div class="devui-color-picker-container-wrap-current-color" style={triggerColor.value}></div>
              <div
                class={[
                  'devui-color-picker-container-wrap-transparent',
                  'devui-color-picker-container-wrap-current-color-transparent',
                ]}></div>
              <div class="devui-color-picker-color-value">
                <p style={textColor.value as StyleValue}>{formItemValue.value}</p>
              </div>
            </div>
          </div>
          <Transition name="color-picker-transition">
            {showColorPicker.value ? (
              <div ref={pickerRef} class={['devui-color-picker-position']}>
                <color-panel
                  v-model={initialColor.value}
                  ref={containerRef}
                  mode={mode.value}
                  onChangeTextColor={changeTextColor}
                  onChangePaletteColor={changePaletteColor}
                  onChangeTextModeType={changeTextModeType}></color-panel>
              </div>
            ) : null}
          </Transition>
        </div>
      );
    };
  },
});
