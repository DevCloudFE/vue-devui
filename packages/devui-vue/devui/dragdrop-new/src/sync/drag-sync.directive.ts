import { DirectiveBinding } from 'vue';
import { Subscription } from 'rxjs';
import { DescendantChildren } from './desc-reg.service';
import { DragSyncDescendantRegisterService } from './drag-drop-descendant-sync.service';
import { DragDropSyncService } from './drag-drop-sync.service';
import { DragDropService } from '../drag-drop.service';
import { DraggableDirective } from '../draggable.directive';
import { injectFromContext } from '../utils';

export interface IDragSyncBinding {
  dragSync?: string;
  dragSyncGroup?: string;
  [props: string]: any;
}
export class DragSyncDirective extends DescendantChildren<DragSyncDirective, IDragSyncBinding> {
  static INSTANCE_KEY = '__vueDevuiDragSyncDirectiveInstance';
  inputNameMap?: { [key: string]: string } | undefined = {
    dragSync: 'dragSyncGroup', // 保持原有api可以正常使用
    dragSyncGroup: 'dragSyncGroup', // 别名，更好理解
  };
  dragSyncGroup = '';
  subscription: Subscription = new Subscription();
  syncGroupDirectives?: Array<DragSyncDirective>;
  public el: { nativeElement: any } = { nativeElement: null };
  constructor(
    el: HTMLElement,
    // @Optional() @Self()
    private draggable: DraggableDirective,
    private dragDropSyncService: DragDropSyncService,
    private dragDropService: DragDropService,
    dragSyncDrs: DragSyncDescendantRegisterService
  ) {
    super(dragSyncDrs);
    this.el.nativeElement = el;
    this.descendantItem = this;
  }

  ngOnInit() {
    if (this.draggable) {
      this.subscription.add(this.draggable.dragElShowHideEvent.subscribe(this.subDragElEvent));
      this.subscription.add(
        this.draggable.beforeDragStartEvent.subscribe(() => {
          this.syncGroupDirectives = this.dragDropSyncService
            .getDragSyncByGroup(this.dragSyncGroup)
            .filter((directive) => directive !== this);
          this.dragDropService.dragSyncGroupDirectives = this.syncGroupDirectives;
        })
      );
      this.subscription.add(
        this.draggable.dropEndEvent.subscribe(() => {
          this.dragDropService.dragSyncGroupDirectives = undefined;
          this.syncGroupDirectives = undefined;
        })
      );
    }
    super.ngOnInit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    super.ngOnDestroy();
  }

  subDragElEvent = (bool: boolean) => {
    this.syncGroupDirectives!.forEach((dir) => this.renderDisplay(dir.el.nativeElement, bool));
  };

  renderDisplay(nativeEl: HTMLElement, bool: boolean) {
    nativeEl.style.display = bool ? '' : 'none';
  }
}

export default {
  mounted(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<IDragSyncBinding>, vNode) {
    const context = vNode['ctx'].provides;
    let draggable = injectFromContext(DraggableDirective.TOKEN, context) as DraggableDirective | undefined;
    if (draggable?.el.nativeElement !== el) {
      draggable = undefined;
    }
    const dragDropSyncService = injectFromContext(DragDropSyncService.TOKEN, context) as DragDropSyncService;
    const dragDropService = injectFromContext(DragDropService.TOKEN, context) as DragDropService;
    const dragSyncDrs = injectFromContext(DragSyncDescendantRegisterService.TOKEN, context) as DragSyncDescendantRegisterService;
    const dragSyncDirective = (el[DragSyncDirective.INSTANCE_KEY] = new DragSyncDirective(
      el,
      draggable!,
      dragDropSyncService,
      dragDropService,
      dragSyncDrs
    ));
    dragSyncDirective.setInput(binding.value);
    dragSyncDirective.mounted();
    dragSyncDirective.ngOnInit?.();
  },
  updated(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<IDragSyncBinding>) {
    const dragSyncDirective = el[DragSyncDirective.INSTANCE_KEY] as DragSyncDirective;
    dragSyncDirective.updateInput(binding.value, binding.oldValue!);
  },
  beforeUnmount(el: HTMLElement & { [props: string]: any }) {
    const dragSyncDirective = el[DragSyncDirective.INSTANCE_KEY] as DragSyncDirective;
    dragSyncDirective.ngOnDestroy?.();
  },
};
