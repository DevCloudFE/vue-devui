import { App } from 'vue';
import { default as DragDropSyncBox } from './drag-drop-sync-box.directive';
import { default as DragSync } from './drag-sync.directive';
import { default as DropSortSync } from './drop-sort-sync.directive';

export * from './desc-reg.service';
export * from './drag-drop-descendant-sync.service';
export * from './drag-drop-sync.service';
export * from './drag-drop-sync-box.directive';
export * from './drag-sync.directive';
export * from './drop-sort-sync.directive';

export { DragDropSyncBox, DragSync, DropSortSync };

export default {
  title: 'DragDropSync 拖拽同步',
  category: '基础组件',
  install(app: App): void {
    app.directive('dDragDropSyncBox', DragDropSyncBox);
    app.directive('dDragSync', DragSync);
    app.directive('dDropSortSync', DropSortSync);
  },
};
