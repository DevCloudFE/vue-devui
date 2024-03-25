import { defineComponent, inject, ref, watch, onMounted, onBeforeMount } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import GridHead from './grid-head';
import GridBody from './grid-body';
import { DataGridInjectionKey } from '../data-grid-types';
import type { DataGridContext } from '../data-grid-types';
import { useDataGridLazy } from '../composables/use-data-grid-scroll';

export default defineComponent({
	name: 'FixHeadGrid',
	setup() {
		const ns = useNamespace('data-grid');
		const {
			scrollRef,
			headBoxRef,
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
			rootCtx,
		} = inject(DataGridInjectionKey) as DataGridContext;
		const hasScrollbar = ref(false);
		let resizeObserver: ResizeObserver;
		useDataGridLazy(scrollRef);

		const isHaveScrollbar = () => {
			if (scrollRef.value) {
				hasScrollbar.value = scrollRef.value.scrollHeight > scrollRef.value.clientHeight;
			}
		};

		watch(bodyContentHeight, isHaveScrollbar, { immediate: true });

		onMounted(() => {
			if (scrollRef.value) {
				resizeObserver = new ResizeObserver(isHaveScrollbar);
				resizeObserver.observe(scrollRef.value);
			}
		});

		onBeforeMount(() => {
			resizeObserver?.disconnect();
		});

		return () => (
			<div>
				{showHeader.value && (
					<div ref={headBoxRef} class={ns.e('head-wrapper')} style={{ 'overflow-y': hasScrollbar.value ? 'scroll' : 'auto' }}>
						<div class={ns.e('x-space')} style={{ width: bodyContentWidth.value + 'px' }}></div>
						<GridHead
							columnData={renderColumnData.value}
							leftColumnData={renderFixedLeftColumnData.value}
							rightColumnData={renderFixedRightColumnData.value}
							translateX={translateX.value}
							bodyScrollLeft={bodyScrollLeft.value}
						/>
					</div>
				)}
				<div ref={scrollRef} class={[ns.e('body-wrapper'), 'devui-scroll-overlay']}>
					<div class={ns.e('x-space')} style={{ width: bodyContentWidth.value + 'px' }}></div>
					<div class={ns.e('y-space')} style={{ height: bodyContentHeight.value + 'px' }}></div>

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
			</div>
		);
	},
});