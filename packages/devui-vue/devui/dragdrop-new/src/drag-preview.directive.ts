import { InjectionKey, createApp, DirectiveBinding, getCurrentInstance, createBaseVNode, render } from 'vue';
import { NgDirectiveBase } from './directive-base';
import { DragDropService } from './drag-drop.service';
import DragPreview, { IDragPreviewTemplate } from './drag-preview.component';
import { injectFromContext, provideToContext } from './utils';

export interface IDragPreviewBinding {
  dragPreview?: IDragPreviewTemplate;
  dragPreviewData?: any;
  dragPreviewOptions?: {
    skipBatchPreview: boolean;
  };
  [props: string]: any;
  context;
}
export class DragPreviewDirective extends NgDirectiveBase<IDragPreviewBinding> {
  static INSTANCE_KEY = '__vueDevuiDragPreviewDirectiveInstance';
  static TOKEN: InjectionKey<DragPreviewDirective> = Symbol('DRAG_PREVIEW_DIRECTIVE_TOKEN');
  inputNameMap?: { [key: string]: string } | undefined = {
    dragPreview: 'dragPreviewTemplate',
  };
  dragPreviewTemplate: IDragPreviewTemplate;
  dragPreviewData;
  dragPreviewOptions = {
    skipBatchPreview: false,
  };
  public previewRef;
  public context;
  el: { nativeElement: any } = { nativeElement: null };
  constructor(el: HTMLElement, private dragDropService: DragDropService) {
    super();
    this.el.nativeElement = el;
  }

  public createPreview() {
    const context = {
      data: this.dragPreviewData,
      draggedEl: this.dragDropService.draggedEl,
      dragData: this.dragDropService.dragData,
      batchDragData: this.dragDropService.batchDragData && this.dragDropService.getBatchDragData(),
      dragSyncDOMElements: this.dragDropService.dragSyncGroupDirectives && this.getDragSyncDOMElements(),
    };
    const app = createApp(DragPreview, { context, template: this.dragPreviewTemplate?.template });
    // 这里用hack的手法来讲当前的上下文川给新的模板组件
    app._context.provides = Object.create(this.context);
    const element = document.createElement('div');
    const instance = app.mount(element);
    const unmount = () => {
      app.unmount();
    };

    this.previewRef = {
      instance,
      element,
      unmount,
    };
  }

  public destroyPreview() {
    if (this.previewRef) {
      this.previewRef.unmount();
      this.previewRef = undefined;
    }
  }

  public getPreviewElement() {
    return this.previewRef && this.previewRef.element;
  }
  private getDragSyncDOMElements() {
    return this.dragDropService.dragSyncGroupDirectives.map((dir) => dir.el.nativeElement);
  }
}

export default {
  mounted(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<IDragPreviewBinding>, vNode) {
    const context = vNode['ctx'].provides;
    const dragDropService = injectFromContext(DragDropService.TOKEN, context) as DragDropService;
    const dragPreviewDirective = (el[DragPreviewDirective.INSTANCE_KEY] = new DragPreviewDirective(el, dragDropService));
    provideToContext(DragPreviewDirective.TOKEN, dragPreviewDirective, context);
    dragPreviewDirective.setInput({ context });
    dragPreviewDirective.setInput(binding.value);
    dragPreviewDirective.mounted();
  },
  updated(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<IDragPreviewBinding>) {
    const dragPreviewDirective = el[DragPreviewDirective.INSTANCE_KEY] as DragPreviewDirective;
    dragPreviewDirective.updateInput(binding.value, binding.oldValue!);
  },
};
