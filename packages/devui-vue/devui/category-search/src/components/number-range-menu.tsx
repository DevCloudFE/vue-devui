import { defineComponent, toRefs, inject, ref } from 'vue';
import type { SetupContext } from 'vue';
import { InputNumber } from '../../../input-number';
import { Button } from '../../../button';
import { typeMenuProps, categorySearchInjectionKey } from '../category-search-types';
import type { TypeMenuProps, CategorySearchInjection } from '../category-search-types';

export default defineComponent({
	name: 'DCategorySearchNumberRange',
	props: typeMenuProps,
	emits: ['close'],
	setup(props: TypeMenuProps, ctx: SetupContext) {
		const { tag } = toRefs(props);
		const { getNumberRangeValue } = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const num = ref(tag.value.value!.value?.length ? [...tag.value.value!.value] : [0, 0]);
		const onConfirmClick = () => {
			getNumberRangeValue(tag.value, num.value);
			ctx.emit('close');
		};
		const onCancelClick = () => {
			ctx.emit('close');
		};

		return () => (
			<>
				<div class='dp-input-number-operation-area'>
					<InputNumber
						size='sm'
						v-model={num.value[0]}
						min={tag.value.min.left}
						max={tag.value.max.left}
						step={tag.value.step.left || 1}
						placeholder={tag.value.placeholder?.left || ''}></InputNumber>
					<span>-</span>
					<InputNumber
						size='sm'
						v-model={num.value[1]}
						min={tag.value.min.right}
						max={tag.value.max.right}
						step={tag.value.step.right || 1}
						placeholder={tag.value.placeholder?.right || ''}></InputNumber>
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
		);
	},
});