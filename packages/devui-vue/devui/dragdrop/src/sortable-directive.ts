import './shadow.scss'
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
    mounted(el: HTMLElement, binding:unknown):void {
        /**
         *    这个过程主要就是用来创建并插入shadow（2种情况）
         *    1、跨端之间的dragdrop
         *       1.1、如果dropArea区域没有子元素，那么直接显示shadow即可
         *       1.2、如果dropArea区域里有子元素，那么需要进行对比才可以正确的插入shadow
         * 
         *    2、同源之间的dragdrop
         */
        el.addEventListener('dragover', function (event: DragEvent){
            event.preventDefault()
            // 获取拖拽元素的 id
            const dragId = binding.instance.$root.identity
            // 获取拖拽元素
            const dragElement = document.getElementById(dragId) || binding.instance.$root.dragElement
            // 设置拖拽元素相应的状态
            dragElement.dropLeave = 'false';
            // 获取可拖放区域
            const dropElement = [...el.children][1]
            // 设置产生shadow的区域
            if (!dragElement.dragOverArea){
                dragElement.dragOverArea = Array.from(el.children)[1].classList[1]
            }
            document.querySelector('.sortable996').style.pointerEvents = 'none'
            if (dragElement.dragStartArea != dragElement.dragOverArea){         // 说明此时是跨端
                if (Array.from(dropElement.children).length == 0){              // 说明drop区域没有元素，可直接insert - shadow
                    if (document.querySelector('.shadow996')){
                        dropElement.removeChild(document.querySelector('.shadow996'))
                    }
                    const tag = document.createElement('div')
                    tag.style.width = dragElement.getBoundingClientRect().width + 'px'
                    tag.style.height = dragElement.getBoundingClientRect().height + 'px'
                    tag.classList.add('shadow996')
                    dropElement.appendChild(tag)
                }else {   // 需要与每个子元素对比位置，从而正确 insert-shadow
                    for (let index = 0; index < [...dropElement.children].length; index++){
                        Array.from(dropElement.children)[index].style.pointerEvents = 'none'
                        if ( Number(event.clientY) <= ( Number(Array.from(dropElement.children)[index].getBoundingClientRect().top) + Number([...dropElement.children][index].offsetHeight / 2) ) ){
                            if (document.querySelector('.shadow996')){
                                dropElement.removeChild(document.querySelector('.shadow996'))
                            }
                            const tag1 = document.createElement('div')
                            tag1.classList.add('shadow996')
                            tag1.style.width = dragElement.getBoundingClientRect().width + 'px'
                            tag1.style.height = dragElement.getBoundingClientRect().height + 'px'
                            dropElement.insertBefore(tag1, [...dropElement.children][index])
                            break;
                        }
                        if (index == ( Array.from(dropElement.children).length - 1 )){
                            if (document.querySelector('.shadow996')){
                                dropElement.removeChild(document.querySelector('.shadow996'))
                            }
                            const tag3 = document.createElement('div')
                            tag3.style.width = dragElement.getBoundingClientRect().width + 'px'
                            tag3.style.height = dragElement.getBoundingClientRect().height + 'px'
                            tag3.classList.add('shadow996')
                            dropElement.appendChild(tag3)
                        }
                    }
                }

            }else if(dragElement.dragStartArea === dragElement.dragOverArea && dragElement.dragStartArea === 'sortable996'){    // 说明此时是同源
                // 获取拖拽元素集合
                const dropAreaElment = Array.from(dropElement.children)
                const shadow = document.createElement('div')
                shadow.id = 'shadow996'
                shadow.classList.add('shadow996')
                shadow.style.width = dragElement.getBoundingClientRect().width + 'px'
                shadow.style.height = dragElement.getBoundingClientRect().height + 'px'
                // 并且替换当前正在拖拽的元素
                if (dropElement.contains(dragElement)){
                    dropElement.replaceChild(shadow, dragElement)
                }

                for (let index = 0; index < dropAreaElment.length; index++){                              // 此时需要比较位置，从而正确放置元素
                    dropAreaElment[index].style.pointerEvents = 'none'                  // 防止鼠标抖动
                    const elementPosition = dropAreaElment[index].offsetHeight / 2 + dropAreaElment[index].getBoundingClientRect().top
                    // 1、pass掉 当前正在拖拽的元素
                    if (dropAreaElment[index].id != 'shadow996'){
                        if (event.clientY <= elementPosition){        // 一定存在shadow
                            if (!document.querySelector('.shadow996')){
                                const shadow3 = document.createElement('div')
                                shadow3.id = 'shadow996'
                                shadow3.classList.add('shadow996')
                                shadow3.style.width = dropAreaElment[index].getBoundingClientRect().width + 'px'
                                shadow3.style.height = dropAreaElment[index].getBoundingClientRect().height + 'px'
                            }
                            dropElement.insertBefore(document.querySelector('.shadow996'), dropAreaElment[index])
                            break;
                        }
                        if (index == dropAreaElment.length - 1){
                            dropElement.appendChild(document.querySelector('.shadow996'))
                        }
                    }
                }
            }
        }, false);

        /**
         *     这个过程主要处理来回转圈，但是没有drop的情况
         */
        el.addEventListener('dragleave', function (){
            // 获取拖拽元素id
            const dragId = binding.instance.$root.identity
            // 获取拖拽元素
            const dragElement = document.getElementById(dragId)
            // 设置拖拽元素相应的状态
            dragElement.dropLeave = 'true'
            // 获取此时的drop区域
            const dropElement = [...el.children][1]
            // 如果此时有shadow，则清除shadow
            if (document.querySelector('.shadow996')){
                dropElement.removeChild(document.querySelector('.shadow996'))
            }
        }, false)

        /**
         *     这个过程主要用来 drop dragElement
         *     并且恢复每个元素的状态
         */
        el.addEventListener('drop', function (){
            // 获取拖拽元素id
            const dragId = binding.instance.$root.identity
            // 获取拖拽元素
            const dragElement = document.getElementById(dragId) || binding.instance.$root.dragElement
            // 获取drop区域
            const dropElement = [...el.children][1]
            // 替换shadow
            if (document.querySelector('.shadow996')){
                dropElement.replaceChild(dragElement, document.querySelector('.shadow996'))
                const dragElementCollection = [...document.querySelectorAll('.draggable-item')]
                for (let index = 0; index < dragElementCollection.length; index++){
                    dragElementCollection[index].style.pointerEvents = 'auto'
                    dragElementCollection[index].dragStartArea = null
                    dragElementCollection[index].dragOverArea = null
                }
            }
        }, false)

    }
}