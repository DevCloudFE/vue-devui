export type SpriteMode = 'default' | 'sprite';

export interface SpriteOption {
  top: string;
  left: string;
  zIndex: number;
}
export interface NavMenu {
  originEle: HTMLElement;
  label: string;
  level: number;
  scrollPosition: {
    top: number;
    startLine: number;
  };
}
export const navSpriteProps = {
  // // 爬取目录的容器
  target: {
    type: Object,
  },
  // // 指定滚动的DOM
  scrollTarget: {
    type: Object,
  },
  // // 矫正参数
  view: {
    type: Object as () => {
      top?: number;
      bottom?: number;
    },
    default: { top: 0, bottom: 0 }
  },
  // // 支持锚点
  hashSupport: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String as () => SpriteMode,
    default: 'default'
  },
  maxLevel: {
    type: Number,
    default: 3
  },
  title: {
    type: String,
    default: 'menu'
  },
  // 缩进
  indent: {
    type: Number,
    default: 2
  },
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 400
  },
  // sprite模式下的初始状态
  isOpen: {
    type: Boolean,
    default: true
  },
  // sprite模式下的初始位置
  spriteOption: {
    type: Object as () => SpriteOption,
  }
};
