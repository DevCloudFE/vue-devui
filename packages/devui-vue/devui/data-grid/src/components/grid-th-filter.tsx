import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { Dropdown } from '../../../dropdown';
import { FilterIcon } from './grid-icons';
import { gridThFilterProps } from '../data-grid-types';
import type { FilterListItem, GridThFilterProps } from '../data-grid-types';
import GridThMultipleFilter from './grid-th-multiple-filter';
import GridThSingleFilter from './grid-th-single-filter';

export default defineComponent({
	name: 'GridThFilter',
	props: gridThFilterProps,
	emits: ['filterChange'],
	setup(props: GridThFilterProps, ctx: SetupContext) {
		const ns = useNamespace('data-grid');
		const filterIconRef = ref<HTMLElement>();
		const showMenu = ref(false);

		const toggleFilterMenu = (status?: boolean) => {
			if (typeof status === 'boolean') {
				showMenu.value = status;
			} else {
				showMenu.value = !showMenu.value;
			}
		};

		const onConfirm = (e: FilterListItem | FilterListItem[]) => {
			toggleFilterMenu(false);
			ctx.emit('filterChange', e);
		};

		const onScroll = (e: Event) => {
			const scrollElement = e.target as HTMLElement;
			if (filterIconRef.value && scrollElement?.contains(filterIconRef.value)) {
				toggleFilterMenu(false);
			}
		};

		onMounted(() => {
			window.addEventListener('scroll', onScroll, true);
		});

		onUnmounted(() => {
			window.removeEventListener('scroll', onScroll, true);
		});

		return () => (
			<Dropdown
				visible={showMenu.value}
				trigger='manually'
				close-scope='blank'
				destroy-on-hide={false}
				class={ns.e('filter-wrapper')}
				onToggle={(val: boolean) => (showMenu.value = val)}>
				{{
					default: () => (
						<FilterIcon
							ref={filterIconRef}
							class={['th-filter-icon', { 'th-filter-default-visible': props.showFilterIcon }]}
							onClick={toggleFilterMenu}
						/>
					),
					menu: () =>
						props.filterMenu?.({ toggleFilterMenu, setFilterStatus: props.setFilterStatus }) ??
						(props.multiple ? (
							<GridThMultipleFilter filterList={props.filterList} onConfirm={onConfirm} />
						) : (
							<GridThSingleFilter filterList={props.filterList} onSelect={onConfirm} />
						)),
				}}
			</Dropdown>
		);
	},
});
