import { ref, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { isFunction } from 'lodash';
import type { DataGridProps, InnerRowData, RowData, IExpandLoadMoreResult } from '../data-grid-types';
import { generateInnerData } from '../utils';

export function useDataGridTree(props: DataGridProps, ctx: SetupContext, afterToggleExpandTree: () => void) {
	const { data, checkableRelation, rowKey, reserveCheck } = toRefs(props);
	const innerRowsData = ref<InnerRowData[]>([]);
	const rowIndex = ref(0);
	const allChecked = ref(false);
	const halfAllChecked = ref(false);
	const checkedRowsId = new Map<InnerRowData['$rowId'], Record<'checked' | 'halfChecked', boolean>>();
	const rowDataMap: Record<string, InnerRowData> = {};

	const getInnerRowData = (node: InnerRowData | RowData) => {
		let innerNode: InnerRowData | null = null;
		if (node.$rowId) {
			innerNode = node;
		} else if (rowKey && rowKey.value) {
			let key: string;
			if (typeof rowKey.value === 'string') {
				key = node[rowKey.value];
			} else if (isFunction(rowKey.value)) {
				key = rowKey.value(node);
			} else {
				return null;
			}
			innerNode = rowDataMap[key];
		}
		return innerNode;
	};

	const updateInnerRowsData = () => {
		let allTrue = true;
		let allFalse = true;
		rowIndex.value = 0;
		innerRowsData.value = generateInnerData(data.value, rowIndex, rowKey);
		for (let i = 0; i < innerRowsData.value.length; i++) {
			const item = innerRowsData.value[i];
			rowDataMap[item.$rowId!] = item;
			if (reserveCheck.value && !Reflect.has(item, 'checked')) {
				item.checked = checkedRowsId.get(item.$rowId)?.checked;
				item.halfChecked = checkedRowsId.get(item.$rowId)?.halfChecked;
			}
			allTrue &&= Boolean(item.checked);
			allFalse &&= Boolean(!item.checked);
		}
		allChecked.value = allTrue;
		halfAllChecked.value = !(allTrue || allFalse);
	};

	const getShowRowsData = () => {
		const result: InnerRowData[] = [];
		for (let i = 0; i < innerRowsData.value.length; i++) {
			if (innerRowsData.value[i].showNode) {
				result.push(innerRowsData.value[i]);
			}
		}
		return result;
	};

	// 切换子节点的展开收起状态
	const toggleChildNodeVisible = (node: InnerRowData) => {
		if (!node.childList?.length) {
			return;
		}
		const nodeList = [...node.childList];
		while (nodeList.length) {
			const item = nodeList.shift();
			if (item) {
				item.showNode = node.$expand;
				if ((node.$expand && item.$expand) || (!node.$expand && item.childList?.length)) {
					const temp = item.childList || [];
					nodeList.push(...temp);
				}
			}
		}
	}

	// 树表格异步加载子节点后，更新其他行数据$rowIndex
	const updateAfterRowIndex = (startIndex: number, addedLength: number) => {
		for (let i = startIndex; i < innerRowsData.value.length; i++) {
			innerRowsData.value[i].$rowIndex! += addedLength;
		}
	};

	// 树表格展开懒加载回调
	const dealChildNodes = (result: IExpandLoadMoreResult) => {
		const { node, rowItems } = result;
		const tempRowIndex = ref(node.$rowIndex! + 1);
		const childList = generateInnerData(rowItems, tempRowIndex, rowKey, node.$level, node);
		updateAfterRowIndex(node.$rowIndex! + 1, childList.length);
		innerRowsData.value.splice(node.$rowIndex! + 1, 0, ...childList);
		// 更新childList
		for (let i = 0; i < childList.length; i++) {
			if (childList[i].$parentId === node.$rowId) {
				node.childList?.push(childList[i]);
			}
		}
		// 更新子节点状态
		toggleChildNodeVisible(node);
		afterToggleExpandTree();
	};

	// 切换树表格单行展开收起状态，指定status可设置展开收起状态
	const toggleRowExpansion = (node: InnerRowData, status?: boolean) => {
		// 为了兼容业务通过原始行数据调用此方法，所以需要通过getInnerRowData方法获取内部处理后的行数据
		const innerNode: InnerRowData | null = getInnerRowData(node);
		if (!innerNode) {
			return;
		}
		if (typeof status === 'boolean') {
			innerNode.$expand = status;
		} else {
			innerNode.$expand = !innerNode.$expand;
		}
		if (!innerNode.isLeaf && !innerNode.childList?.length) {
			ctx.emit('expandLoadMore', innerNode, dealChildNodes);
		} else {
			toggleChildNodeVisible(innerNode);
			afterToggleExpandTree();
		}
		ctx.emit('expandChange', innerNode.$expand, innerNode);
	};

	// 切换树表格所有行展开收起状态，指定status可设置展开收起状态
	const toggleAllRowExpansion = (status?: boolean) => {
		for (let i = 0; i < innerRowsData.value.length; i++) {
			const item = innerRowsData.value[i];
			if (typeof status === 'boolean') {
				item.$expand = status;
			} else {
				item.$expand = !item.$expand;
			}
			if (item.$level !== 1) {
				item.showNode = item.$expand;
			}
		}
		afterToggleExpandTree();
		ctx.emit('expandAllChange', innerRowsData.value[0].$expand);
	};

	// 保留勾选状态时，更新已勾选节点
	const updateCheckedRowsId = (node: InnerRowData) => {
		if (reserveCheck.value) {
			if (node.checked) {
				checkedRowsId.set(node.$rowId, { checked: node.checked, halfChecked: Boolean(node.halfChecked) });
			} else {
				checkedRowsId.delete(node.$rowId);
			}
		}
	};

	// 父子勾选联动，改变子节点勾选状态
	const toggleChildNodeChecked = (node: InnerRowData) => {
		if (!node.childList?.length) {
			return;
		}
		node.halfChecked = false;
		const nodeList = [...node.childList];
		while (nodeList.length) {
			const item = nodeList.shift();
			if (item) {
				if (!item.disableCheck) {
					item.checked = node.checked;
					item.halfChecked = false;
					updateCheckedRowsId(item);
				}
				const temp = item.childList || [];
				nodeList.push(...temp);
			}
		}
	};

	// 父子勾选联动，改变父节点勾选状态
	const toggleParentNodeChecked = (node: InnerRowData) => {
		if (!node.$parentId) {
			return;
		}
		const parentNode = rowDataMap[node.$parentId];
		if (!parentNode || parentNode.disableCheck) {
			return;
		}
		// 父节点勾选状态和半选状态需要根据是否有其他后代节点仍被选中而确定
		const descendantCheckedNodes = parentNode.descendantList?.filter((item) => item.checked) || [];
		// 子节点选中，父节点也选中
		if (node.checked) {
			parentNode.checked = true;
		} else {
			// 子节点全部取消选中
			if (descendantCheckedNodes.length === 0) {
				parentNode.checked = false;
			} else {
				parentNode.checked = true;
			}
		}
		parentNode.halfChecked = descendantCheckedNodes.length !== 0 && parentNode.descendantList?.length !== descendantCheckedNodes.length;
		updateCheckedRowsId(parentNode);
		if (parentNode.$parentId) {
			toggleParentNodeChecked(parentNode);
		}
	};

	// 行勾选状态变更时，更新表头全选的勾选状态
	const updateCheckAll = () => {
		let allTrue = true;
		let allFalse = true;

		for (let i = 0; i < innerRowsData.value.length; i++) {
			allTrue &&= Boolean(innerRowsData.value[i].checked);
			allFalse &&= Boolean(!innerRowsData.value[i].checked);
		}

		allChecked.value = allTrue;
		halfAllChecked.value = !(allTrue || allFalse);
	};

	// 切换行的勾选状态，指定status可设置勾选状态
	const toggleRowChecked = (node: InnerRowData | RowData, status?: boolean) => {
		const innerNode: InnerRowData | null = getInnerRowData(node);
		if (!innerNode || innerNode.disableCheck) {
			return;
		}
		if (typeof status === 'boolean') {
			innerNode.checked = status;
		} else {
			innerNode.checked = !innerNode.checked;
		}
		updateCheckedRowsId(innerNode);
		if (['downward', 'both'].includes(checkableRelation.value)) {
			toggleChildNodeChecked(innerNode);
		}
		if (['upward', 'both'].includes(checkableRelation.value)) {
			toggleParentNodeChecked(innerNode);
		}
		updateCheckAll();
		ctx.emit('checkChange', innerNode.checked, innerNode);
	};

	// 切换全选的勾选状态，指定status可设置勾选状态
	const toggleAllRowChecked = (status?: boolean) => {
		if (typeof status === 'boolean') {
			allChecked.value = status;
		} else {
			allChecked.value = !allChecked.value;
		}
		halfAllChecked.value = false;
		for (let i = 0; i < innerRowsData.value.length; i++) {
			if (!innerRowsData.value[i].disableCheck) {
				innerRowsData.value[i].checked = allChecked.value;
				innerRowsData.value[i].halfChecked = false;
				updateCheckedRowsId(innerRowsData.value[i]);
			}
		}
		ctx.emit('checkAllChange', allChecked.value);
	};

	// 获取当前选中的行数据
	const getCheckedRows = () => {
		const result: InnerRowData[] = [];
		for (let i = 0; i < innerRowsData.value.length; i++) {
			if (innerRowsData.value[i].checked) {
				result.push({ ...innerRowsData.value[i] })
			}
		}
		return result;
	};

	return {
		allChecked,
		halfAllChecked,
		updateInnerRowsData,
		getShowRowsData,
		toggleRowExpansion,
		toggleAllRowExpansion,
		toggleRowChecked,
		toggleAllRowChecked,
		getCheckedRows,
	};
}