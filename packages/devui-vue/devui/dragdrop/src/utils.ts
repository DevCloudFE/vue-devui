/**
 * 
 * @param id 
 * @descriprion
 *    根据id获取非内联样式元素的样式
 */
function getElementStyle (id: string, styleName: string):string {
    return document.getElementById(id).currentStyle ? document.getElementById(id).currentStyle[styleName] : window.getComputedStyle(
        document.getElementById(id),
        styleName
    )
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
function createShadow (originId:string):HTMLElement {
    const shadow = document.createElement('div');
    shadow.id = 'shadow0611'
    shadow.style.background = 'rgb(206, 215, 255)'
    shadow.style.width = getElementStyle(originId, 'width')
    shadow.style.height = '20px'
    return shadow
}

function changeDragState (el:string, originId:string, dragStart:string, drag:string, dragover:string, drop:string, shouldCreateShadow:string): void{
    el.dataset.originId = originId
    el.dataset.dragStart = dragStart
    el.dataset.dragover = dragover
    el.dataset.drop = drop
    el.dataset.shouldCreateShadow = shouldCreateShadow
}


export {
    createShadow,
    changeDragState
}