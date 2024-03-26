import { defineComponent, inject, } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import GridHead from './grid-head';
import GridBody from './grid-body';
import { DataGridInjectionKey } from '../data-grid-types';
import type { DataGridContext } from '../data-grid-types';
import { useDataGridLazy } from '../composables/use-data-grid-scroll';

export default defineComponent({
	name: 'NormalHeadGrid',
	setup() {
		const ns = useNamespace('data-grid');
		const {
			scrollRef,
			showHeader,
			bodyContentWidth,
			bodyContentHeight,
			renderColumnData,
			renderFixedLeftColumnData,
			renderFixedRightColumnData,
			renderRowData,
			translateX,
			translateY,
			bodyScrollLeft,
			rootCtx
		} = inject(DataGridInjectionKey) as DataGridContext;
		useDataGridLazy(scrollRef);

		return () => (
			<div ref={scrollRef}>
				<div class={ns.e('x-space')} style={{ width: bodyContentWidth.value + 'px' }}></div>
				<div class={ns.e('y-space')} style={{ height: bodyContentHeight.value + 'px' }}></div>
				{showHeader.value && (
					<GridHead
						columnData={renderColumnData.value}
						leftColumnData={renderFixedLeftColumnData.value}
						rightColumnData={renderFixedRightColumnData.value}
						translateX={translateX.value}
						bodyScrollLeft={bodyScrollLeft.value}
					/>
				)}
				{Boolean(renderRowData.value.length) ? (
					<GridBody
						rowData={renderRowData.value}
						columnData={renderColumnData.value}
						leftColumnData={renderFixedLeftColumnData.value}
						rightColumnData={renderFixedRightColumnData.value}
						translateX={translateX.value}
						translateY={translateY.value}
						bodyScrollLeft={bodyScrollLeft.value}
					/>
				) : (
					<div class={ns.e('empty')} style={{ left: bodyScrollLeft.value + 'px' }}>
						{rootCtx.slots.empty?.()}
					</div>
				)}
			</div>
		);
	},
});