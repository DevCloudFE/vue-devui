import { EventEmitter } from './preserve-next-event-emitter';
import { DragDropService } from './drag-drop.service';
import { NgDirectiveBase, NgSimpleChanges } from './directive-base';
import { DraggableDirective } from './draggable.directive';
import { DirectiveBinding } from 'vue';
import { injectFromContext } from './utils';
export type BatchDragStyle = 'badge' | 'stack' | string;

export interface IBatchDraggableBinding {
  batchDragGroup?: string;
  batchDragActive?: boolean;
  batchDragLastOneAutoActiveEventKeys?: Array<string>;
  batchDragStyle?: string | Array<string>;
}
export interface IBatchDraggableListener {
  '@batchDragActiveEvent'?: (_: any) => void;
}

export class BatchDraggableDirective extends NgDirectiveBase<IBatchDraggableBinding, IBatchDraggableListener> {
  static INSTANCE_KEY = '__vueDevuiBatchDraggableDirectiveInstance';
  batchDragGroup = 'default';
  batchDragActive = false;
  batchDragLastOneAutoActiveEventKeys = ['ctrlKey'];
  batchDragStyle: Array<BatchDragStyle> = ['badge', 'stack'];
  batchDragActiveEvent = new EventEmitter<any>();
  dragData?: any;
  needToRestore = false;

  constructor(private draggable: DraggableDirective, private dragDropService: DragDropService) {
    super();
    this.draggable.batchDraggable = this;
  }

  ngOnInit() {
    this.initDragDataByIdentity();
  }

  ngOnDestroy() {
    this.draggable.batchDraggable = undefined;
    if (this.dragData) {
      if (this.dragData.draggable === this.draggable) {
        this.dragData.draggable = undefined;
        if (!this.dragData.identity) {
          this.removeFromBatchGroup();
        }
      }
    }
  }

  ngOnChanges(changes: NgSimpleChanges): void {
    if (changes['batchDragActive']) {
      if (!this.initDragDataByIdentity()) {
        if (this.batchDragActive) {
          if (!this.dragData && this.allowAddToBatchGroup()) {
            this.addToBatchGroup();
          }
        } else {
          this.removeFromBatchGroup();
        }
      }
    }
  }
  ngAfterViewInit() {
    if (this.needToRestore) {
      this.restoreDragDataViewAfterViewInit();
      this.needToRestore = false;
    }
  }
  initDragDataByIdentity() {
    const dragData = this.findInBatchDragDataByIdentities();
    if (dragData) {
      if (this.batchDragActive) {
        if (!this.dragData) {
          this.addToBatchGroup(dragData);
          this.registerRestoreDragDataViewAfterViewInitWhiteDragging();
        }
      } else {
        this.removeFromBatchGroup(dragData);
      }
    }
    return dragData;
  }

  registerRestoreDragDataViewAfterViewInitWhiteDragging() {
    if (
      this.dragDropService.draggedEl &&
      this.dragDropService.draggedElIdentity &&
      this.dragDropService.draggedEl !== this.draggable.el.nativeElement
    ) {
      this.needToRestore = true;
    }
  }
  restoreDragDataViewAfterViewInit() {
    const draggable = this.draggable;
    if (draggable.originPlaceholder && draggable.originPlaceholder.show !== false) {
      draggable.insertOriginPlaceholder(true, false);
    }
    draggable.el.nativeElement.style.display = 'none';
  }

  allowAddToBatchGroup() {
    if (!this.dragDropService.batchDragGroup) {
      return true;
    } else {
      return this.batchDragGroup === this.dragDropService.batchDragGroup;
    }
  }
  addToBatchGroup(dragData?: any) {
    this.dragDropService.batchDragGroup = this.dragDropService.batchDragGroup || this.batchDragGroup;
    if (dragData) {
      dragData.draggable = this.draggable;
      dragData.dragData = this.draggable.dragData;
      this.dragData = dragData;
    } else {
      this.dragData = this.dragData || {
        identity: this.draggable.dragIdentity || undefined,
        draggable: this.draggable,
        dragData: this.draggable.dragData,
      };
      this.dragDropService.batchDragData = this.addToArrayIfNotExist(this.dragDropService.batchDragData!, this.dragData);
    }
  }
  removeFromBatchGroup(dragData?: any) {
    this.deleteFromArrayIfExist(this.dragDropService.batchDragData!, dragData || this.dragData);
    this.dragData = undefined;
    if (!(this.dragDropService.batchDragData && this.dragDropService.batchDragData.length)) {
      this.dragDropService.batchDragGroup = undefined;
    }
  }

  private addToArrayIfNotExist(array: any[], target: any) {
    array = array || [];
    if (array.indexOf(target) === -1) {
      array.push(target);
    }
    return array;
  }

  private deleteFromArrayIfExist(array: any[], target: any) {
    if (!array) {
      return;
    }
    if (array.length > 0) {
      const index = array.indexOf(target);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
    return array;
  }

  private findInBatchDragDataByIdentities() {
    if (!this.draggable.dragIdentity) {
      return null;
    } else if (!this.dragDropService.batchDragData) {
      return undefined;
    } else {
      return this.dragDropService.batchDragData.filter((dragData) => dragData.identity === this.draggable.dragIdentity).pop();
    }
  }

  active() {
    this.batchDragActiveEvent.emit({ el: this.draggable.el.nativeElement, data: this.draggable.dragData });
  }

  public updateDragData() {
    // 选中状态才更新
    if (!this.dragData) {
      return;
    }
    // 需要维持内存地址不变
    Object.assign(this.dragData, {
      identity: this.draggable.dragIdentity || undefined,
      draggable: this.draggable,
      dragData: this.draggable.dragData,
    });
  }
}

export default {
  mounted(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<IBatchDraggableBinding & IBatchDraggableListener>, vNode) {
    const context = vNode['ctx'].provides;
    const dragDropService = injectFromContext(DragDropService.TOKEN, context) as DragDropService;
    const draggableDirective = injectFromContext(DraggableDirective.TOKEN, context) as DraggableDirective;
    const batchDraggableDirective = (el[BatchDraggableDirective.INSTANCE_KEY] = new BatchDraggableDirective(
      draggableDirective,
      dragDropService
    ));
    batchDraggableDirective.setInput(binding.value);
    batchDraggableDirective.mounted();
    batchDraggableDirective.ngOnInit?.();
    setTimeout(() => {
      batchDraggableDirective.ngAfterViewInit?.();
    }, 0);
  },
  updated(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<IBatchDraggableBinding & IBatchDraggableListener>) {
    const batchDraggableDirective = el[BatchDraggableDirective.INSTANCE_KEY] as BatchDraggableDirective;
    batchDraggableDirective.updateInput(binding.value, binding.oldValue!);
  },
  beforeUnmount(el: HTMLElement & { [props: string]: any }) {
    const batchDraggableDirective = el[BatchDraggableDirective.INSTANCE_KEY] as BatchDraggableDirective;
    batchDraggableDirective.ngOnDestroy?.();
  },
};
