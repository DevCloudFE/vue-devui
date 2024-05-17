import { defineComponent, toRefs, inject, reactive } from 'vue';
import type { SetupContext } from 'vue';
import { Button } from '../../../button';
import { typeMenuProps, categorySearchInjectionKey } from '../category-search-types';
import type { TypeMenuProps, CategorySearchInjection } from '../category-search-types';

export default defineComponent({
	name: 'DCategorySearchTextInput',
	props: typeMenuProps,
	emits: ['close'],
	setup(props: TypeMenuProps, ctx: SetupContext) {
		const { tag } = toRefs(props);
		const { getTextInputValue } = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const formData = reactive({
			text: tag.value.value!.value,
		})
		const onConfirmClick = () => {
			getTextInputValue(tag.value, formData.text as string);
			ctx.emit('close');
		};
		const onCancelClick = () => {
			ctx.emit('close');
		};

		return () => (
			<d-form data={formData} pop-position={['right']}>
				<d-form-item field='text' rules={tag.value.validateRules}>
					<d-input
						v-model={formData.text}
						autocomplete='off'
						autofocus
						maxlength={tag.value.maxLength}
						placeholder={tag.value.placeholder || ''}></d-input>
				</d-form-item>
				<div class='dp-dropdown-operation-area'>
					<Button variant='solid' onClick={onConfirmClick}>
						确定
					</Button>
					<Button variant='solid' color='secondary' onClick={onCancelClick}>
						取消
					</Button>
				</div>
			</d-form>
		);
	},
});