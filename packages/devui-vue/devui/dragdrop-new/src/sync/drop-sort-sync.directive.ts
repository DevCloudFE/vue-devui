import { DirectiveBinding } from 'vue';
import { Subscription } from 'rxjs';
import { DescendantChildren } from './desc-reg.service';
import { DropSortSyncDescendantRegisterService } from './drag-drop-descendant-sync.service';
import { DragDropSyncService } from './drag-drop-sync.service';
import { Utils, injectFromContext } from '../utils';
import { DroppableDirective, type DragPlaceholderInsertionEvent, type DragPlaceholderInsertionIndexEvent } from '../droppable.directive';

export interface IDropSortSyncBinding {
  dropSortSync?: string;
  dropSyncGroup?: string;
  dropSyncDirection?: 'v' | 'h';
  [props: string]: any;
}
export class DropSortSyncDirective extends DescendantChildren<DropSortSyncDirective, IDropSortSyncBinding> {
  static INSTANCE_KEY = '__vueDevuiDropSortSyncDirectiveInstance';
  inputNameMap?: { [key: string]: string } | undefined = {
    dropSortSync: 'dropSyncGroup',
    dropSyncGroup: 'dropSyncGroup',
    dropSyncDirection: 'direction',
  };
  dropSyncGroup = '';
  direction: 'v' | 'h' = 'v'; // 与sortContainer正交的方向
  subscription: Subscription = new Subscription();
  syncGroupDirectives: Array<DropSortSyncDirective>;
  placeholder: HTMLElement;
  sortContainer: HTMLElement;
  public el: { nativeElement: any } = { nativeElement: null };
  constructor(
    el: HTMLElement,
    // @Optional() @Self()
    private droppable: DroppableDirective,
    private dragDropSyncService: DragDropSyncService,
    dropSortSyncDrs: DropSortSyncDescendantRegisterService
  ) {
    super(dropSortSyncDrs);
    this.el.nativeElement = el;
    this.descendantItem = this;
  }

  ngOnInit() {
    this.sortContainer = this.el.nativeElement;
    if (this.droppable) {
      this.sortContainer = this.droppable.getSortContainer();
      this.subscription.add(this.droppable.placeholderInsertionEvent.subscribe(this.subInsertionEvent));
      this.subscription.add(this.droppable.placeholderRenderEvent.subscribe(this.subRenderEvent));
    }
    super.ngOnInit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
  subRenderEvent = (nativeStyle: { width: number; height: number }) => {
    this.syncGroupDirectives = this.dragDropSyncService.getDropSyncByGroup(this.dropSyncGroup).filter((directive) => directive !== this);
    this.syncGroupDirectives.forEach((dir) => {
      dir.renderPlaceholder(nativeStyle, this.droppable);
    });
  };

  subInsertionEvent = (cmd: DragPlaceholderInsertionIndexEvent) => {
    this.syncGroupDirectives = this.dragDropSyncService.getDropSyncByGroup(this.dropSyncGroup).filter((directive) => directive !== this);
    this.syncGroupDirectives.forEach((dir) => {
      dir.insertPlaceholderCommand({
        command: cmd.command,
        container: dir.sortContainer,
        relatedEl: dir.getChildrenElByIndex(dir.sortContainer, cmd.index)!,
      });
    });
  };
  getChildrenElByIndex(target, index?) {
    if (index === undefined || (target && target.children && target.children.length < index) || index < 0) {
      return null;
    }
    return this.sortContainer.children.item(index);
  }

  renderPlaceholder(nativeStyle: { width: number; height: number }, droppable) {
    if (!this.placeholder) {
      this.placeholder = document.createElement(droppable.placeholderTag);
      this.placeholder.className = 'drag-placeholder';
      this.placeholder.classList.add('drag-sync-placeholder');
      this.placeholder.innerText = droppable.placeholderText;
    }
    const { width, height } = nativeStyle;
    if (this.direction === 'v') {
      this.placeholder.style.width = width + 'px';
      this.placeholder.style.height = this.sortContainer.getBoundingClientRect().height + 'px';
    } else {
      this.placeholder.style.height = height + 'px';
      this.placeholder.style.width = this.sortContainer.getBoundingClientRect().width + 'px';
    }
    Utils.addElStyles(this.placeholder, droppable.placeholderStyle);
  }

  insertPlaceholderCommand(cmd: DragPlaceholderInsertionEvent) {
    if (cmd.command === 'insertBefore' && cmd.container) {
      cmd.container.insertBefore(this.placeholder, cmd.relatedEl!);
      return;
    }
    if (cmd.command === 'append' && cmd.container) {
      cmd.container.appendChild(this.placeholder);
      return;
    }
    if (cmd.command === 'remove' && cmd.container) {
      if (cmd.container.contains(this.placeholder)) {
        cmd.container.removeChild(this.placeholder);
      }
      return;
    }
  }
}

export default {
  mounted(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<IDropSortSyncBinding>, vNode) {
    const context = vNode['ctx'].provides;
    let droppable = injectFromContext(DroppableDirective.TOKEN, context) as DroppableDirective | undefined;
    if (droppable?.el.nativeElement !== el) {
      droppable = undefined;
    }
    const dragDropSyncService = injectFromContext(DragDropSyncService.TOKEN, context) as DragDropSyncService;
    const dropSortSyncDrs = injectFromContext(
      DropSortSyncDescendantRegisterService.TOKEN,
      context
    ) as DropSortSyncDescendantRegisterService;
    const dropSortSyncDirective = (el[DropSortSyncDirective.INSTANCE_KEY] = new DropSortSyncDirective(
      el,
      droppable!,
      dragDropSyncService,
      dropSortSyncDrs
    ));
    dropSortSyncDirective.setInput(binding.value);
    dropSortSyncDirective.mounted();
    dropSortSyncDirective.ngOnInit?.();
  },
  updated(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<IDropSortSyncBinding>) {
    const dropSortSyncDirective = el[DropSortSyncDirective.INSTANCE_KEY] as DropSortSyncDirective;
    dropSortSyncDirective.updateInput(binding.value, binding.oldValue!);
  },
  beforeUnmount(el: HTMLElement & { [props: string]: any }) {
    const dropSortSyncDirective = el[DropSortSyncDirective.INSTANCE_KEY] as DropSortSyncDirective;
    dropSortSyncDirective.ngOnDestroy?.();
  },
};
