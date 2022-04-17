import { defineComponent, computed, ref, inject } from 'vue';
import { ColorPickerEditProps, colorPickerEditProps } from './color-picker-edit-types';
import { provideColorOptions, ColorPickerColor } from '../../utils/color-utils-types';
import './color-edit.scss';
import { fromHex, fromHexa, fromHSLA, fromHSVA, fromRGBA } from '../../utils/color-utils';
import Schema, { Rules } from 'async-validator';
// 默认 mode
const DEFAUTL_MODE = 'rgb';

// MODE支持模式
const MODE_SUPPORT = ['rgb', 'hex', 'hsl', 'hsv'] as const;

// 色值校验规则
const colorRules: Rules = {
  alpha: [
    {
      type: 'number',
      required: true,
      min: 0,
      max: 1
    }
  ],
  hex: [{ type: 'string', pattern: /^#[0-9a-fA-F]{6}/ }],
  hexa: [{ type: 'string', pattern: /^#[0-9a-fA-F]{6,8}/ }],
  rgba: {
    type: 'object',
    required: true,
    fields: {
      r: { type: 'number', required: true, min: 0, max: 255 },
      g: { type: 'number', required: true, min: 0, max: 255 },
      b: { type: 'number', required: true, min: 0, max: 255 },
      a: { type: 'number', required: true, min: 0, max: 1 }
    }
  },
  hsla: {
    type: 'object',
    required: true,
    fields: {
      h: { type: 'number', required: true, min: 0, max: 360 },
      s: { type: 'number', required: true, min: 0, max: 1 },
      l: { type: 'number', required: true, min: 0, max: 1 },
      a: { type: 'number', required: true, min: 0, max: 1 }
    }
  },
  hsva: {
    type: 'object',
    required: true,
    fields: {
      h: { type: 'number', required: true, min: 0, max: 360 },
      s: { type: 'number', required: true, min: 0, max: 1 },
      v: { type: 'number', required: true, min: 0, max: 1 },
      a: { type: 'number', required: true, min: 0, max: 1 }
    }
  }
};

export default defineComponent({
  name: 'ColorEdit',
  props: colorPickerEditProps,
  emits: ['changeTextModeColor', 'update:modelValue'],
  setup(props: ColorPickerEditProps, { emit }) {
    // 设置showalpha 为false 会报错 2021.12.14
    const isShowAlpha: provideColorOptions = inject('provideData');
    // 模式值
    const modelValue = computed(
      () => `${props.mode ?? DEFAUTL_MODE}${isShowAlpha.showAlpha ? 'a' : ''}`
    );
    // 颜色值
    const colorValue = ref(props.color);
    // 模式值类型
    const modelValueType = computed(() =>
      (props.mode ?? DEFAUTL_MODE) === 'hex' ? 'string' : 'number'
    );

    /**
     * 获取有效颜色值
     * @param color
     * @returns
     */
    function getValidColor(color: ColorPickerColor) {
      const validator = new Schema(colorRules);

      // 使用ColorRules验证有效性
      return new Promise<ColorPickerColor>((resolve, reject) => {
        validator.validate(color, (errors) => {
          errors && console.warn('色值校验异常:', errors);
          errors ? reject() : resolve(color);
        });
      });
    }

    /**
     * 修改Mode值
     */
    function onChangeModel() {
      // 安装MODE_SUPPORT列表进行更换
      const currentIndex = MODE_SUPPORT.findIndex((x) => x === props.mode ?? DEFAUTL_MODE);
      const mode = MODE_SUPPORT[(currentIndex + 1) % MODE_SUPPORT.length];
      emit('changeTextModeColor', mode);
    }

    /**
     * 渲染字符类型组件
     */
    function renderStringValue() {
      // 绑定KEy
      const key = modelValue.value;
      const value = colorValue.value[key];

      const getConvertColor = (v: string) => {
        // 获取转换函数
        const from = isShowAlpha.showAlpha ? fromHexa : fromHex;

        // 获取颜色值
        const color = from(v);

        // 获取色值有效性
        return getValidColor(color);
      };

      /**
       * 更新输入值
       */
      const updateValue = async (event: Event) => {
        const target = event.target as HTMLInputElement;

        getConvertColor(target.value)
          // 如果Color为有效值则进行更新
          .then((color) => (colorValue.value = color))
          // 如果Color为无效值则还原数值
          .catch(() => (target.value = value));
      };

      return (
        <div class='devui-color-picker-edit-input string-input flex'>
          <div class='devui-color-picker-edit-input-wrapper'>
            <input
              value={value}
              onChange={updateValue}
              class='devui-color-picker-edit-input-value'
            />
          </div>
        </div>
      );
    }

    /**
     * 渲染数值类型组件
     * TODO: alpha需要进行白分化显示处理
     * TODO: 监听键盘上下键进行值修改
     */
    function renderNumberValue() {
      // 绑定缩放KEYS
      const scaleKeys = ['s', 'v', 'l'] as const;
      const percentKeys = ['a'] as const;

      const key = modelValue.value;
      // 对指定数值进行缩放处理
      const value = colorValue.value[key.replace(/a?$/, 'a')];

      const getConvertColor = (model) => {
        // 获取转换函数
        const { from } = [
          { mode: ['rgb', 'rgba'], from: fromRGBA },
          { mode: ['hsv', 'hsva'], from: fromHSVA },
          { mode: ['hsl', 'hsla'], from: fromHSLA }
        ].find((x) => x.mode.includes(key));
        // 获取颜色值
        const color = from(isShowAlpha.showAlpha ? model : { ...model, a: 1 });

        // 通过RGBA进行验证有效性
        return getValidColor(color);
      };

      /**
       * 更新输入值
       */
      const updateValue = (k: string) => async (event: Event) => {
        const target = event.target as HTMLInputElement;

        // 获取有效颜色值
        // 无效则进行还原
        // 直接截位取整
        getConvertColor({ ...value, [k]: parseValue(k, target.value) })
          // 如果Color为有效值则进行更新
          .then((color) => (colorValue.value = color))
          // 如果Color为无效值则还原数值
          .catch(() => (target.value = formatValue(k, value[k])));
      };

      /**
       * 将存储值转换为显示值
       * @param k
       * @param v
       * @returns
       */
      function formatValue(k, v: number): string {
        switch (true) {
        case scaleKeys.includes(k):
          return (v * 100).toFixed();
        case percentKeys.includes(k):
          return `${Math.round(v * 100)}%`;
        default:
          return v.toString();
        }
      }

      /**
       * 将显示值转换为存储值
       * @param k
       * @param v
       * @returns
       */
      function parseValue(k, v: string): number {
        switch (true) {
        case scaleKeys.includes(k):
          return parseFloat((parseInt(v) / 100).toFixed(2));
        case percentKeys.includes(k):
          return parseFloat((parseInt(v.replace(/%$/, '')) / 100).toFixed(2));
        default:
          return Number(v);
        }
      }

      /**
       * 方向键修改值处理
       * @returns
       */
      function onKeyChangeValue() {
        return (e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;

          const changeValue = {
            ArrowUp: 1,
            ArrowDown: -1
          }[e.code];

          if (changeValue !== undefined) {
            e.preventDefault();
            const [v] = target.value.match(/\d+/g);
            const newValue = (parseInt(v) + changeValue).toString();
            target.value = target.value.replace(/\d+/g, newValue);
            // 发送数值修改事件
            target.dispatchEvent(new CustomEvent('change'));
          }
        };
      }

      return (
        <div class='devui-color-picker-edit-input number-input flex'>
          {key.split('').map((k: string) => (
            <div class='devui-color-picker-edit-input-wrapper'>
              <input
                onKeydown={onKeyChangeValue()}
                class='devui-color-picker-edit-input-value'
                value={formatValue(k, value[k])}
                onChange={updateValue(k)}
              />
            </div>
          ))}
        </div>
      );
    }

    /**
     * 渲染输入组件
     * @returns
     */
    function renderValueInput() {
      switch (modelValueType.value) {
      case 'string':
        return renderStringValue();
      case 'number':
        return renderNumberValue();
      }
    }

    return () => (
      <div class='devui-color-picker-edit flex'>
        <div class='devui-color-picker-edit-name' onClick={onChangeModel}>
          {modelValue.value.toUpperCase()}
        </div>
        {renderValueInput()}
      </div>
    );
  }
});
