import { defineComponent, toRefs, inject } from 'vue';
import type { SetupContext } from 'vue';
import { CheckboxGroup, Checkbox } from '../../../checkbox';
import { Button } from '../../../button';
import { typeMenuProps, categorySearchInjectionKey } from '../category-search-types';
import type { TypeMenuProps, CategorySearchInjection } from '../category-search-types';

export default defineComponent({
	name: 'DCategorySearchLabelMenu',
	props: typeMenuProps,
	emits: ['close'],
	setup(props: TypeMenuProps, ctx: SetupContext) {
		const { tag } = toRefs(props);
		const { chooseItems } = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const onConfirmClick = () => {
			chooseItems(tag.value);
			ctx.emit('close');
		};
		const onCancelClick = () => {
			ctx.emit('close');
		};
		// label 拆分名称和颜色用于下拉选项显示
		const splitLabel = (key: string, value: any) => {
			// 初始化选中类型生成标签时，value为label的对象，不需要对值进行操作
			if (typeof value !== 'string') {
				return;
			}
			const res = value && value.split('_');
			const obj = res && { label: res[0], color: res[1] };
			return obj && obj[key];
		};

		return () =>
			tag.value.options?.length ? (
				<>
					<div class='dp-dropdown-menu-template'>
						<CheckboxGroup v-model={tag.value.value!.value}>
							{tag.value.options.map((item) => (
								<Checkbox value={item.$label}>
									<span
										class='dp-color-block'
										style={{ background: splitLabel('color', item.$label) }}
										title={splitLabel('label', item.$label)}></span>
									<span title={splitLabel('label', item.$label)}>{splitLabel('label', item.$label)}</span>
								</Checkbox>
							))}
						</CheckboxGroup>
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
				<div class='dp-no-data-tip'>暂无数据</div>
			);
	},
});