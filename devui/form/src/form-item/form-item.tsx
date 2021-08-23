import { defineComponent, reactive, inject, onMounted } from 'vue';
import { dFormEvents, IForm } from '../form-types';
import './form-item.scss';

export default defineComponent({
	name: 'DFormItem',
	props: {
		dHasFeedback: {
			type: Boolean,
			default: false
		}
	},
	setup(props, ctx) {

		const dForm = reactive(inject('dForm', {} as IForm));
		const labelData = reactive(dForm.labelData);
		console.log('form-item labelData', labelData);
		console.log('form-item labelData.layout', labelData.layout);

		const formItem = reactive({
			dHasFeedback: props.dHasFeedback
		})
		

		const isHorizontal = labelData.layout === 'horizontal';
		const isVertical = labelData.layout === 'vertical';

		onMounted(() => {
			dForm.formMitt.emit(dFormEvents.addField, formItem);
		})
		return () => {
			return <div class={`form-item${isHorizontal ? '' : (isVertical ? ' form-item-vertical' : ' columns')} `}>
				{ctx.slots.default?.()}
			</div>
		}
	}
})