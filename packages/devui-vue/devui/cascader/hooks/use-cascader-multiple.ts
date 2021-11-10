/**
 * 多选模式下的一些函数
 */
import { CascaderItem, CascaderValueType, CaascaderOptionsType, UseCascaderMultipleCallback, CheckedType, CascaderItemNeedType } from '../src/cascader-types'
// import { useCascaderItem } from './use-cascader-item'
import { Ref } from 'vue'
export const useMultiple = (cascaderItemNeedProps?: CascaderItemNeedType): UseCascaderMultipleCallback => {
  // const { cascaderItemNeedProps } = useCascaderItem()
  /**
   * 下拉框中输出内容
   * 需要判断是否是多选
   * 需要判断单选模式下是否showPath
   * @param label 当前current的内容
   * @param arr 当前选中项current的children数组
   */
   const getInputValue = (label: string, arr: CascaderItem[], inputValueCache: Ref<string>, showPath?: boolean) => {
    //  console.log('输出tag')
    if (!showPath) {
      inputValueCache.value = label
    } else {
      inputValueCache.value += (label + (arr?.length > 0 ? ' / ' : ''))
    }
  }
  /**
   * 添加选中项
   * @param arr 当前选中的数组集合
   * @param singleItem 当前选中项
   * 
   */
  const addTagList = (arr: CascaderItem[], singleItem: CascaderItem) => {
    arr.push(singleItem)
  }
  /**
   * 删除选中项
   * @param arr 当前选中的数组集合
   * @param singleItem 当前选中项
   * 
   */
  const deleteTagList = (arr: CascaderItem[], singleItem: CascaderItem) => {
    // console.log(arr)
    const i = arr.findIndex(item => item.value === singleItem.value)
    arr.splice(i, 1)
  }
  /**
   * 初始化选中项，将选中的数组集合置为空
   * @param arr 当前选中的数组集合
   */
  const initTagList = (arr: CascaderItem[]) => {
    arr.splice(0, arr.length)
  }

  // const deleteUncheckedValues = (value, index) => {
  //   console.log(value)
  //   value.splice(index, value.length - 1)
  // }

  /**
   * 多选模式初始化选中的节点
   */
  const initMultipleCascaderItem = (targetValues: number[], cascaderOptions: CascaderItem[], tagList: CascaderItem[]) => {
    findNextColumn(targetValues, cascaderOptions, 0, tagList)
  }
  const findNextColumn = (targetValues, options, index, tagList) => {
    let targetNode = options.find(t => t.value === targetValues[index]) // 根据value获取当前选中的项
    if (targetNode?.children?.length > 0) {
      index += 1 // 进入下一级
      targetNode = setChildrenParent(targetNode) // 为children设置parent
      findNextColumn(targetValues, targetNode.children, index, tagList)
    } else {
      addTagList(tagList, targetNode) // 初始化tag
      targetNode['checked'] = true // 此时已经是最终结点了，从最终结点往上寻找父节点更新状态
      findChildrenCheckedStatusToUpdateParent(targetNode?.parent)
    }
  }

  /**
   * 
   * @param parentNode 父节点
   * @returns parentNode 父节点
   */
  const setChildrenParent = (parentNode) => {
    parentNode?.children.forEach(child => {
      child.parent = parentNode
    })
    return parentNode
  }

  /**
   * 多选模式下当有默认选中值时，初始化视图选中状态
   * 通过value集合获取下标集合
   * @param values 默认选中的value集合
   * @param currentOption 当前列
   * @param index values数组的起始项，最开始为0
   * @param activeIndexs 渲染视图所需要的下标集合
   */
  const initActiveIndexs = (values: CascaderValueType, currentOption: CascaderItem[], index: number, activeIndexs: number[]) => {
    let nextOption = null
    for (let i = 0; i < currentOption.length; i++) {
      if (currentOption[i]?.value === values[index]) {
        nextOption = currentOption[i]?.children
        activeIndexs[index] = i
        break
      }
    }
    if (index < values.length - 1 && nextOption) {
      index += 1
      initActiveIndexs(values, nextOption, index, activeIndexs)
    }
  }

  /**
   * 多选模式点击checkbox
   */
  const updateCheckOptionStatus = (node: CascaderItem, options: CaascaderOptionsType, ulIndex: number): void => {
    // 如果是半选状态，更新为false，其他状态则更新为与checked相反
    if (node?.halfChecked) { // 更新半选状态
      node['halfChecked'] = false
      node['checked'] = false
      updateCheckStatusLoop(node, 'halfChecked', ulIndex)
    } else {
      node['checked'] = !node.checked
      // if (node['checked'] === false) {
      //   deleteTagList(tagList, node)
      // }
      // 更新是否选中状态
      updateCheckStatusLoop(node, 'checked', ulIndex, node.checked)
    }
    ulIndex -= 1
    const parentNode = getParentNode(node.value, options, ulIndex)
    updateParentNodeStatus(parentNode, options, ulIndex)
  }
  /**
   * 父节点改变子节点check状态
   * @param node 节点
   */
  const updateCheckStatusLoop = (node: CascaderItem, type: CheckedType,  ulIndex: number, status?: boolean,) => {
    if (node?.children?.length > 0) {
      node.children.forEach(item => {
        // 当需要改变checked时
        // halfChecked一定是false
        if (item.disabled) return // 禁用不可更改状态
        if (type === 'checked') {
          item[type] = status
          item['halfChecked'] = false
          updateCheckStatusLoop(item, type, ulIndex, status)
        } else if (type === 'halfChecked') {
          /**
           * halfChecked为false时，取消子节点所有选中
           */
          item['halfChecked'] = false
          item['checked'] = false
          !status && updateCheckStatusLoop(item, type, ulIndex)
        }
      })
    } else {
      // 增加或者删除选中的项
      !node.checked
      ? deleteTagList(cascaderItemNeedProps.tagList, node)
      : addTagList(cascaderItemNeedProps.tagList, node)

      // TODO 更新value
      // deleteUncheckedValues(cascaderItemNeedProps.value, ulIndex)
    }
  }
  /**
   * 子节点获取父节点
   */
  const getParentNode = (childValue: string | number, options: CaascaderOptionsType, ulIndex: number): CascaderItem => {
    if (ulIndex < 0) return
    const queue = [...options[ulIndex]]
    let cur: CascaderItem
    while(queue.length) {
      cur = queue.shift()
      if (cur.children && cur.children.find(t => t.value === childValue)) {
        break
      } else if (cur.children) {
        queue.push(...cur.children)
      }
    }
    return cur
  }
  /**
   * 更新父节点
   */
   const findChildrenCheckedStatusToUpdateParent = (node) => {
    const checkedChild = node?.children?.find(t => t['checked'])
    const halfcheckedChild = node?.children?.find(t => t['halfChecked'])
    const uncheckedChild = node?.children?.find(t => !t['halfChecked'] && !t['checked'])
    if (halfcheckedChild || (checkedChild && uncheckedChild)) {
      node['checked'] = false
      node['halfChecked'] = true
    } else if (!checkedChild && !halfcheckedChild) {
      node['checked'] = false
      node['halfChecked'] = false
    } else {
      node['checked'] = true
      node['halfChecked'] = false
    }
  }
  const updateParentNodeStatus = (node: CascaderItem, options: CaascaderOptionsType, ulIndex: number) => {
    if (ulIndex < 0) return
    findChildrenCheckedStatusToUpdateParent(node)
    console.log('childNode', node, ulIndex)
    ulIndex -= 1
    const parentNode = getParentNode(node.value, options, ulIndex)
    updateParentNodeStatus(parentNode, options, ulIndex)
  }
  return {
    getInputValue,
    addTagList,
    deleteTagList,
    initTagList,
    updateCheckOptionStatus,
    initMultipleCascaderItem,
    initActiveIndexs,
    updateCheckStatusLoop,
    updateParentNodeStatus,
    getParentNode,
  }
}
