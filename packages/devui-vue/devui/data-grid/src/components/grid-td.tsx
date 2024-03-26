import { defineComponent, toRefs, inject } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { Checkbox } from '../../../checkbox';
import { ExpandIcon, FoldIcon } from './grid-icons';
import { gridTdProps, DataGridInjectionKey } from '../data-grid-types';
import type { GridTdProps, DataGridContext } from '../data-grid-types';
import { ToggleTreeIcon, DataGridCheckboxClass } from '../const';

export default defineComponent({
	name: 'GridTd',
	props: gridTdProps,
	setup(props: GridTdProps) {
		const ns = useNamespace('data-grid');
		const { indent, size, cellClass, rootCtx, isTreeGrid, toggleRowExpansion, toggleRowChecked } = inject(
			DataGridInjectionKey
		) as DataGridContext;
		const { rowData, cellData, rowIndex, mouseenterCb, mouseleaveCb } = toRefs(props);

		const getColumnIndex = () => Number(cellData.value.$columnId.split('-')[1]);

		const tdClasses = () => {
			const realTdClass =
				typeof cellClass.value === 'string'
					? cellClass.value
					: cellClass.value(rowData.value, rowIndex.value, cellData.value, getColumnIndex());
			return {
				[ns.e('td')]: true,
				[ns.m(cellData.value.align)]: true,
				[ns.em('td', cellData.value.type)]: true,
				[ns.em('td', size.value)]: true,
				[realTdClass]: true,
			}
		};

		const onCellClick = (e: Event) => {
			const composedPath = e.composedPath() as HTMLElement[];
			if (composedPath.some((item) => item.classList?.contains(ToggleTreeIcon) || item.classList?.contains(DataGridCheckboxClass))) {
				return;
			}
			rootCtx.emit('cellClick', {
				row: { ...rowData.value },
				renderRowIndex: rowIndex.value,
				flattenRowIndex: rowData.value.$rowIndex,
				column: { ...cellData.value },
				columnIndex: getColumnIndex(),
			});
		};

		const toggleExpand = () => {
			toggleRowExpansion(rowData.value);
		};

		const onCheckedChange = () => {
			toggleRowChecked(rowData.value);
		};

		const cellTypeMap = {
			checkable: () => (
				<Checkbox
					modelValue={rowData.value.checked}
					halfChecked={rowData.value.halfChecked}
					disabled={rowData.value.disableCheck}
					class="data-grid-checkbox"
					onChange={onCheckedChange}
				/>
			),
			index: () => rowData.value.$rowIndex! + 1,
			default: () => rowData.value[cellData.value.field],
		};

		return () => (
			<div
				class={tdClasses()}
				style={{ width: cellData.value.width + 'px' }}
				onClick={onCellClick}
				onMouseenter={(e) => mouseenterCb.value(e, cellData.value.showOverflowTooltip)}
				onMouseleave={(e) => mouseleaveCb.value(e, cellData.value.showOverflowTooltip)}>
				{isTreeGrid.value && cellData.value.$showExpandTreeIcon && (
					<>
						<span class='tree-indent-placeholder' style={{ width: (rowData.value.$level - 1) * indent.value + 'px' }}></span>
						{rowData.value.$expand ? (
							<ExpandIcon
								class={[ToggleTreeIcon, 'expand-icon']}
								style={{ visibility: !rowData.value.isLeaf ? 'visible' : 'hidden' }}
								onClick={toggleExpand}
							/>
						) : (
							<FoldIcon
								class={[ToggleTreeIcon, 'fold-icon']}
								style={{ visibility: !rowData.value.isLeaf ? 'visible' : 'hidden' }}
								onClick={toggleExpand}
							/>
						)}
					</>
				)}
				{cellData.value.cellRender?.(rowData.value, rowData.value.$rowIndex!, rowData.value[cellData.value.field], getColumnIndex()) ??
					cellTypeMap[cellData.value.type || 'default']()}
			</div>
		);
	},
});