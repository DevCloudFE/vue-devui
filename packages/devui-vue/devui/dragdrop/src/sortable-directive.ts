import { SHADOW_ID } from './const';
import {
  createInsertSortableShadow,
  judgeMouseIsInSortableArea,
  exchangeShadowPosition,
  sameOriginExchangeElementPosition,
} from './utils';


export default {
  /**
     *
     * @param el
     * @description
     *     此命令用于将元素变为可放置的元素并且支持排序
     *     功能分析
     *        1、非自身区域内拖动，生成shadow
     *        2、自身区域内拖动，不生成shadow
     *    实现分析（根据ng-devui）
     *        shadow的生成规则
     *        shadow的生成位置
     *    待思考问题
     *        1、整个拖拽过程中，是否有必要添加节流防抖？
     */
  mounted(el: HTMLElement, binding: unknown): void {
    const self = el;
    el.addEventListener('dragover', function (event: DragEvent){
      event.preventDefault();
      const dragId = binding.instance.$root.identity;
      if (document.getElementById(dragId)?.dataset.parent === 'sortable-drop-area'){
        // 说明此时是同源操作（不需要生成shadow）
        // sameOriginExchangeElementPosition(event, [...dropArea.children], dragId, dropArea);
        return;
      }
      // 需要判定是否存在阴影，否则会出现严重的抖动情况
      if (!document.getElementById(SHADOW_ID) && [...self.childNodes[1].children].length === 0){
        createInsertSortableShadow([...self.childNodes][1], event, dragId);
      } else if ([...self.childNodes[1].children].length >= 1){
        // 说明此时想要进行换位操作
        // 需要得到此时shadow的位置，遇到shadow则跳过，否则当鼠标出现在shadow上时，会出现严重的抖动操作
        exchangeShadowPosition(event, [...self.childNodes[1].children], dragId, self.childNodes[1]);
      }
    });
    el.addEventListener('drop', function (event: DragEvent){
      // 获取可放置区域
      const dropArea = [...el.childNodes][1];
      const dragId = binding.instance.$root.identity;
      if (document.getElementById(dragId)?.dataset.parent === 'sortable-drop-area'){
        // 说明是同源（不产生shadow，直接替换）
        sameOriginExchangeElementPosition(event, [...dropArea.children], dragId, dropArea);
        return;
      }
      // 判断鼠标是否处于drop区域
      if (document.getElementById(SHADOW_ID)){
        dropArea.replaceChild(document.getElementById(dragId), document.getElementById(SHADOW_ID));
        if (document.getElementById(dragId)){
          document.getElementById(dragId).dataset.parent = 'sortable-drop-area';
        }
      }
    });
    // 主要用来移除shadow
    el.addEventListener('dragleave', function (event: Event){
      const dropArea = [...el.childNodes][1];
      if (document.getElementById(SHADOW_ID) && !judgeMouseIsInSortableArea(event, el)){
        dropArea.removeChild(document.getElementById(SHADOW_ID));
      }
    });
  }
};
