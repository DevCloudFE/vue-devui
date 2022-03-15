import { shadowId } from './constant';
import { changeDragState, createInsertSortableShadow, insertDragElement } from './utils';


export default {
  /**
     *
     * @param el
     * @description
     *     此命令用于将元素变为可放置的元素并且支持排序
     *     dragover:
     *               1、说明此时进入可排序放置的区域
     *               2、此时应该生成相应的可排序的shadow
     *     drop:
     *               1、可放置区域里如果没有拖拽元素，直接放置
     *               2、可放置区域里如果有其他的可拖拽元素，需要对比放置到正确的位置上
     */
  mounted(el: HTMLElement, binding: unknown): void {
    el.addEventListener('dragover', function (event: DragEvent){
      event.preventDefault();
      const targetNode: any = event.target;
      const dragId = binding.instance.$root.identity;
      if (!binding.instance.$root.dropElement){
        binding.instance.$root.dropElement = [...el.childNodes][1];
      }
      changeDragState(document.getElementById(binding.instance.$root.identity), binding.instance.$root.identity, 'true', 'false', 'true', 'false', 'true', 'false');
      const { dragover, shouldCreateShadow } = document.getElementById(dragId).dataset;
      if (dragover == 'true'){
        if (shouldCreateShadow == 'true'){
          createInsertSortableShadow([...targetNode.children][1], event, dragId);
        }
      }

    });
    el.addEventListener('drop', function (event: DragEvent){
      // 获取可放置区域
      const dropArea = [...el.childNodes][1];
      const dragId = binding.instance.$root.identity;
      dropArea.removeChild(document.getElementById(shadowId));
      if ([...dropArea.childNodes].length == 0){
        dropArea.appendChild(document.getElementById(dragId));
      }else {
        insertDragElement(dropArea, dragId, event);
      }
      changeDragState(document.getElementById(dragId), dragId, 'false', 'false', 'false', 'true', 'false', 'false');
    });
  }
};
