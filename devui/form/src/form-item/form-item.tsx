import { defineComponent, reactive, inject, onMounted, provide, ref} from 'vue';
import { dFormEvents, IForm } from '../form-types';
import './form-item.scss';
import AsyncValidator, { Rules } from 'async-validator';
import mitt from 'mitt';

export default defineComponent({
	name: 'DFormItem',
	props: {
		dHasFeedback: {
			type: Boolean,
			default: false
		},
		prop: {
			type: String,
			default: ''
		}
	},
	setup(props, ctx) {
		const formItemMitt = mitt();
		const dForm: IForm = reactive(inject('dForm', {} as IForm));
		const formData = reactive(dForm.formData);
		const labelData = reactive(dForm.labelData);
		const rules = reactive(dForm.rules);

		rules.name && console.log('test-> formData', formData);
		// console.log('test-> rules', rules);
		
		
		const resetField = () => {
			switch(typeof formData[props.prop]) {
				case 'string': 
					formData[props.prop] = '';
					break;
				case 'number':
					formData[props.prop] = undefined;
					break;
				case 'boolean':
					formData[props.prop] = false;
					break;
			}
			if(Array.isArray(formData[props.prop])) {
				formData[props.prop] = [];
			}
			if(typeof props.prop === 'object') {
				formData[props.prop] = null;
			}
			console.log('form-item resetField formData', formData);
		}

		const formItem = reactive({
			dHasFeedback: props.dHasFeedback,
			prop: props.prop,
			formItemMitt,
			resetField			
		})
		provide('dFormItem', formItem);

		const isHorizontal = labelData.layout === 'horizontal';
		const isVertical = labelData.layout === 'vertical';
		const isColumns = labelData.layout === 'columns';

		const nameField = rules ? rules.name : [];
		const showMessage = ref(false);

		const descriptor: Rules = {
			name: {
				type: 'string',
				required: true,
				validator: (rule, value) => value.length !== 0,
			},
			age: {
				type: 'number',
				validator: (rule, value) => value > 0,
				// asyncValidator: (rule, value) => {
				// 	return new Promise((resolve, reject) => {
				// 		if (value < 18) {
				// 			reject('too young');  // reject with error message
				// 		} else {
				// 			resolve(value);
				// 		}
				// 	});
				// },
			},
		};

		const validator = new AsyncValidator(descriptor);

		onMounted(() => {
			dForm.formMitt.emit(dFormEvents.addField, formItem);

			props.prop && rules && formItem.formItemMitt.on('d.form.inputBlur', (e) => {
				validator.validate({ ...formData }).then(() => {
					// validation passed or without error message
					console.log('validator success');
					showMessage.value = false;
	
				}).catch(({ errors, fields }) => {
					console.log('validator errors', errors);
					console.log('validator fields', fields);
					showMessage.value = true;
				});
			});

		})
		return {
			isHorizontal,
			isVertical,
			isColumns,
			resetField,
			rules,
			showMessage
		}
	},

	render(props) {
		console.log('props', props);
		
		const {
			isHorizontal,
			isVertical,
			isColumns,
			rules,
			showMessage,
		} = this;
		return <div class={`form-item${isHorizontal ? '' : (isVertical ? ' form-item-vertical' : ' form-item-columns')} `}>
				{this.$slots.default?.()}
				<div>{showMessage && rules[props.prop] && rules[props.prop][0].message}</div>
			</div>
	}
})