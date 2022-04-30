import type { PropType, ExtractPropTypes } from 'vue';

export type Position = 'top' | 'left' | 'right' | 'bottom';
export type Trigger = 'hover' | 'click';

export interface ReadTipRule {
  id?: string;
  key?: string;
  selector: string | null;
  trigger?: Trigger;
  title?: string;
  content?: string;
  showAnimate?: boolean;
  mouseenterTime?: number;
  mouseleaveTime?: number;
  position?: Position;
  overlayClassName?: string;
  appendToBody?: boolean;
  status?: boolean;
  // customData与template搭配使用，customData为传入模板的上下文，可以自定义模板内容
  dataFn?: ({
    element,
    rule: ReadTipRule,
  }) => { title?: string; content?: string };
}

export type ReadTipRules = ReadTipRule | ReadTipRule[];

export type DefaultTemplateProps = {
  title?: string;
  content?: string;
  selector?: string;
  position?: string;
  id?: string;
  temp?: string;
  dom?: Element;
  contentTemplate?: boolean;
  overlayClassName?: string;
  dataFn?: ({
    element,
    rule: ReadTipRule,
  }) => { title?: string; content?: string };
  appendToBody?: boolean;
};

export interface ReadTipOptions {
  trigger?: Trigger;
  showAnimate?: boolean;
  mouseenterTime?: number;
  mouseleaveTime?: number;
  position?: Position;
  overlayClassName?: string;
  appendToBody?: boolean;
  rules: ReadTipRules;

}

export const readTipProps = {
  readTipOptions: {
    type: Object as PropType<ReadTipOptions>
  },
  defaultTemplateProps: {
    type: Object as PropType<DefaultTemplateProps>
  }
} as const;

export type ReadTipProps = ExtractPropTypes<typeof readTipProps>;
