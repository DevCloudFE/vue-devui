import { defineComponent, reactive, inject, onMounted } from 'vue';
import { dFormEvents, IForm } from '../form-types';
import './form-item.scss';

export default defineComponent({
	name: 'DFormItem',
	props: {
		dHasFeedback: {
			type: Boolean,
			default: false
		},
		cname: {
			type: String,
			default: 'd-form-item'
		},
		prop: {
			type: String,
			default: ''
		}
	},
	setup(props, ctx) {

		const dForm: IForm = reactive(inject('dForm', {} as IForm));
		const formData = reactive(dForm.formData);
		const labelData = reactive(dForm.labelData);
		
		const resetField = () => {
			formData[props.prop] = null;
			console.log('form-item resetField formData', formData);
		}

		const formItem = reactive({
			dHasFeedback: props.dHasFeedback,
			cname: props.cname,
			prop: props.prop,
			resetField			
		})

		const isHorizontal = labelData.layout === 'horizontal';
		const isVertical = labelData.layout === 'vertical';

		onMounted(() => {
			dForm.formMitt.emit(dFormEvents.addField, formItem);
		})
		return {
			isHorizontal,
			isVertical,
			resetField
		}
	},

	render() {
		const {
			isHorizontal,
			isVertical
		} = this;
		return <div class={`form-item${isHorizontal ? '' : (isVertical ? ' form-item-vertical' : ' columns')} `}>
				{this.$slots.default?.()}
			</div>
	}
})