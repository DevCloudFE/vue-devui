import { defineComponent, toRefs, inject } from 'vue';
import { Tag } from '../../../tag';
import { categorySearchTagProps, categorySearchInjectionKey } from '../category-search-types';
import type { CategorySearchTagProps, CategorySearchInjection } from '../category-search-types';

export default defineComponent({
	name: 'DCategorySearchTag',
	props: categorySearchTagProps,
	setup(props: CategorySearchTagProps) {
		const { item, isJoinLabelType } = toRefs(props);
		const { rootCtx, tagMaxWidth, innerTextConfig, removeTag } = inject(categorySearchInjectionKey) as CategorySearchInjection;

		return () => (
			<Tag
				deletable
				title-content={item.value.title}
				max-width={tagMaxWidth?.value + 'px'}
				onTagDelete={(e: Event) => removeTag(item.value, e)}>
				{rootCtx.slots[`${item.value.field}Tag`] ? (
					rootCtx.slots[`${item.value.field}Tag`]!({ tag: item.value })
				) : isJoinLabelType.value ? (
					<>
						<span>{item.value.label}</span>
						<span class='dp-category-search-multi-tag' style={{ maxWidth: tagMaxWidth?.value + 'px' }}>
							{Array.isArray(item.value.value?.cache) &&
								item.value.value?.cache?.map((tag: any, index: number) => (
									<>
										{index > 0 && <span class='dp-color-block-split-line'>{innerTextConfig.value.labelConnector || '|'}</span>}
										{item.value.type === 'label' && (
											<span class='dp-color-block-sm' style={{ background: tag[item.value.colorKey || 'color'] }}></span>
										)}
										<span style={{ color: tag[item.value.colorKey || 'color'] }}>{tag[item.value.filterKey || 'label'] || ''}</span>
									</>
								))}
						</span>
					</>
				) : (
					`${item.value.label}: ${item.value.value?.[item.value.filterKey || 'label'] || ''}`
				)}
			</Tag>
		);
	},
});