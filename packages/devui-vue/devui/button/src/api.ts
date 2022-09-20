import { PropType } from 'vue';
import { IButtonColor, IButtonShape, IButtonSize, IButtonVariant } from './button-types';

export const buttonProps = {
  variant: {
    type: String as PropType<IButtonVariant>,
    typeName: 'IButtonVariant',
    default: 'outline',
    desc: '按钮形态',
    demo: '形态',
  },
  color: {
    type: String as PropType<IButtonColor>,
    typeName: 'IButtonColor',
    defaultName: 'secondary',
    desc: '按钮主题',
    demo: '主题色',
  },
  size: {
    type: String as PropType<IButtonSize>,
    typeName: 'IButtonSize',
    default: 'md',
    desc: '按钮尺寸',
    demo: '尺寸',
  },
  icon: {
    type: String,
    default: '',
    desc: '	自定义按钮图标',
    demo: '图标按钮',
  },
  shape: {
    type: String as PropType<IButtonShape>,
    typeName: 'IButtonShape',
    desc: '按钮形状(圆形/圆角)',
    demo: '图标按钮',
  },
  disabled: {
    type: Boolean,
    default: false,
    desc: '是否禁用',
    demo: '禁用状态',
  },
  loading: {
    type: Boolean,
    default: false,
    desc: '设置加载中状态',
    demo: '加载中状态',
  },
} as const;
