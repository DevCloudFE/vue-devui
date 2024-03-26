import { defineComponent, toRefs, Teleport } from 'vue';
import { FlexibleOverlay } from '../../../overlay';
import { MoreIcon } from './category-search-icons';
import CategorySearchTag from './category-search-tag';
import { extendIconProps } from '../category-search-types';
import type { ExtendIconProps } from '../category-search-types';
import { useCategorySearchMore } from '../composables/use-category-search-icons';

export default defineComponent({
	name: 'DCategorySearchMore',
	props: extendIconProps,
	setup(props: ExtendIconProps) {
		const { disabled } = toRefs(props);
		const { isVisible, rootRef, iconRef, overlayRef, innerSelectedTags, joinLabelTypes } = useCategorySearchMore();

		return () => (
			<div class={['dp-category-search-icon', { disabled: disabled.value }]}>
				<MoreIcon ref={iconRef} onClick={() => (isVisible.value = !isVisible.value)} />
				<Teleport to='body'>
					<FlexibleOverlay
						v-model={isVisible.value}
						origin={rootRef.value}
						ref={overlayRef}
						align='start'
						position={['bottom-start', 'top-start', 'bottom-end', 'top-end']}
						class='dp-selected-tags-list'
						onClick={() => (isVisible.value = false)}>
						<ul>
							{innerSelectedTags.value.map((item) => (
								<li class='dp-tag-item'>
									<CategorySearchTag item={item} isJoinLabelType={joinLabelTypes.includes(item.type || '')} />
								</li>
							))}
						</ul>
					</FlexibleOverlay>
				</Teleport>
			</div>
		);
	},
});