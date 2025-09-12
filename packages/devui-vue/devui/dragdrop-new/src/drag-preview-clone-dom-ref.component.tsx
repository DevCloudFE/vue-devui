import { DragDropService } from './drag-drop.service';
import { NgDirectiveBase, NgSimpleChanges } from './directive-base';
import {
  PropType,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  onUpdated,
  watch,
} from 'vue';

export interface IDragPreviewCloneDomRefBinding {
  domRef?: HTMLElement;
  copyStyle?: boolean;
  [props: string]: any;
}

export class DragPreviewCloneDomRefComponent extends NgDirectiveBase<IDragPreviewCloneDomRefBinding> {
  static NAME = 'd-drag-preview-clone-dom-ref';
  domRef: HTMLElement;
  copyStyle = true;
  cloneNode;
  constructor(public el: { nativeElement: any }, private dragDropService: DragDropService) {
    super();
  }
  ngAfterViewInit() {
    if (!this.cloneNode) {
      this.createView();
    }
  }
  ngOnChanges(changes: NgSimpleChanges) {
    if (changes['domRef']) {
      if (this.cloneNode) {
        this.destroyView();
        this.createView();
      } else {
        this.createView();
      }
    }
  }
  ngOnDestroy() {
    if (this.cloneNode) {
      this.destroyView();
    }
  }

  createView() {
    if (this.domRef) {
      this.cloneNode = this.domRef.cloneNode(true);
      if (this.copyStyle) {
        this.dragDropService.copyStyle(this.domRef, this.cloneNode);
      }
      setTimeout(() => {
        this.el.nativeElement.appendChild(this.cloneNode);
      }, 0);
    }
  }
  destroyView() {
    if (this.cloneNode) {
      if (this.el.nativeElement.contains(this.cloneNode)) {
        this.el.nativeElement.removeChild(this.cloneNode);
      }
      this.cloneNode = undefined;
    }
  }

  public updateTemplate() {
    // do nothing 保持api一致
  }
}
export default defineComponent({
  name: 'DDragPreviewCloneDomRef',
  props: {
    domRef: Object as PropType<HTMLElement>,
    copyStyle: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { expose }) {
    const el: { nativeElement: any } = { nativeElement: null };
    const dragDropService = inject(DragDropService.TOKEN);
    const instance = new DragPreviewCloneDomRefComponent(el, dragDropService!);

    instance.setInput(props as any);
    onMounted(() => {
      instance.mounted();
      nextTick(() => {
        instance.ngAfterViewInit?.();
      });
    });
    watch(
      () => props,
      (binding, oldBinding) => {
        instance.updateInput(binding as any, oldBinding as any);
      }
    );
    onBeforeUnmount(() => {
      instance.ngOnDestroy?.();
    });

    expose({
      instance,
    });
    return () => <div ref={(e) => (el.nativeElement = e)}></div>;
  },
});
