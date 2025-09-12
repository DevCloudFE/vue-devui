import { v4 as uuidv4 } from 'uuid';
import type { Ref } from 'vue';
import { isFunction } from 'lodash';
import type { RowData, InnerRowData, RowKey, InnerColumnConfig, ColumnConfig } from './data-grid-types';
import { ColumnMinWidth } from './const';

export function getRealWidth(width: string | number | undefined, totalWidth: number) {
	if (width === undefined) {
		return width;
	}
	if (typeof width === 'string') {
		if (width.endsWith('%')) {
			return totalWidth * (parseInt(width) / 100);
		} else {
			return parseInt(width);
		}
	} else {
		return width;
	}
}

export function calcEachColumnWidth(columns: ColumnConfig[], containerWidth: number): ColumnConfig[] {
	const flexColumnIndex: number[] = [];
	const result: ColumnConfig[] = [];
	let totalMinWidth = 0;

	// 根据配置的width参数计算每列宽度
	for (let i = 0; i < columns.length; i++) {
		const item = { ...columns[i] };
		item.minWidth = getRealWidth(item.minWidth, containerWidth) ?? ColumnMinWidth;
		item.maxWidth = getRealWidth(item.maxWidth, containerWidth) ?? Infinity;
		if (item.width) {
			item.width = getRealWidth(item.width, containerWidth) as number;
			totalMinWidth += item.width;
		} else {
			// 记录没有配置width参数的列索引
			flexColumnIndex.push(i);
		}
		result.push(item);
	}

	if (flexColumnIndex.length) {
		const remainWidth = containerWidth - totalMinWidth;

		if (remainWidth > 0) {
			const flexColumnItemWidth = remainWidth / flexColumnIndex.length;
			flexColumnIndex.forEach((item) => {
				result[item].width = Math.min(result[item].maxWidth as number, Math.max(result[item].minWidth as number, flexColumnItemWidth));
			});
		} else {
			flexColumnIndex.forEach((item) => {
				result[item].width = result[item].minWidth;
			})
		}
	}

	return result;
}

export function getXStartOrEndIndex(list: InnerColumnConfig[], distance: number) {
	let start = 0;
	let end = list.length - 1;
	while (start < end) {
		const mid = Math.floor((start + end) / 2);
		const { width, offsetLeft } = list[mid];
		if (distance >= offsetLeft && distance < (width as number) + offsetLeft) {
			start = mid;
			break;
		} else if (distance >= (width as number) + offsetLeft) {
			start = mid + 1;
		} else if (distance < offsetLeft) {
			end = mid - 1;
		}
	}
	return start;
}

export function getYStartIndex(list: RowData[], distance: number) {
	let start = 0;
	let end = list.length - 1;

	while (start < end) {
		const mid = Math.floor((start + end) / 2);
		const { height, offsetTop } = list[mid];
		if (distance >= offsetTop && distance < height + offsetTop) {
			start = mid;
			break;
		} else if (distance >= height + offsetTop) {
			start = mid + 1;
		} else if (distance < offsetTop) {
			end = mid - 1;
		}
	}

	return start;
}

export function generateInnerData(
	rowDataList: RowData[],
	rowIndex: Ref<number>,
	rowKey: Ref<RowKey | undefined> | undefined,
	level = 0,
	parentNode: InnerRowData = {}
) {
	level++;
	const result: InnerRowData[] = [];

	for (let i = 0; i < rowDataList.length; i++) {
		const newItem: InnerRowData = rowDataList[i];
		newItem.$rowIndex = rowIndex.value;
		newItem.$level = level;
		newItem.showNode = level === 1;
		newItem.$expand = false;
		newItem.isLeaf = newItem.isLeaf ?? !newItem.children?.length;
		rowIndex.value++;

		if (rowKey && rowKey.value) {
			if (typeof rowKey.value === 'string') {
				newItem.$rowId = newItem[rowKey.value];
			} else if (isFunction(rowKey.value)) {
				newItem.$rowId = rowKey.value(rowDataList[i]);
			} else {
				newItem.$rowId = uuidv4();
			}
		} else {
			newItem.$rowId = uuidv4();
		}

		if (parentNode.$rowId) {
			newItem.$parentId = parentNode.$rowId;
		}

		if (!(newItem.children && newItem.children.length)) {
			newItem.childList = [];
			result.push(newItem);
		} else {
			const childrenNodes = generateInnerData(newItem.children, rowIndex, rowKey, level, newItem);
			Reflect.deleteProperty(newItem, 'children');
			newItem.childList = childrenNodes.filter((child) => child.$parentId === newItem.$rowId);
			newItem.descendantList = childrenNodes;
			const childCheckedNodes = childrenNodes.filter((child) => child.checked);
			newItem.halfChecked = childCheckedNodes.length !== 0 && childrenNodes.length !== childCheckedNodes.length;
			result.push(newItem, ...childrenNodes);
		}
	}

	return result;
}