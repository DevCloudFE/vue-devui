import { changeDragState } from './utils';

export default {
  /**
   *
   * @param el
   * @description
   *   dragOver:
   *        1、生成与清除阴影的时机
   *           1.1、生成时机（只生成一次）： dragFlag === true && dragOverFlag === true
   *   drop:
   *        1、完成放的操作
   *           1.1、清除相应的阴影
   */
  mounted(el: HTMLElement, binding: unknown): void {
    // dragenter/dragover/dragend/drop
    el.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault();
      const dragId = binding.instance.$root.identity;
      changeDragState(document.getElementById(dragId), dragId, 'true', 'false', 'true', 'false', 'false', 'false');
      document.getElementById(dragId).dataset.dropArea = [...el.childNodes][1].className;
    }, false);

    // 新增两个标识解决战斗，即dragStart区域、drop区域、sortableDrop区域
    el.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault();
      const dragId = binding.instance.$root.identity;
      if (document.getElementById(dragId).dataset.dropArea == document.getElementById(dragId).dataset.dragArea){
        return;
      }
      // 如何定义可放置区域这个问题得商榷一下
      const childrenArr = [...Array.from(el.children)[1].children];
      if (childrenArr.length > 0){
        for (let index = 0; index < childrenArr.length; index++){
          const childrenYRange = childrenArr[index].getBoundingClientRect().top + childrenArr[index].offsetHeight / 2;
          if (parseFloat(event.clientY) < parseFloat(childrenYRange)){
            el.children[1].insertBefore(document.getElementById(dragId), childrenArr[index]);
            break;
          }
          if (index === childrenArr.length-1){
            el.children[1].appendChild(document.getElementById(dragId));
          }
        }
      }else {
        el.childNodes[1].appendChild(document.getElementById(dragId));
      }
    });
  },
};
