/**
 * 多选模式下的一些函数
 */
import { CascaderItem, CascaderValueType, CaascaderOptionsType, UseCascaderMultipleCallback, CheckedType } from '../src/cascader-types'
import { reactive } from 'vue'
const tagList = reactive<CascaderItem[]>([]) // 多选模式下选中的值数组，用于生成tag
export const useMultiple = (): UseCascaderMultipleCallback => {
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
  /**
   * 获取选中的节点
   * @param currentOption 选中的某项
   * @param cascaderUlValues 多选集合中的某一个集合
   * @param index cascaderUlValues数组的起始项，最开始为0
   */
  const getMultipleCascaderItem = (currentOption: CascaderItem[], cascaderUlValues: number[], index: number, cascaderOptions) => {
    const node = currentOption.find(item => item.value === cascaderUlValues[index])
    // node.checked = true
    // console.log(ulIndex)
    if (node?.children?.length > 0) {
      // 递归获取选中节点
      index += 1
      getMultipleCascaderItem(node.children, cascaderUlValues, index, cascaderOptions)
    } else {
      // 没有子节点了则说明已经是最终节点
      // console.log('node', node, cascaderOptions, index)
      const ulIndex = cascaderUlValues.findIndex(item => item === node.value)
      console.log('node', node, ulIndex)
      updateCheckOptionStatus(node, cascaderOptions, ulIndex)
      // addTagList(tagList, node)
    }
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
    // console.log(node, options, ulIndex)
    if (node?.halfChecked) { // 更新半选状态
      node.halfChecked = false
      node.checked = false
      updateCheckStatusLoop(node, 'halfChecked')
    } else {
      node.checked = !node.checked
      // 更新是否选中状态
      updateCheckStatusLoop(node, 'checked', node.checked)
    }
    ulIndex -= 1
    const parentNode = getParentNode(node.value, options, ulIndex)
    updateParentNodeStatus(parentNode, options, ulIndex)
  }
  /**
   * 父节点改变子节点check状态
   * @param node 节点
   */
  const updateCheckStatusLoop = (node: CascaderItem, type: CheckedType, status?: boolean) => {
    // console.log(node)
    if (node.children) {
      node.children.forEach(item => {
        // 当需要改变checked时
        // halfChecked一定是false
        if (item.disabled) return // 禁用不可更改状态
        if (type === 'checked') {
          item[type] = status
          item['halfChecked'] = false
          updateCheckStatusLoop(item, type, status)
        } else if (type === 'halfChecked') {
          /**
           * halfChecked为false时，取消子节点所有选中
           */
          item['halfChecked'] = false
          item['checked'] = false
          !status && updateCheckStatusLoop(item, type)
        }
      })
    } else {
      // 更新tagList
      !node.checked
      ? deleteTagList(tagList, node)
      : addTagList(tagList, node)
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
  const updateParentNodeStatus = (node: CascaderItem, options: CaascaderOptionsType, ulIndex: number) => {
    if (ulIndex < 0) return
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
    ulIndex -= 1
    const parentNode = getParentNode(node.value, options, ulIndex)
    updateParentNodeStatus(parentNode, options, ulIndex)
  }
  return {
    tagList,
    addTagList,
    deleteTagList,
    initTagList,
    updateCheckOptionStatus,
    getMultipleCascaderItem,
    initActiveIndexs,
    updateCheckStatusLoop,
    updateParentNodeStatus,
    getParentNode,
  }
}
