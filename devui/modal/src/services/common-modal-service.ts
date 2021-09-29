import { h, render, Slots } from 'vue';

export interface ModalOpenResult {
  hide(): void
}

export abstract class CommonModalService<Options, Props> {

  constructor(public anchorContainer: HTMLElement) {}

  abstract component(): any;

  abstract open(options: Partial<Options>): ModalOpenResult;

  protected renderModal(anchor: HTMLElement, props: Partial<Props>, children?: Slots): void {
    setTimeout(() => {
      render(h(this.component(), props, children), anchor);
    }, 0);
  }

  protected renderNull(anchor: HTMLElement): void {
    // 动画运行完毕后
    setTimeout(() => {
      render(null, anchor);      
    }, 500);
  }
}