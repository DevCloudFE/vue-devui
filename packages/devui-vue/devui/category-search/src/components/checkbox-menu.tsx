import { defineComponent, toRefs, inject } from 'vue';
import type { SetupContext } from 'vue';
import { CheckboxGroup } from '../../../checkbox';
import { Button } from '../../../button';
import { typeMenuProps, categorySearchInjectionKey } from '../category-search-types';
import type { TypeMenuProps, CategorySearchInjection } from '../category-search-types';

export default defineComponent({
	name: 'DCategorySearchCheckboxMenu',
	props: typeMenuProps,
	emits: ['close'],
	setup(props: TypeMenuProps, ctx: SetupContext) {
		const { tag } = toRefs(props);
		const { chooseItems, innerTextConfig } = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const onConfirmClick = () => {
			chooseItems(tag.value);
			ctx.emit('close');
		};
		const onCancelClick = () => {
			ctx.emit('close');
		};

		return () =>
			tag.value.options?.length ? (
				<>
					<div class='dp-dropdown-menu-template'>
						<CheckboxGroup v-model={tag.value.value!.value} options={tag.value.options}></CheckboxGroup>
					</div>
					<div class='dp-dropdown-operation-area'>
						<Button variant='solid' onClick={onConfirmClick}>
							确定
						</Button>
						<Button variant='solid' color='secondary' onClick={onCancelClick}>
							取消
						</Button>
					</div>
				</>
			) : (
				<div class='dp-no-data-tip'>{ innerTextConfig.value.tagMenuEmpty || '暂无数据' }</div>
			);
	},
});