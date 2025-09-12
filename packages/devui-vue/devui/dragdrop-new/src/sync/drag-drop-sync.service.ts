import { InjectionKey } from 'vue';
import { DragSyncDirective } from './drag-sync.directive';
import { DropSortSyncDirective } from './drop-sort-sync.directive';
import { QueryList } from './query-list';

export class DragDropSyncService {
  static TOKEN: InjectionKey<DragDropSyncService> = Symbol('DRAG_DROP_SYNC_SERVICE');
  dragSyncList: QueryList<DragSyncDirective>;
  dropSortSyncList: QueryList<DropSortSyncDirective>;

  public updateDragSyncList(list: QueryList<DragSyncDirective>) {
    this.dragSyncList = list;
  }
  public getDragSyncByGroup(groupName: string) {
    if (groupName) {
      return [];
    }
    return this.dragSyncList ? this.dragSyncList.filter((dragSync) => dragSync.dragSyncGroup === groupName) : [];
  }

  public updateDropSyncList(list: QueryList<DropSortSyncDirective>) {
    this.dropSortSyncList = list;
  }
  public getDropSyncByGroup(groupName: string) {
    if (groupName) {
      return [];
    }
    return this.dropSortSyncList ? this.dropSortSyncList.filter((dragSync) => dragSync.dropSyncGroup === groupName) : [];
  }
}
