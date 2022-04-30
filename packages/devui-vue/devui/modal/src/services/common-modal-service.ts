import { h, render, Slots, VNode } from 'vue';

export interface ModalOpenResult {
  hide(): void;
}

export abstract class CommonModalService<Options, Props> {

  constructor(public anchorContainer: HTMLElement) {}

  abstract component(): string;

  abstract open(options: Partial<Options>): ModalOpenResult;

  protected renderModal(anchor: HTMLElement, props: Partial<Props>, children?: Slots): VNode {
    const vnode = h(this.component(), props, children);
    render(vnode, anchor);
    return vnode;
  }

  protected renderNull(anchor: HTMLElement): void {
    // 动画运行完毕后
    setTimeout(() => {
      render(null, anchor);
    }, 500);
  }
}
