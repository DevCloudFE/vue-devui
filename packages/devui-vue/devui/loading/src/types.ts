import type { CSSProperties } from 'vue';
import { ExtractPropTypes, PropType, VNode } from 'vue';

type PositionType = CSSProperties['position'];

export interface LoadingType {
  value: Promise<unknown> | Array<Promise<unknown>> | undefined;
}
export interface BindingType extends LoadingType {
  [key: string]: unknown;
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
  loadingTemplateRef?: VNode['component'];
  backdrop?: boolean = true;
  positionType?: PositionType = 'relative';
  view?: View = new View();
  zIndex?: number;
}

export type ComponentProps = ExtractPropTypes<typeof componentProps>;

export interface TargetHTMLElement extends HTMLElement {
  mask?: HTMLElement;
  instance?: VNode['component'];
  options?: LoadingProps;
}
