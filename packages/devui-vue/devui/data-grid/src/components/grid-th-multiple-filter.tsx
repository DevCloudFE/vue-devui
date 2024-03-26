import { defineComponent, withModifiers, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import { createI18nTranslate } from '@devui/shared/components/locale/create';
import { Button } from '../../../button';
import { Checkbox } from '../../../checkbox';
import { gridThFilterProps } from '../data-grid-types';
import type { GridThFilterProps } from '../data-grid-types';
import { useGridThMultipleFilter } from '../composables/use-grid-th';

export default defineComponent({
	name: 'GridThMultipleFilter',
	props: gridThFilterProps,
	emits: ['confirm'],
	setup(props: GridThFilterProps, ctx: SetupContext) {
		const app = getCurrentInstance();
		const t = createI18nTranslate('DDataGrid', app);
		const { _checkList, _checkAll, _halfChecked, onCheckAllClick, onItemClick, updateCheckAll, onConfirm } = useGridThMultipleFilter(
			props,
			ctx
		);

		return () => (
			<>
				<div class='filter-all-check'>
					<div class='filter-item' onClick={withModifiers(onCheckAllClick, ['self'])}>
						<Checkbox v-model={_checkAll.value} halfChecked={_halfChecked.value} label={t('selectAll')} />
					</div>
				</div>
				<div class='filter-multiple-menu'>
					{_checkList.value.map((item) => (
						<div
							class='filter-item'
							onClick={withModifiers(() => {
								onItemClick(item);
							}, ['self'])}>
							<Checkbox v-model={item.checked} label={item.name} onChange={updateCheckAll} />
						</div>
					))}
				</div>
				<div class='filter-operation'>
					<Button variant='text' onClick={onConfirm}>
						{t('ok')}
					</Button>
				</div>
			</>
		);
	},
});