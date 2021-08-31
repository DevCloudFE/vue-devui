import { defineComponent, reactive, inject, onMounted, onBeforeUnmount, provide, ref} from 'vue';
import { dFormEvents, dFormItemEvents, IForm } from '../form-types';
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
	setup(props) {
		const formItemMitt = mitt();
		const dForm: IForm = reactive(inject('dForm', {} as IForm));
		const formData = reactive(dForm.formData);
		const columnsClass = ref(dForm.columnsClass);
		const initFormItemData = formData[props.prop];
		const labelData = reactive(dForm.labelData);
		const rules = reactive(dForm.rules);
		
		const resetField = () => {
			formData[props.prop] = initFormItemData;
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

		const showMessage = ref(false);
		const tipMessage = ref('');

		const validate = (trigger: string) => {
			console.log('trigger', trigger);
			
			const ruleKey = props.prop;
			const ruleItem = rules[ruleKey];
			const descriptor: Rules = {};
			descriptor[ruleKey] = ruleItem;
			
			const validator = new AsyncValidator(descriptor);

			validator.validate({[ruleKey]: formData[ruleKey]}).then(() => {
				showMessage.value = false;
				tipMessage.value = '';
			}).catch(({ errors }) => {
				console.log('validator errors', errors);
				
				showMessage.value = true;
				tipMessage.value = errors[0].message;
			});
		}
		const validateEvents = [];

		const addValidateEvents = () => {
			
			if(rules && rules[props.prop]) {
				const ruleItem = rules[props.prop];
				let eventName = ruleItem['trigger'];

				if(Array.isArray(ruleItem)) {
					ruleItem.forEach((item) => {
						eventName = item['trigger'];
						const cb = () => validate(eventName);
						validateEvents.push({eventName: cb});
						formItem.formItemMitt.on(dFormItemEvents[eventName], cb);
					});
				}else {
					const cb = () => validate(eventName);
					validateEvents.push({eventName: cb});
					ruleItem && formItem.formItemMitt.on(dFormItemEvents[eventName], cb);
				}
			}
		}

		const removeValidateEvents = () => {
			if(rules && rules[props.prop] && validateEvents.length > 0) {
				validateEvents.forEach(item => {
					formItem.formItemMitt.off(item.eventName, item.cb);
				});
			}
		}

		onMounted(() => {
			dForm.formMitt.emit(dFormEvents.addField, formItem);
			addValidateEvents();
		});

		onBeforeUnmount(() => {
			console.log('onBeforeUnmount');
			
			removeValidateEvents();
		});
		return {
			isHorizontal,
			isVertical,
			isColumns,
			columnsClass,
			resetField,
			rules,
			showMessage,
			tipMessage
		}
	},

	render(props) {
		
		const {
			isHorizontal,
			isVertical,
			isColumns,
			columnsClass,
			showMessage,
			tipMessage,
		} = this;
		
		return <div class={`form-item${isHorizontal ? '' : (isVertical ? ' form-item-vertical' : ' form-item-columns')}${isColumns ? ' column-item ' + columnsClass : ''}`}>
				{this.$slots.default?.()}
				<div>{showMessage && tipMessage}</div>
			</div>
	}
})