import type { App } from 'vue'
import DraggableDirective from './src/draggable-directive'
import DroppableDirective from './src/droppable-directive'

export { DraggableDirective, DroppableDirective }

export default {
  title: 'Dragdrop 拖拽',
  category: '通用',
  status: '10%',
  install(app: App): void {
    app.directive('DDraggable', DraggableDirective)
    app.directive('DDroppable', DroppableDirective)
  }
}
