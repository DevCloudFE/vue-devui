import { defineComponent, toRefs, Teleport } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { FlexibleOverlay } from '../../../overlay';
import GridTh from './grid-th';
import { gridHeadProps } from '../data-grid-types';
import type { GridHeadProps } from '../data-grid-types';
import { useOverflowTooltip } from '../composables/use-overflow-tooltip';

export default defineComponent({
	name: 'GridHead',
	props: gridHeadProps,
	setup(props: GridHeadProps) {
		const ns = useNamespace('data-grid');
		const { columnData, leftColumnData, rightColumnData, translateX, bodyScrollLeft } = toRefs(props);
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

		return () => (
			<>
				{Boolean(leftColumnData.value.length) && (
					<div class={[ns.e('head'), ns.e('sticky-left-head')]} style={{ left: bodyScrollLeft.value + 'px' }}>
						{leftColumnData.value.map((item, index) => (
							<GridTh
								columnConfig={item}
								class={{ [ns.e('last-sticky-left-cell')]: index === leftColumnData.value.length - 1 }}
								mouseenterCb={onCellMouseenter}
								mouseleaveCb={onCellMouseleave}
							/>
						))}
					</div>
				)}

				{Boolean(rightColumnData.value.length) && (
					<div class={[ns.e('head'), ns.e('sticky-right-head')]} style={{ right: `-${bodyScrollLeft.value}px` }}>
						{rightColumnData.value.map((item, index) => (
							<GridTh
								columnConfig={item}
								class={{ [ns.e('first-sticky-right-cell')]: index === 0 }}
								mouseenterCb={onCellMouseenter}
								mouseleaveCb={onCellMouseleave}
							/>
						))}
					</div>
				)}

				<div class={ns.e('head')} style={{ transform: `translate(${translateX.value}px,0)` }}>
					{columnData.value.map((item) => (
						<GridTh columnConfig={item} mouseenterCb={onCellMouseenter} mouseleaveCb={onCellMouseleave} />
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
				</Teleport >
			</>
		);
	},
});