import { DragSyncDirective } from './drag-sync.directive';
import { DropSortSyncDirective } from './drop-sort-sync.directive';
import { DescendantRegisterService } from './desc-reg.service';
import { InjectionKey } from 'vue';

export class DragSyncDescendantRegisterService extends DescendantRegisterService<DragSyncDirective> {
  static TOKEN: InjectionKey<DragSyncDescendantRegisterService> = Symbol('DRAG_SYNC_DR_SERVICE');
}
export class DropSortSyncDescendantRegisterService extends DescendantRegisterService<DropSortSyncDirective> {
  static TOKEN: InjectionKey<DropSortSyncDescendantRegisterService> = Symbol('DROP_SORT_SYNC_DR_SERVICE');
}
