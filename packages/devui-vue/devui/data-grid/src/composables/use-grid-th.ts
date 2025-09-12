import { ref, inject, computed, watch } from 'vue';
import type { Ref, SetupContext } from 'vue';
import { DataGridInjectionKey } from '../data-grid-types';
import type { InnerColumnConfig, SortDirection, DataGridContext, FilterListItem, GridThFilterProps } from '../data-grid-types';

export function useGridThSort(columnConfig: Ref<InnerColumnConfig>) {
	const { rootCtx, execSortMethod, clearAllSortState } = inject(DataGridInjectionKey) as DataGridContext;
	const directionMap: Record<'asc' | 'desc' | 'default', SortDirection> = {
		asc: 'desc',
		desc: '',
		default: 'asc'
	};
	const direction = ref<SortDirection>('');

	const doSort = (directionVal: SortDirection) => {
		if (direction.value === directionVal) {
			return;
		}
		clearAllSortState();
		direction.value = directionVal;
		execSortMethod(direction.value, columnConfig.value.sortMethod);
		rootCtx.emit('sortChange', { field: columnConfig.value.field, direction: direction.value });
	};

	const onSortClick = () => {
		doSort(directionMap[direction.value || 'default']);
	};

	const doClearSort = () => {
		direction.value = '';
	};

	return { direction, doSort, onSortClick, doClearSort };
}

export function useGridThFilter(columnConfig: Ref<InnerColumnConfig>) {
	const filterActive = ref(false);
	const onFilterChange = (e: FilterListItem | FilterListItem[]) => {
		filterActive.value = Array.isArray(e) ? Boolean(e.length) : Boolean(e);
		columnConfig.value.filterChange?.(e);
	};
	const setFilterStatus = (status: boolean) => {
		filterActive.value = status;
	};

	return { filterActive, setFilterStatus, onFilterChange };
}

export function useGridThMultipleFilter(props: GridThFilterProps, ctx: SetupContext) {
	const _checkList = ref<FilterListItem[]>([]);
	const _checkAllRecord = ref(false);
	const _halfChecked = ref(false);
	const filterListTemp = computed(() => props.filterList?.slice());
	const _checkAll = computed({
		get: () => _checkAllRecord.value,
		set: (val: boolean) => {
			_checkAllRecord.value = val;
			for (let i = 0; i < _checkList.value.length; i++) {
				_checkList.value[i].checked = val;
			}
		}
	});

	watch(
		filterListTemp,
		() => {
			props.filterList?.forEach((item) => {
				_checkList.value.push({ checked: false, ...item });
			});
		},
		{ immediate: true }
	);

	const updateCheckAll = () => {
		if (!_checkList.value.length) {
			return;
		}

		let allTrue = true;
		let allFalse = true;

		for (let i = 0; i < _checkList.value.length; i++) {
			allTrue &&= Boolean(_checkList.value[i].checked);
			allFalse &&= Boolean(!_checkList.value[i].checked);
		}

		_checkAllRecord.value = allTrue;
		_halfChecked.value = !(allFalse || allTrue);
	};

	const getCheckedItems = () => _checkList.value.filter((item) => item.checked);

	const onCheckAllClick = () => {
		_checkAll.value = !_checkAll.value;
	};

	const onItemClick = (item: FilterListItem) => {
		item.checked = !item.checked;
		updateCheckAll();
	};

	const onConfirm = () => {
		ctx.emit('confirm', getCheckedItems());
	};

	return { _checkList, _checkAll, _halfChecked, onCheckAllClick, onItemClick, updateCheckAll, onConfirm };
}

export function useGridThDrag(columnConfig: Ref<InnerColumnConfig>) {
	const { fixHeader, rootRef, rootCtx, scrollRef, afterColumnDragend } = inject(DataGridInjectionKey) as DataGridContext;
	const resizing = ref(false);
	const thRef = ref();
	let initialWidth = 0;
	let mouseDownScreenX = 0;
	let resizeBarElement: HTMLElement;

	const onMousemove = (e: MouseEvent) => {
		const movementX = e.clientX - mouseDownScreenX;
		const newWidth = initialWidth + movementX;
		const finalWidth = Math.min(columnConfig.value.maxWidth as number, Math.max(columnConfig.value.minWidth as number, newWidth));
		if (resizeBarElement && scrollRef.value) {
			resizeBarElement.style.left = `${finalWidth + thRef.value.offsetLeft - (fixHeader.value ? scrollRef.value.scrollLeft : 0)}px`;
		}
		rootCtx.emit('resizing', { field: columnConfig.value.field, width: finalWidth });
	};

	const onMouseup = (e: MouseEvent) => {
		const movementX = e.clientX - mouseDownScreenX;
		const newWidth = initialWidth + movementX;
		const finalWidth = Math.min(columnConfig.value.maxWidth as number, Math.max(columnConfig.value.minWidth as number, newWidth));
		columnConfig.value.width = finalWidth;
		resizing.value = false;
		rootRef.value?.children[0].classList.remove('data-grid-selector');
		rootRef.value?.children[0].removeChild(resizeBarElement);
		afterColumnDragend(columnConfig.value.$columnId, initialWidth - finalWidth);
		rootCtx.emit('resizeEnd', { field: columnConfig.value.field, width: finalWidth, beforeWidth: initialWidth });
		document.removeEventListener('mouseup', onMouseup);
		document.removeEventListener('mousemove', onMousemove);
	};

	const onMousedown = (e: MouseEvent) => {
		const isHandle = (e.target as HTMLElement).classList.contains('resize-handle');
		if (isHandle && rootRef.value && scrollRef.value) {
			rootCtx.emit('resizeStart', columnConfig.value.field);
			const initialOffset = thRef.value.offsetLeft;
			initialWidth = thRef.value.offsetWidth as number;
			mouseDownScreenX = e.clientX;
			e.stopPropagation();
			resizing.value = true;

			rootRef.value.children[0].classList.add('data-grid-selector');

			resizeBarElement = document.createElement('div');
			resizeBarElement.classList.add('resize-bar');
			if (rootRef.value.children[0]) {
				resizeBarElement.style.display = 'block';
				resizeBarElement.style.left = initialOffset + initialWidth - (fixHeader.value ? scrollRef.value.scrollLeft + 2 : 2) + 'px';
				rootRef.value.children[0].appendChild(resizeBarElement);
			}

			document.addEventListener('mouseup', onMouseup);

			document.addEventListener('mousemove', onMousemove);
		}
	};

	return { thRef, resizing, onMousedown };
}