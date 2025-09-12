import type { ColumnConfig, SortDirection, SortMethod, ScrollYParams, GridThContext } from "../data-grid-types";

export function useColumnSort(scrollYParams: ScrollYParams, afterSort: () => void) {
	const gridThListMap = new Map<ColumnConfig['field'], GridThContext>();

	// 执行sortMethod对数据源排序
	const execSortMethod = (direction: SortDirection, sortMethod?: SortMethod) => {
		const temp = [...scrollYParams.defaultSortRowData];
		if (direction === 'asc') {
			scrollYParams.originRowData = temp
				.sort((a, b) => (sortMethod ? (sortMethod(a, b) ? 1 : -1) : 0))
				.map((item, index) => ({ ...item, offsetTop: index * 40 }));
		} else if (direction === 'desc') {
			scrollYParams.originRowData = temp
				.sort((a, b) => (sortMethod ? (sortMethod(a, b) ? -1 : 1) : 0))
				.map((item, index) => ({ ...item, offsetTop: index * 40 }));
		} else {
			scrollYParams.originRowData = temp;
		}
		afterSort()
	};

	const addGridThContextToMap = (key: ColumnConfig['field'], thCtx: GridThContext) => {
		gridThListMap.set(key, thCtx);
	}

	const clearAllSortState = () => {
		gridThListMap.forEach((item) => {
			item.doClearSort();
		})
	}

	// 对外expose，业务手动对某列数据按指定顺序进行排序
	const sort = (key: ColumnConfig['field'], direction: SortDirection) => {
		gridThListMap.get(key)?.doSort(direction);
	};

	return { sort, execSortMethod, addGridThContextToMap, clearAllSortState };
}