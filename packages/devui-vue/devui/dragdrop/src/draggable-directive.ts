import { changeDragState, deleteInsertedSortableShadow } from './utils';
import { shadowId } from './constant';

export default {
  /**
   *
   * @param el
   * @description
   *   1、绑定该指令的element将会具备拖拽能力
   *   2、为各元素进行初始化配置
   *      2.1、dragFlag:      是否处于拖拽中
   *      2.2、dragOverFlag： 是否处于可放置区域
   *
   *   1、整体思路
   *      1.1、为每个绑定drag指令的元素维护状态
   *        1.1.1、状态集合：dragStart、drag、dragover、drop、shouldCreateShadow
   *
   *      1.2、进入drop区域后，确保drop区域能够获取正在进行drag的元素
   */
  mounted(el: HTMLElement, binding: unknown): void {
    el.setAttribute('draggable', 'true');
    el.style.cursor = 'grab';

    // dragstart/drag/dragend
    el.addEventListener('drag', () => {
      changeDragState(el, el.id, 'true', 'true', 'false', 'false', 'false', 'true');
      if (binding.instance.$root.dropElement && document.getElementById(shadowId)){
        deleteInsertedSortableShadow(binding.instance.$root.dropElement);     // 如何让它仅执行1次？
        binding.instance.$root.dropElement = null;
      }
    }, false);

    // dragStart事件为每个绑定元素进行初始化
    el.addEventListener('dragstart', ()=>{
      // el  or  binding.instance  or  vnode.context
      changeDragState(el, el.id, 'true', 'true', 'false', 'false', 'false', 'false');
      binding.instance.$root.identity = el.id;
      el.dataset.dragArea = el.parentNode.className;
    }, false);
  },
};
