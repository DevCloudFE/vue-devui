import { defineComponent, ref } from 'vue';
import type { SetupContext } from 'vue';
import { gridThFilterProps } from '../data-grid-types';
import type { GridThFilterProps, FilterListItem } from '../data-grid-types';

export default defineComponent({
	props: gridThFilterProps,
	emits: ['select'],
	setup(props: GridThFilterProps, ctx: SetupContext) {
		const selectedItem = ref<FilterListItem>();
		const handleSelect = (e: FilterListItem) => {
			selectedItem.value = e;
			ctx.emit('select', e);
		};

		return () => (
			<div class='filter-single-menu'>
				{props.filterList?.map((item) => (
					<div
						class={['filter-item', { 'filter-item-active': selectedItem.value === item }]}
						onClick={() => {
							handleSelect(item);
						}}>
						{item.name}
					</div>
				))}
			</div>
		);
	},
});