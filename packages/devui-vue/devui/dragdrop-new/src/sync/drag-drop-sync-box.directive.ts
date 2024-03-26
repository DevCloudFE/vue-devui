import { DirectiveBinding, inject } from 'vue';
import { Subscription } from 'rxjs';
import { DescendantRoot } from './desc-reg.service';
import { DragSyncDescendantRegisterService, DropSortSyncDescendantRegisterService } from './drag-drop-descendant-sync.service';
import { DragDropSyncService } from './drag-drop-sync.service';
import { DragSyncDirective } from './drag-sync.directive';
import { DropSortSyncDirective } from './drop-sort-sync.directive';
import { NgDirectiveBase } from '../directive-base';
import { injectFromContext, provideToContext } from '../utils';

export class DragDropSyncBoxDirective extends NgDirectiveBase {
  static INSTANCE_KEY = '__vueDevuiDragDropSyncBoxDirectiveInstance';
  sub = new Subscription();
  dragSyncList: DescendantRoot<DragSyncDirective>;
  dropSyncList: DescendantRoot<DropSortSyncDirective>;
  constructor(
    private dragDropSyncService: DragDropSyncService,
    private dragSyncDrs: DragSyncDescendantRegisterService,
    private dropSortSyncDrs: DropSortSyncDescendantRegisterService
  ) {
    super();
  }

  ngOnInit() {
    this.dragSyncList = new DescendantRoot<DragSyncDirective>(this.dragSyncDrs);
    this.dropSyncList = new DescendantRoot<DropSortSyncDirective>(this.dropSortSyncDrs);
  }
  ngAfterViewInit() {
    this.dragSyncList.on();
    this.dropSyncList.on();
    this.dragDropSyncService.updateDragSyncList(this.dragSyncList);
    this.dragDropSyncService.updateDropSyncList(this.dropSyncList);
    this.sub.add(this.dragSyncList.changes.subscribe((list) => this.dragDropSyncService.updateDragSyncList(list)));
    this.sub.add(this.dropSyncList.changes.subscribe((list) => this.dragDropSyncService.updateDropSyncList(list)));
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.dragSyncList.off();
    this.dropSyncList.off();
  }
}

export default {
  created(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<{}>, vNode) {
    const context = vNode['ctx'].provides;
    const dragDropSyncService = new DragDropSyncService();
    const dragSyncDrs = new DragSyncDescendantRegisterService();
    const dropSortSyncDrs = new DropSortSyncDescendantRegisterService();
    provideToContext(DragDropSyncService.TOKEN, dragDropSyncService, context);
    provideToContext(DragSyncDescendantRegisterService.TOKEN, dragSyncDrs, context);
    provideToContext(DropSortSyncDescendantRegisterService.TOKEN, dropSortSyncDrs, context);
  },
  mounted(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<{}>, vNode) {
    const context = vNode['ctx'].provides;
    const dragDropSyncService = injectFromContext(DragDropSyncService.TOKEN, context)!;
    const dragSyncDrs = injectFromContext(DragSyncDescendantRegisterService.TOKEN, context)!;
    const dropSortSyncDrs = injectFromContext(DropSortSyncDescendantRegisterService.TOKEN, context)!;
    const dragDropSyncBoxDirective = (el[DragDropSyncBoxDirective.INSTANCE_KEY] = new DragDropSyncBoxDirective(
      dragDropSyncService,
      dragSyncDrs,
      dropSortSyncDrs
    ));
    dragDropSyncBoxDirective.setInput(binding.value);
    dragDropSyncBoxDirective.mounted();
    dragDropSyncBoxDirective.ngOnInit?.();
    setTimeout(() => {
      dragDropSyncBoxDirective.ngAfterViewInit?.();
    }, 0);
  },
  updated(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<{}>) {
    const dragDropSyncBoxDirective = el[DragDropSyncBoxDirective.INSTANCE_KEY] as DragDropSyncBoxDirective;
    dragDropSyncBoxDirective.updateInput(binding.value, binding.oldValue!);
  },
  beforeUnmount(el: HTMLElement & { [props: string]: any }) {
    const dragDropSyncBoxDirective = el[DragDropSyncBoxDirective.INSTANCE_KEY] as DragDropSyncBoxDirective;
    dragDropSyncBoxDirective.ngOnDestroy?.();
  },
};
