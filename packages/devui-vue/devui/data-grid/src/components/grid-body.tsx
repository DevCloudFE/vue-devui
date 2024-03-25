import { defineComponent, toRefs, inject, ref, Teleport } from 'vue';
import { FlexibleOverlay } from '../../../overlay';
import GridTd from './grid-td';
import { gridBodyProps, DataGridInjectionKey } from '../data-grid-types';
import type { GridBodyProps, DataGridContext, InnerRowData } from '../data-grid-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { useOverflowTooltip } from '../composables/use-overflow-tooltip';
import { ToggleTreeIcon, DataGridCheckboxClass } from '../const';

export default defineComponent({
	name: 'GridBody',
	props: gridBodyProps,
	setup(props: GridBodyProps) {
		const ns = useNamespace('data-grid');
		const { rowClass, rootCtx } = inject(DataGridInjectionKey) as DataGridContext;
		const { rowData, columnData, leftColumnData, rightColumnData, translateX, translateY, bodyScrollLeft } = toRefs(props);
		const currentRowIndex = ref<number | undefined>();
		const {
			showTooltip,
			originRef,
			tooltipContent,
			tooltipPosition,
			tooltipClassName,
			onCellMouseenter,
			onCellMouseleave,
			onOverlayMouseenter,
			onOverlayMouseleave
		} = useOverflowTooltip();
		const trClasses = (rowData: InnerRowData, rowIndex: number) => {
			const realRowClass = typeof rowClass.value === 'string' ? rowClass.value : rowClass.value(rowData, rowIndex);
			return {
				[ns.e('tr')]: true,
				[realRowClass]: true,
				'hover-tr': currentRowIndex.value === rowIndex,
			};
		};
		const onRowClick = (e: Event, rowData: InnerRowData, rowIndex: number) => {
			const composedPath = e.composedPath() as HTMLElement[];
			if (composedPath.some((item) => item.classList?.contains(ToggleTreeIcon) || item.classList?.contains(DataGridCheckboxClass))) {
				return;
			}
			rootCtx.emit('rowClick', { row: { ...rowData }, renderRowIndex: rowIndex, flattenRowIndex: rowData.$rowIndex });
		};
		const onTrMouseenterOrLeave = (rowIndex: number | undefined) => {
			currentRowIndex.value = rowIndex;
		};

		return () => (
			<>
				{Boolean(leftColumnData.value.length) && (
					<div
						class={ns.e('sticky-left-body')}
						style={{ left: bodyScrollLeft.value + 'px', transform: `translateY(${translateY.value}px)` }}>
						{rowData.value.map((itemRow, rowIndex) => (
							<div
								class={trClasses(itemRow, rowIndex)}
								onClick={(e) => onRowClick(e, itemRow, rowIndex)}
								onMouseenter={() => onTrMouseenterOrLeave(rowIndex)}
								onMouseleave={() => onTrMouseenterOrLeave(undefined)}>
								{leftColumnData.value.map((cellData, cellIndex) => (
									<GridTd
										class={{ [ns.e('last-sticky-left-cell')]: cellIndex === leftColumnData.value.length - 1 }}
										rowData={itemRow}
										cellData={cellData}
										rowIndex={rowIndex}
										mouseenterCb={onCellMouseenter}
										mouseleaveCb={onCellMouseleave}
									/>
								))}
							</div>
						))}
					</div>
				)}

				{Boolean(rightColumnData.value.length) && (
					<div
						class={ns.e('sticky-right-body')}
						style={{ right: `-${bodyScrollLeft.value}px`, transform: `translateY(${translateY.value}px)` }}>
						{rowData.value.map((itemRow, rowIndex) => (
							<div
								class={trClasses(itemRow, rowIndex)}
								onClick={(e) => onRowClick(e, itemRow, rowIndex)}
								onMouseenter={() => onTrMouseenterOrLeave(rowIndex)}
								onMouseleave={() => onTrMouseenterOrLeave(undefined)}>
								{rightColumnData.value.map((cellData, cellIndex) => (
									<GridTd
										class={{ [ns.e('first-sticky-right-cell')]: cellIndex === 0 }}
										rowData={itemRow}
										cellData={cellData}
										rowIndex={rowIndex}
										mouseenterCb={onCellMouseenter}
										mouseleaveCb={onCellMouseleave}
									/>
								))}
							</div>
						))}
					</div>
				)}

				<div class={ns.e('body')} style={{ transform: `translate(${translateX.value}px, ${translateY.value}px)` }}>
					{rowData.value.map((itemRow, rowIndex) => (
						<div
							class={trClasses(itemRow, rowIndex)}
							onClick={(e) => onRowClick(e, itemRow, rowIndex)}
							onMouseenter={() => onTrMouseenterOrLeave(rowIndex)}
							onMouseleave={() => onTrMouseenterOrLeave(undefined)}>
							{columnData.value.map((cellData) => (
								<GridTd
									rowData={itemRow}
									cellData={cellData}
									rowIndex={rowIndex}
									mouseenterCb={onCellMouseenter}
									mouseleaveCb={onCellMouseleave}
								/>
							))}
						</div>
					))}
				</div>
				<Teleport to='body'>
					<FlexibleOverlay
						v-model={showTooltip.value}
						origin={originRef.value}
						class={[ns.e('tooltip'), tooltipClassName.value]}
						position={tooltipPosition.value}
						offset={6}
						show-arrow
						onMouseenter={onOverlayMouseenter}
						onMouseleave={onOverlayMouseleave}>
						<span>{tooltipContent.value}</span>
					</FlexibleOverlay>
				</Teleport>
			</>
		);
	},
});