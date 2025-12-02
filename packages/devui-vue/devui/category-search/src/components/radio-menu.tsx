import { defineComponent, toRefs, computed, inject } from 'vue';
import { typeMenuProps, categorySearchInjectionKey } from '../category-search-types';
import type { TypeMenuProps, CategorySearchInjection } from '../category-search-types';

export default defineComponent({
	name: 'DCategorySearchRadioMenu',
	props: typeMenuProps,
	setup(props: TypeMenuProps) {
		const { tag } = toRefs(props);
		const { chooseItem, innerTextConfig } = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const key = computed(() => tag.value.filterKey || 'label');

		return () =>
			tag.value.options?.length ? (
				<ul class='dp-dropdown-menu-template dp-scrollbar'>
					{tag.value.options.map((item) => (
						<li
							class={['dp-dropdown-item', { active: tag.value.value?.[key.value] === item[key.value] }]}
							title={item[key.value]}
							onClick={() => chooseItem(tag.value, item)}>
							<span>{item[key.value]}</span>
						</li>
					))}
				</ul>
			) : (
				<div class='dp-no-data-tip'>{ innerTextConfig.value.tagMenuEmpty || '暂无数据' }</div>
			);
	},
});