/**
 * 定义组件 style
 */
import { CascaderProps, RootStyleFeedback, CascaderulProps, DropdownStyleFeedback } from '../src/cascader-types';
// 根节点样式
export const useRootStyle = (props: CascaderProps): RootStyleFeedback => {
  return {
    inputWidth: `width: ${props.width}px`,
  };
};

// 弹出层样式
export const useDropdownStyle = (props: CascaderulProps): DropdownStyleFeedback => {
  return {
    dropdownWidth: `width: ${props?.dropdownWidth}px`
  };
};
