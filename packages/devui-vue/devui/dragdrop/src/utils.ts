import { shadowId } from './constant';

/**
 *
 * @param id
 * @descriprion
 *    根据id获取非内联样式元素的样式
 */
function getElementStyle (id: string, styleName: string): string {
  return document.getElementById(id).currentStyle ? document.getElementById(id).currentStyle[styleName] : window.getComputedStyle(
    document.getElementById(id),
    styleName
  );
}

/**
 *
 * @param originId
 * @description
 *    根据拖拽的id生成相应的阴影
 *    如何生成shadow？
 *    情况一： dragable   ->    drop without sortable
 *    情况二： anything   ->    drop without anything
 */
function createShadow (originId: string): HTMLElement {
  const shadow = document.createElement('div');
  shadow.id = shadowId;
  shadow.style.background = 'rgb(206, 215, 255)';
  shadow.style.width = getElementStyle(originId, 'width');
  shadow.style.height = '20px';
  return shadow;
}

/**
 *
 * @param el
 * @param originId
 * @param dragStart
 * @param drag
 * @param dragover
 * @param drop
 * @param shouldCreateShadow
 * @param dragFlag
 * @description
 *    改变拖拽元素相应的状态
 */
function changeDragState (el: string, originId: string, dragStart: string, drag: string, dragover: string, drop: string, shouldCreateShadow: string, dragFlag: string): void{
  el.dataset.originId = originId;
  el.dataset.dragStart = dragStart;
  el.dataset.dragover = dragover;
  el.dataset.drop = drop;
  el.dataset.shouldCreateShadow = shouldCreateShadow;
  el.dataset.dragFlag = dragFlag;
}

/**
 *
 * @param compareElement
 * @returns
 * @description
 *     计算可对比元素的高度
 */
function computeCompareElementHeight (compareElement: HTMLCollection): unknown{
  return compareElement.getBoundingClientRect().top + Math.floor(compareElement.offsetHeight / 2);
}

/**
 *
 * @param sortDropArea
 * @param mouseObject
 *    1、首先确认可放置区域
 *    2、确保每个元素只生成一次shadow
 *    3、
 */
function createInsertSortableShadow (sortDropArea: unknown, mouseObject: unknown, originId: string): void {
  const sortDropAreaArr: Array = [...sortDropArea.children];
  if (sortDropAreaArr.length == 0){
    if (!document.getElementById(shadowId)){
      const shadowElement = createShadow(originId);
      sortDropArea.appendChild(shadowElement);
    }
  }else {
    for (let index = 0; index < sortDropAreaArr.length; index++){
      const compareHeight = computeCompareElementHeight(sortDropAreaArr[index]);
      document.getElementById(shadowId) ? sortDropArea.removeChild(document.getElementById(shadowId)) : null;
      if (index == sortDropAreaArr.length-1){
        sortDropArea.appendChild(createShadow(originId));
        break;
      }
      if (Math.floor(mouseObject.clientY)<= compareHeight){
        sortDropArea.insertBefore(createShadow(originId), sortDropAreaArr[index]);
        break;
      }
    }
  }
}

/**
 *
 * @param dropAreaContainer
 * @param dragId
 * @param mouseObject
 * @description
 *    向sortable区域插入拖拽元素
 */
function insertDragElement (dropAreaContainer: HTMLCollection, dragId: string, mouseObject: MouseEvent): void {
  for (let index = 0; index < [...dropAreaContainer.children].length; index++){
    if (index == [...dropAreaContainer.children].length-1){
      dropAreaContainer.appendChild(document.getElementById(dragId));
      break;
    }
    if (Math.floor(mouseObject.clientY) <= computeCompareElementHeight([...dropAreaContainer.children][index])){
      dropAreaContainer.insertBefore(document.getElementById(dragId), [...dropAreaContainer.children][index]);
      break;
    }
  }
}

/**
 *
 * @param dropSortArea
 * @description
 *    删除可排序区域中的shadow
 */
function deleteInsertedSortableShadow (dropSortArea: unknown): void{
  if (dropSortArea){
    if (document.getElementById(shadowId)){
      if (dropSortArea.contains(document.getElementById(shadowId))){
        dropSortArea.removeChild(document.getElementById(shadowId));
      }
    }
  }
}


export {
  createShadow,
  changeDragState,
  createInsertSortableShadow,
  deleteInsertedSortableShadow,
  computeCompareElementHeight,
  insertDragElement
};
