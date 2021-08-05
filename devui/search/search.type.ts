import { EventEmitter } from '@angular/core';
export interface SearchProps {
  /**
   * 搜索框尺寸
   * @default ''
   */
   readonly size?: 'lg' | 'sm'
   /**
    * 输入框placeholder
    * @default ''
    */
   placeholder?: string
   /**
    * 输入框的max-length
    * @default Number.MAX_SAFE_INTEGER
    */
   maxLength?: number
  /**
   * debounceTime 的延迟
   * @default 300
   */
  delay?: number
  /**
   * 输入框是否可用
   * @default false
   */
  disabled?: boolean
  /**
   * 输入框是否自动对焦
   * @default false
   */
  autoFocus?: boolean
  /**
   * 是否支持输入值立即出发 searchFn
   * @default false
   */
  isKeyupSearch?: boolean
  /**
   * 搜索图标位置
   * @default ''
   */
  iconPosition?: 'right' | 'left'
  /**
   * 是否显示边框
   * @default false
   */
  noBorder?: boolean
  /**
   * 支持传入类名到输入框上
   * @default ''
   */
   cssClass?: string
  /**
   * 回车或点击搜索按钮触发的回调函数，返回文本框输入的值
   */
  searchFn?: EventEmitter<string>
}
