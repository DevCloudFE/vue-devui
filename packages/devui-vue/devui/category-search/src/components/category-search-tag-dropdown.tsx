import { defineComponent, toRefs, inject, h, ref } from 'vue';
import { Dropdown } from '../../../dropdown';
import CategorySearchTag from './category-search-tag';
import { categorySearchDropdownProps, categorySearchInjectionKey } from '../category-search-types';
import type { CategorySearchDropdownProps, CategorySearchInjection, ICategorySearchTagItem } from '../category-search-types';

export default defineComponent({
	name: 'DCategorySearchDropdown',
	props: categorySearchDropdownProps,
	setup(props: CategorySearchDropdownProps) {
		const { item, isJoinLabelType } = toRefs(props);
		const { rootCtx, ComponentMap, onSearchKeyTagClick } = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const isVisible = ref(false);
		const checkType = (tag: ICategorySearchTagItem | undefined) => {
			return tag && tag.type === 'radio' ? 'all' : 'blank';
		}
		const onTagClick = () => {
			isVisible.value = !isVisible.value;
		};
		const onToggle = (status: boolean) => {
			isVisible.value = status;
		};
		const onDropdownClose = () => {
			isVisible.value = false;
		};

		return () =>
			item.value.type !== 'keyword' ? (
				<Dropdown
					visible={isVisible.value}
					trigger='manually'
					position={['bottom-start', 'top-start', 'bottom-end', 'top-end']}
					class='dp-category-search-dropdown dp-dropdown-menu-fix'
					close-scope={checkType(item.value)}
					onToggle={onToggle}>
					{{
						default: () => (
							<li class='dp-tag-item' onClick={onTagClick}>
								<CategorySearchTag item={item.value} isJoinLabelType={isJoinLabelType.value} />
							</li>
						),
						menu: () =>
							rootCtx.slots[`${item.value.field}Menu`]?.({ tagOption: item.value, close: onDropdownClose }) ||
							h(ComponentMap[item.value.type!], { tag: item.value, onClose: onDropdownClose })
					}}
				</Dropdown>
			) : (
				<li class='dp-tag-item' onClick={onSearchKeyTagClick}>
					<CategorySearchTag item={item.value} isJoinLabelType={isJoinLabelType.value} />
				</li>
			);
	},
});