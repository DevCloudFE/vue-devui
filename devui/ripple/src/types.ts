// 插件自动安装 兼容 vue2  vue3 默认通过 hook 安装  本次  插件 详见 ripple-directives.ts

interface IRippleDirectiveOption {
  // @remarks
  /**
   *  你可以设置 ·currentColor· to 能够自动使用元素的文本颜色
   *  default currentColor ： string
   */
  // @default
  color: string
  /**
   * the first appear in this ripple 第一次出现的透明度
   *
   * @default
   * 0.2 默认opacity 0.2
   */
  initialOpacity: number
  /**
   * 在透明度 结束的时候 stopped 的时候 我们设置透明度的大小
   *
   * @default
   * 0.1
   */
  finalOpacity: number
  /**
   * 动画持续事件
   *
   * @default
   * 0.4
   *
   */
  duration: number
  /**
   * css 动画 从开始到结束 以相同的时间来执行动画
   *
   * @default
   * ‘ease-out’
   */
  easing: string
  /**
   * 取消延迟时间
   */
  cancellationPeriod: number
}
interface IRipplePluginOption extends IRippleDirectiveOption {
  /**
   *
   * @remarks
   *
   * @example
   *
   * @default
   * '默认指令ripple
   */
  directive: string
}

const DEFAULT_PLUGIN_OPTIONS: IRipplePluginOption = {
  directive: 'ripple',
  color: 'currentColor',
  initialOpacity: 0.2,
  finalOpacity: 0.1,
  duration: 0.4,
  easing: 'ease-out',
  cancellationPeriod: 75
}

export { DEFAULT_PLUGIN_OPTIONS, IRipplePluginOption, IRippleDirectiveOption }
