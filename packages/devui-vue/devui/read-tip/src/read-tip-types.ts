import type { PropType, ExtractPropTypes } from 'vue'

export const readTipProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  readTipOptions : {
    type : Object as PropType<ReadTipOptions>
  },
  defaultTemplateProps : {
    type : Object as PropType<DefaultTemplateProps>
  }
} as const

export type  DefaultTemplateProps = {
  title?: string
  content?: string
  top?: number
  selector: string
  position: string
}

export interface ReadTipOptions {
  trigger?: 'hover' | 'click'
  showAnimate?: boolean
  mouseenterTime?: number
  mouseleaveTime?: number
  position?: 'top' | 'bottom'
  overlayClassName?: string
  appendToBody?: boolean
  rules: ReadTipRules
}

export type ReadTipRules = ReadTipRule | ReadTipRule[];

export interface ReadTipRule {
  key?: string
  selector: string
  trigger?: 'hover' | 'click'
  title?: string
  content?: string
  showAnimate?: boolean
  mouseenterTime?: number
  mouseleaveTime?: number
  position?: 'top' | 'bottom'
  overlayClassName?: string
  appendToBody?: boolean
  //customData与template搭配使用，customData为传入模板的上下文，可以自定义模板内容
  // dataFn?: ({
  //   element,
  //   rule: ReadTipRule,
  // }) => Observable<{ title?: string; content?: string; template?: TemplateRef<any>; customData?: any }>
}


export type ReadTipProps = ExtractPropTypes<typeof readTipProps>
