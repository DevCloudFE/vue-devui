import { App } from 'vue';
import { DragDropService } from './src/drag-drop.service';
import { default as Draggable } from './src/draggable.directive';
import { default as Droppable } from './src/droppable.directive';
import { default as Sortable } from './src/sortable.directive';
import { default as DropScrollEnhanced, DropScrollEnhancedSide } from './src/drop-scroll-enhance.directive';
import { default as BatchDraggable } from './src/batch-draggable.directive';
import { default as DragPreview } from './src/drag-preview.directive';
import { DragPreviewTemplate } from './src/drag-preview.component';
import { default as DragPreviewCloneDomRef } from './src/drag-preview-clone-dom-ref.component';
import { default as useDragDropSort } from './src/sync';

export * from './src/drag-drop.service';
export * from './src/draggable.directive';
export * from './src/droppable.directive';
export * from './src/sortable.directive';
export * from './src/drop-scroll-enhance.directive';
export * from './src/batch-draggable.directive';
export * from './src/drag-preview.component';
export * from './src/drag-preview.directive';
export * from './src/drag-preview-clone-dom-ref.component';
export * from './src/sync';

export { Draggable, Droppable, Sortable, DropScrollEnhanced };

export default {
  title: 'DragDrop 2.0 拖拽',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.directive('dDraggable', Draggable);
    app.directive('dDroppable', Droppable);
    app.directive('dSortable', Sortable);
    app.directive('dDropScrollEnhanced', DropScrollEnhanced);
    app.directive('dDropScrollEnhancedSide', DropScrollEnhancedSide);
    app.directive('dDraggableBatchDrag', BatchDraggable);
    app.directive('dDragPreview', DragPreview);
    app.component('DDragPreviewTemplate', DragPreviewTemplate);
    app.component(DragPreviewCloneDomRef.name, DragPreviewCloneDomRef);
    app.provide(DragDropService.TOKEN, new DragDropService());
    app.use(useDragDropSort);
  },
};
