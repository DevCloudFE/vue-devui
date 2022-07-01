/**
 * 多选模式
 */
import type { CascaderItem, UpdateStatusCallback, CaascaderOptionsType, CheckedType, CascaderModelValue } from '../src/cascader-types';

/**
 * 初始化选中项，将选中的数组集合置为空
 * @param tagList 前被选中的tagList集合
 */
export const initTagList = (tagList: CascaderItem[]): void => {
  tagList.splice(0, tagList.length);
};
/**
 * 添加选中项
 * @param tagList 当前被选中的tagList集合
 * @param singleItem 当前选中项
 *
 */
export const multipleAddTag = (tagList: CascaderItem[], singleItem?: CascaderItem): void => {
  if (singleItem) {
    tagList.push(singleItem);
  }
};

/**
 * 删除选中项
 * @param tagList 前被选中的tagList集合
 * @param singleItem 当前选中项
 *
 */
export const multipleDeleteTag = (tagList: CascaderItem[], singleItem: CascaderItem): void => {
  const i = tagList.findIndex((item) => item.value === singleItem.value);
  tagList.splice(i, 1);
};

/**
 * 根据当前节点的子节点更新当前节点状态
 * @param node - 当前节点
 */
const findChildrenCheckedStatusToUpdateParent = (node: CascaderItem) => {
  const checkedChild = node?.children?.find((t) => t['checked']);
  const halfcheckedChild = node?.children?.find((t) => t['halfChecked']);
  const uncheckedChild = node?.children?.find((t) => !t['halfChecked'] && !t['checked']);
  if (halfcheckedChild || (checkedChild && uncheckedChild)) {
    node['checked'] = false;
    node['halfChecked'] = true;
  } else if (!checkedChild && !halfcheckedChild) {
    node['checked'] = false;
    node['halfChecked'] = false;
  } else {
    node['checked'] = true;
    node['halfChecked'] = false;
  }
};

/**
 *
 * @param parentNode 父节点
 * @returns parentNode 父节点
 */
const setChildrenParent = (parentNode: CascaderItem | undefined): CascaderItem | undefined => {
  parentNode?.children?.forEach((child) => {
    child.parent = parentNode;
  });
  return parentNode;
};

/**
 * 根据values集合递归获取选中的节点
 * @param targetValues 多选模式下的value数组
 * @param rootNode 选项的第一列
 * @param index 当前初始化的列下标
 * @param tagList 选中的tag集合
 */
const findNextColumn = (targetValues: (number | string)[], options: CascaderItem[], index: number, tagList: CascaderItem[]): void => {
  let targetNode = options.find((t) => t.value === targetValues[index]); // 根据value获取当前选中的项
  if (targetNode?.children?.length && targetNode?.children?.length > 0) {
    // 递归的限制条件，是否还有子级
    index += 1; // 进入下一级
    targetNode = setChildrenParent(targetNode); // 为children设置parent，方便后续通过child使用parent
    findNextColumn(targetValues, targetNode?.children || [], index, tagList);
  } else {
    // 没有子节点说明此时已经是最终结点了
    multipleAddTag(tagList, targetNode); // 新增tag

    if (targetNode) {
      targetNode['checked'] = true;
    }

    // 从最终结点往上寻找父节点更新状态
    // 通过父亲节点查询所有子节点状态从而更新父节点状态
    targetNode?.parent && findChildrenCheckedStatusToUpdateParent(targetNode?.parent as CascaderItem);
  }
};

/**
 * 多选模式初始化选中的节点
 * @param targetValues 多选模式下的value数组
 * @param rootNode 选项的第一列
 * @param tagList 选中的tag集合
 */
export const initMultipleCascaderItem = (targetValues: CascaderModelValue, rootColumn: CascaderItem[], tagList: CascaderItem[]): void => {
  findNextColumn(targetValues, rootColumn, 0, tagList);
};

const findParentValues = (item: CascaderItem, values: CascaderModelValue = []) => {
  values.push(item.value);
  if (item.parent) {
    findParentValues(item.parent as CascaderItem, values);
  }
  return values;
};

export const getMultiModelValues = (tagList: CascaderItem[]): CascaderModelValue[] => {
  const modelValues: CascaderModelValue[] = [];
  tagList.forEach((item) => {
    modelValues.push(findParentValues(item, []).reverse());
  });
  return modelValues;
};

const updateParentNodeStatus = (node: CascaderItem, options: CaascaderOptionsType, ulIndex: number) => {
  if (ulIndex < 0) {
    return;
  }
  findChildrenCheckedStatusToUpdateParent(node);
  ulIndex -= 1;
  const parentNode = node?.parent;
  updateParentNodeStatus(parentNode as CascaderItem, options, ulIndex);
};

export const updateCheckOptionStatus = (tagList: CascaderItem[]): UpdateStatusCallback => {
  /**
   * 父节点改变子节点check状态
   * @param node 节点
   */
  const updateCheckStatusLoop = (node: CascaderItem, type: CheckedType, ulIndex: number, status?: boolean) => {
    if (node?.children?.length && node?.children?.length > 0) {
      node.children.forEach((item) => {
        // 当需要改变checked时
        // halfChecked一定是false
        if (item.disabled) {
          return;
        } // 禁用不可更改状态
        if (type === 'checked') {
          item[type] = status;
          item['halfChecked'] = false;
          updateCheckStatusLoop(item, type, ulIndex, status);
        } else if (type === 'halfChecked') {
          /**
           * halfChecked为false时，取消子节点所有选中
           */
          item['halfChecked'] = false;
          item['checked'] = false;
          !status && updateCheckStatusLoop(item, type, ulIndex);
        }
      });
    } else {
      // 增加或者删除选中的项
      !node.checked ? multipleDeleteTag(tagList, node) : multipleAddTag(tagList, node);
    }
  };
  /**
   * 更新当前选中的结点状态
   * @param node 当前结点
   * @param ulIndex 当前column的下标
   */
  const updateCurNodeStatus = (node: CascaderItem, ulIndex: number) => {
    // 如果是半选状态，更新为false，其他状态则更新为与checked相反
    if (node?.halfChecked) {
      // 更新半选状态
      node['halfChecked'] = false;
      node['checked'] = false;
      updateCheckStatusLoop(node, 'halfChecked', ulIndex);
    } else {
      node['checked'] = !node.checked;
      // 更新是否选中状态
      updateCheckStatusLoop(node, 'checked', ulIndex, node.checked);
    }
  };
  /**
   * 更新当前选中状态
   * @param node 当前结点
   * @param options column的集合
   * @param ulIndex 当前column的下标
   */
  const updateStatus = (node: CascaderItem, options: CaascaderOptionsType, ulIndex: number) => {
    // 更新当前点击的node
    updateCurNodeStatus(node, ulIndex);
    ulIndex -= 1;
    const parentNode = node?.parent;
    updateParentNodeStatus(parentNode, options, ulIndex);
  };
  return {
    updateStatus,
  };
};
