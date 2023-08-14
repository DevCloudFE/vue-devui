import type { App } from 'vue';
import DraggableDirective from './src/draggable-directive';
import DroppableDirective from './src/droppable-directive';
import SortableDirective from './src/sortable-directive';

export { DraggableDirective, DroppableDirective, SortableDirective };

export default {
  title: 'Dragdrop 拖拽',
  category: '演进中',
  status: '100%',
  install(app: App): void {
    app.directive('DSortable', SortableDirective);
  }
};
