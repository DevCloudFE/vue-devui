import { defineComponent, toRefs, inject } from 'vue';
import { ClearIcon } from './category-search-icons';
import { extendIconProps, categorySearchInjectionKey } from '../category-search-types';
import type { ExtendIconProps, CategorySearchInjection } from '../category-search-types';

export default defineComponent({
	name: 'DCategorySearchClear',
	props: extendIconProps,
	setup(props: ExtendIconProps) {
		const { disabled } = toRefs(props);
		const { clearFilter } = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const onClick = (e: Event) => {
			if (!disabled.value) {
				clearFilter(e);
			}
		};

		return () => (
			<div class={['dp-category-search-icon', { disabled: disabled.value }]} onClick={onClick}>
				<ClearIcon />
			</div>
		);
	},
});