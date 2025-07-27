import { galaxyTheme, infinityTheme } from './extend-theme';
// @ts-ignore
import Color from 'color';
import { ColorHierarchyMap } from './color-hierarchy';

type HslModelKey = 'h' | 's' | 'l' | 'a' | 'sp' | 'lp' | 'ap';
type HsvModelKey = 'h' | 's' | 'v' | 'a' | 'sp' | 'vp' | 'ap';

export interface IColorOffset {
  hsl?: {
    [p in HslModelKey]?: number;
  };
  hsv?: {
    [p in HsvModelKey]?: number;
  };
}

type ISingleOffset = { [p in HslModelKey]?: number } | { [p in HsvModelKey]?: number };

interface IColorObject {
  colorName?: string;
  color?: Color;
  extends?: Color;
  offset?: IColorOffset;
}

interface IColorHierarchy {
  [colorName: string]: {
    'default-value'?: string;
    extends?: string;
    dependency?: string | Array<string>;
    offset?: {
      hsl?: {
        [p in HslModelKey]?: number;
      };
      hsv?: {
        [p in HsvModelKey]?: number;
      };
    };
  };
}

interface IThemeData {
  [colorName: string]: string;
}

export interface IColorDef {
  colorName?: string;
  color?: string;
}

// hsl | hsv | 浓郁 | 柔和 | 轻快 | 对比 |
export type IEffect = 'hsl' | 'hsv' | 'strong' | 'soft' | 'light' | 'contrast';

/**
 * 自定义主题生成工具类
 * 提供生成主题色数据、更新颜色、填补空缺颜色等功能。
 */
export class CustomThemeUtils {
  /**
   * 生成主题色数据
   */
  public static genThemeData(
    colorChanges: Array<IColorDef>,
    isDark = false,
    effect?: IEffect,
    options: {
      colorHierarchy: any;
      themeDataLight: IThemeData;
      themeDataDark: IThemeData;
    } = {
      colorHierarchy: ColorHierarchyMap,
      themeDataLight: infinityTheme.data,
      themeDataDark: galaxyTheme.data,
    }
  ): IThemeData {
    const themeData = isDark ? options.themeDataDark : options.themeDataLight;
    const pattern = CustomThemeUtils.genColorPattern(options.colorHierarchy, themeData);
    const updatedPattern = CustomThemeUtils.updateColor(colorChanges, pattern, effect);
    CustomThemeUtils.fillEmptyColor(updatedPattern, effect);
    return CustomThemeUtils.pattern2ThemeData(updatedPattern);
  }

  // 根据颜色层次结构和主题数据生成颜色模式
  private static genColorPattern(colorHierarchy: IColorHierarchy, themeData: IThemeData): IColorHierarchy {
    const pattern: IColorHierarchy = {};
    const offset = CustomThemeUtils.getThemeOffset(colorHierarchy, themeData);
    offset.forEach((obj) => {
      pattern[obj.colorName!] = {
        ...colorHierarchy[obj.colorName!],
        'default-value': themeData[obj.colorName!],
        offset: obj.offset,
      };
    });
    return pattern;
  }

  // 计算每个颜色与其父级颜色的偏移量
  private static getThemeOffset(colorHierarchy: IColorHierarchy, themeData: IThemeData): Array<IColorObject> {
    const colorKeys = Object.keys(colorHierarchy);
    const themeColorOffset = colorKeys
      .map(
        (key) =>
          ({
            colorName: key,
            color: Color(themeData[key]),
            extends: colorHierarchy[key].extends ? Color(themeData[colorHierarchy[key].extends]) : null,
          } as IColorObject)
      )
      .map((colorObj) => {
        if (colorObj.extends) {
          colorObj.offset = {
            hsl: CustomThemeUtils.getColorOffset(colorObj.color, colorObj.extends, 'hsl'),
            hsv: CustomThemeUtils.getColorOffset(colorObj.color, colorObj.extends, 'hsv'),
          };
        }
        return colorObj;
      });
    return themeColorOffset;
  }

  // 计算两种颜色在HSL/HSV模型下的差异（偏移量）
  private static getColorOffset(target: Color, source: Color, mode: 'hsl' | 'hsv'): ISingleOffset {
    const targetModel = target[mode]();
    const sourceModel = source[mode]();
    const key = mode.split('');
    const offset = {
      [key[0]]: targetModel.color[0] - sourceModel.color[0],
      [key[1]]: targetModel.color[1] - sourceModel.color[1],
      [key[2]]: targetModel.color[2] - sourceModel.color[2],
      a: targetModel.valpha - sourceModel.valpha,
    };
    const percent = {
      [key[1] + 'p']:
        offset[key[1]] > 0 ? (offset[key[1]] * 100) / (100 - sourceModel.color[1]) : (offset[key[1]] * 100) / sourceModel.color[1],
      [key[2] + 'p']:
        offset[key[2]] > 0 ? (offset[key[2]] * 100) / (100 - sourceModel.color[2]) : (offset[key[2]] * 100) / sourceModel.color[2],
      ap: offset.a > 0 ? (offset.a * 100) / (1 - sourceModel.valpha) : (offset.a * 100) / sourceModel.valpha,
    };
    return {
      ...offset,
      ...percent,
    };
  }

  // 更新颜色层次结构中的颜色值
  private static updateColor(colorChanges: Array<IColorDef>, colorHierarchy: IColorHierarchy, effect?: IEffect) {
    const changeKeys = colorChanges.map((change) => change.colorName);
    const changeStack = [...changeKeys];
    const colorKeys = Object.keys(colorHierarchy);
    const pattern = JSON.parse(JSON.stringify(colorHierarchy)) as IColorHierarchy;
    let count = 0;
    while (changeStack.length) {
      const handleKey = changeStack.splice(0, 1).pop()!;
      if (count < changeKeys.length) {
        pattern[handleKey]['default-value'] = colorChanges[count].color;
      } else {
        const extendsKey = pattern[handleKey].extends!;
        const extendsColor = Color(pattern[extendsKey]['default-value']);
        const colorOffset = pattern[handleKey].offset;
        const { mode, offset } = CustomThemeUtils.getColorEffectOffset(extendsColor, colorOffset, effect);
        pattern[handleKey]['default-value'] = CustomThemeUtils.getHexOrRgba(CustomThemeUtils.getColorValue(extendsColor, offset, mode));
      }

      colorKeys.forEach((colorName) => {
        if (handleKey === pattern[colorName].extends) {
          if (!(changeStack.indexOf(colorName) > -1) && !(changeKeys.indexOf(colorName) > -1)) {
            // 如果不是changeStackUI经做过标记，或者ChangeKeys直接指定了颜色，则标记为需要更新
            changeStack.push(colorName);
          }
        }
      });
      count++;
    }
    return pattern;
  }

  // 填补未指定颜色的项，保证主题色板完整。
  private static fillEmptyColor(pattern: IColorHierarchy, effect: IEffect | undefined) {
    const colorKeys = Object.keys(pattern);
    const noColorArray = colorKeys
      .map((colorName) => ({
        colorName: colorName,
        pattern: pattern[colorName],
      }))
      .filter((color) => !color.pattern['default-value']);
    noColorArray.forEach((color) => {
      const handleKey = color.colorName;
      const extendsKey = pattern[handleKey].extends!;
      const extendsColor = Color(pattern[extendsKey]['default-value']);
      const colorOffset = pattern[handleKey].offset;
      const { mode, offset } = CustomThemeUtils.getColorEffectOffset(extendsColor, colorOffset, effect);
      pattern[handleKey]['default-value'] = CustomThemeUtils.getHexOrRgba(CustomThemeUtils.getColorValue(extendsColor, offset, mode));
    });
  }

  // 根据不同风格（如浓郁、柔和等）调整偏移量，生成不同风格的主题色。
  private static getColorEffectOffset(source: Color, colorOffset: IColorOffset | any, effect?: IEffect) {
    let result: any = {};
    switch (effect) {
      case 'hsl':
        result = {
          mode: 'hsl',
          offset: colorOffset.hsl,
        };
        break;
      case 'hsv':
        result = {
          mode: 'hsv',
          offset: colorOffset.hsv,
        };
        break;
      case 'strong':
        result = {
          mode: 'hsl',
          offset: {
            ...colorOffset.hsl,
            sp:
              colorOffset?.hsl?.sp! > 0
                ? CustomThemeUtils.minmax(colorOffset?.hsl?.sp! * 1.3, colorOffset?.hsl?.sp!, 100)
                : colorOffset?.hsl?.sp! * 0.75,
          },
        };
        break;
      case 'soft':
        result = {
          mode: 'hsv',
          offset: {
            ...colorOffset.hsv,
            sp:
              colorOffset?.hsv?.sp! > 0
                ? CustomThemeUtils.minmax(colorOffset?.hsv?.sp! * 1.25, colorOffset?.hsv?.sp!, 100)
                : colorOffset?.hsv?.sp! * 0.5,
          },
        };
        break;
      case 'light':
        result = {
          mode: 'hsl',
          offset: {
            ...colorOffset.hsl,
            lp:
              colorOffset?.hsl?.lp! > 0
                ? CustomThemeUtils.minmax(colorOffset?.hsl?.lp!, colorOffset?.hsl?.lp!, 100)
                : colorOffset?.hsl?.lp! * 0.2,
          },
        };
        break;
      case 'contrast': // 需要计算后的颜色，未支持
        result = {
          mode: 'hsl',
          offset: {
            ...colorOffset.hsl,
          },
        };
        break;
      default:
        result = {
          mode: 'hsl',
          offset: colorOffset.hsl,
        };
        break;
    }
    return result;
  }

  // 将内部颜色层级结构转换为最终的主题色数据对象
  private static pattern2ThemeData(pattern: IColorHierarchy): IThemeData {
    const themeData: any = {};
    const colorKeys = Object.keys(pattern);
    colorKeys.forEach((colorName) => {
      themeData[colorName] = pattern[colorName]['default-value'];
    });
    return themeData;
  }

  // 根据偏移量和模式，计算实际的颜色值。
  private static getColorValue(source: Color, offset: any, mode: 'hsl' | 'hsv') {
    const sourceModel = source[mode]();
    const key = mode.split('');
    const value = {
      [key[0]]: (sourceModel.color[0] + offset[key[0]]) % 360,
      [key[1]]:
        offset[key[1] + 'p'] > 0
          ? sourceModel.color[1] + (offset[key[1] + 'p'] * (100 - sourceModel.color[1])) / 100
          : sourceModel.color[1] + (sourceModel.color[1] * offset[key[1] + 'p']) / 100,
      [key[2]]:
        offset[key[2] + 'p'] > 0
          ? sourceModel.color[2] + (offset[key[2] + 'p'] * (100 - sourceModel.color[2])) / 100
          : sourceModel.color[2] + (sourceModel.color[2] * offset[key[2] + 'p']) / 100,
      a:
        offset.ap! > 0
          ? sourceModel.valpha + (offset.ap! * (1 - sourceModel.valpha)) / 100
          : sourceModel.valpha + (sourceModel.valpha * offset.ap!) / 100,
    };
    return Color([value[key[0]], value[key[1]], value[key[2]], value.a], mode);
  }

  // 输出颜色的十六进制或rgba字符串
  private static getHexOrRgba(color: Color) {
    if (color.alpha() < 1) {
      const rgb = color.rgb();
      const [r, g, b] = rgb.color;
      const a = rgb.valpha;
      return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
    } else {
      return color.hex();
    }
  }

  private static minmax(v: number, min: number, max: number) {
    if (v < min) {
      return min;
    }
    if (v > max) {
      return max;
    }
    return v;
  }
}
