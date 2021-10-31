import type { App } from 'vue'
import DraggableDirective from './src/draggable.directive'
import DroppableDirective from './src/droppable.directive'

export { DraggableDirective, DroppableDirective }

export default {
  title: 'Dragdrop 拖拽',
  category: '通用',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.directive('DDraggable', DraggableDirective)
    app.directive('DDroppable', DroppableDirective)
  }
}
