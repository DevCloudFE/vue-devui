import type { Ref } from 'vue';
import type { InnerColumnConfig } from '../data-grid-types';

export function useDataGridColumnDrag(
	bodyContentWidth: Ref<number>,
	scrollRef: Ref<HTMLElement | undefined>,
	renderFixedLeftColumnData: Ref<InnerColumnConfig[]>,
	renderFixedRightColumnData: Ref<InnerColumnConfig[]>,
	renderColumnData: Ref<InnerColumnConfig[]>
) {
	const afterColumnDragend = (columnId: InnerColumnConfig['$columnId'], offset: number) => {
		const columnLength = renderColumnData.value.length;
		const lastColumn = renderColumnData.value[columnLength - 1];
		const scrollDistance = scrollRef.value!.scrollWidth - scrollRef.value!.clientWidth;

		// 拖动结束，最后一列对宽度做补偿
		if (offset > 0 && scrollDistance > 0 && offset > scrollDistance) {
			offset = offset - scrollDistance;
			lastColumn.width = Math.min(
				lastColumn.maxWidth as number,
				Math.max(lastColumn.minWidth as number, (lastColumn.width as number) + offset)
			);
		} else if (scrollDistance <= -0 && lastColumn.$columnId !== columnId) {
			lastColumn.width = Math.min(
				lastColumn.maxWidth as number,
				Math.max(lastColumn.minWidth as number, (lastColumn.width as number) + offset)
			);
		}
		// 重新计算总宽度
		let bodyTotalWidth = 0;
		for (let i = 0; i < renderFixedLeftColumnData.value.length; i++) {
			bodyTotalWidth += renderFixedLeftColumnData.value[i].width as number;
		}
		for (let i = 0; i < renderFixedRightColumnData.value.length; i++) {
			bodyTotalWidth += renderFixedRightColumnData.value[i].width as number;
		}
		for (let i = 0; i < renderColumnData.value.length; i++) {
			bodyTotalWidth += renderColumnData.value[i].width as number;
		}
		bodyContentWidth.value = bodyTotalWidth;
	};

	return { afterColumnDragend }
}