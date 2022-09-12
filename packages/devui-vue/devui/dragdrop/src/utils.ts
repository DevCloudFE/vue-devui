import { SHADOW_ID } from './const';

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
  shadow.id = SHADOW_ID;
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
// TODO: 这个方法参数太多，待优化
function changeDragState (
  el: string,
  originId: string,
  dragStart: string,
  drag: string,
  dragover: string,
  drop: string,
  shouldCreateShadow: string,
  dragFlag: string
): void{
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
  if (sortDropAreaArr.length === 0){
    if (!document.getElementById(SHADOW_ID)){
      const shadowElement = createShadow(originId);
      sortDropArea.appendChild(shadowElement);
    }
  }else {
    for (let index = 0; index < sortDropAreaArr.length; index++){
      const compareHeight = computeCompareElementHeight(sortDropAreaArr[index]);
      document.getElementById(SHADOW_ID) ? sortDropArea.removeChild(document.getElementById(SHADOW_ID)) : null;
      if (Math.floor(mouseObject.clientY) <= (Math.floor(compareHeight / 2) + sortDropAreaArr[index].getBoundingClientRect().top)){
        sortDropArea.insertBefore(createShadow(originId), sortDropAreaArr[index]);
        break;
      } else {
        index === sortDropAreaArr.length - 1 && sortDropArea.appendChild(createShadow(originId));
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
    if (index === [...dropAreaContainer.children].length-1){
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
    if (document.getElementById(SHADOW_ID)){
      if (dropSortArea.contains(document.getElementById(SHADOW_ID))){
        dropSortArea.removeChild(document.getElementById(SHADOW_ID));
      }
    }
  }
}

/**
 *
 * @param mouse
 * @param sortableArea
 * @returns
 * @description 判断鼠标是否处于目标元素中
 */
function judgeMouseIsInSortableArea (mouse: MouseEvent, sortableArea: Element): boolean{
  const { clientX, clientY } = mouse;
  // 获取元素的位置
  const eleLeft = sortableArea.getBoundingClientRect().left;
  const eleRight = sortableArea.getBoundingClientRect().right;
  const eleTop = sortableArea.getBoundingClientRect().top;
  const eleBottom = sortableArea.getBoundingClientRect().bottom;

  if ((clientX > eleLeft) && (clientX < eleRight) && (clientY > eleTop) && (clientY < eleBottom)){
    return true;
  } else {
    return false;
  }

}

/**
 *
 * @param mouse
 * @param comparedArr
 * @description         同源交换位置
 */
function sameOriginExchangeElementPosition (mouse: Event, comparedArr: Array, dragId: string, dropArea: Element): void{
  if (comparedArr.length <= 1){
    return;
  }
  for (let index = 0; index < comparedArr.length; index++){
    if (mouse.clientY < comparedArr[index].getBoundingClientRect().top){
      dropArea.insertBefore(document.getElementById(dragId), comparedArr[index]);
      break;
    }
    if (index === comparedArr.length - 1 && (mouse.clientY > comparedArr[index].getBoundingClientRect().bottom)){
      dropArea.appendChild(document.getElementById(dragId));
      break;
    }
  }
}

/**
 *
 * @param mouse         当前鼠标对象
 * @param dropAreaElements   放置区域的元素
 * @description
 */
// TODO: 该方法 if 嵌套太深，待优化
function exchangeShadowPosition (mouse: Event, dropAreaElements: Array, dragId: string, dropArea: Element): void{
  for (let index = 0; index < dropAreaElements.length; index++){
    // 遇到shadow，直接跳过
    if (dropAreaElements[index]?.id !== SHADOW_ID){
      if (Math.floor(mouse.clientY) <= (dropAreaElements[index].getBoundingClientRect().top)){
        if (dropAreaElements[index-1]?.id !== SHADOW_ID){
          if (document.getElementById(SHADOW_ID)){
            dropArea.removeChild(document.getElementById(SHADOW_ID));
          }
          dropArea.insertBefore(createShadow(dragId), dropAreaElements[index]);
          break;
        }
      }
      if (Math.floor(mouse.clientY) > dropAreaElements[dropAreaElements.length - 1].getBoundingClientRect().top){
        if (index === dropAreaElements.length - 1 && dropAreaElements[index]?.id !== SHADOW_ID){
          // 如果存在shadow，则清除
          if (document.getElementById(SHADOW_ID)){
            dropArea.removeChild(document.getElementById(SHADOW_ID));
          }
          dropArea.appendChild(createShadow(dragId));
        }
        break;
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
  insertDragElement,
  judgeMouseIsInSortableArea,
  exchangeShadowPosition,
  sameOriginExchangeElementPosition
};
