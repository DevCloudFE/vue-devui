import { ExtractPropTypes, PropType, VNode } from 'vue';

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' |'sticky';

export interface LoadingType {
  value: Promise<any> | Array<Promise<any>> | undefined;
}
export interface BindingType extends LoadingType {
  [key: string]: any;
}
export interface TargetHTMLElement extends HTMLElement {
  mask?: HTMLElement;
  instance?: VNode | any;
  options?: LoadingProps;
}

class View {
  top?: string = '50%';
  left?: string = '50%';
}
export const componentProps = {
  message: String,
  backdrop: Boolean,
  view: {
    type: Object as PropType<View>,
    default: () => (new View())
  },
  zIndex: Number,
  isFull: {
    type: Boolean,
    default: false
  }
} as const;

export class LoadingProps {
  target?: Element | null;
  message?: string;
  loadingTemplateRef?: any;
  backdrop?: boolean = true;
  positionType?: PositionType = 'relative';
  view?: View = new View();
  zIndex?: number;
}

export type ComponentProps = ExtractPropTypes<typeof componentProps>;
