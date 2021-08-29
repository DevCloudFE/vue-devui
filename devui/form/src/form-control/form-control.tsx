import { defineComponent, inject, onMounted, nextTick, ref, computed } from 'vue';
import './form-control.scss';
import Icon from '../../../icon/src/icon'

export default defineComponent({
	name: 'DFormControl',
	props: {
		feedbackStatus: {
			type: String,
			default: ''
		},
		extraInfo: {
			type: String,
			default: ''
		},
		suffixTemplate: {
			type: String,
			default: ''
		}
	},
	setup(props, ctx) {

		const formControl = ref();

		onMounted(() => {
			const dom = formControl.value;
			console.log('dom', dom);
			
		});

		const iconData = computed(() => {
			switch(props.feedbackStatus) {
				case 'pending':
					return {name: 'priority', color: '#e9edfa'};
				case 'success':
					return {name: 'right-o', color: 'rgb(61, 204, 166)'};
				case 'error':
					return {name: 'error-o', color: 'rgb(249, 95, 91)'};
				default:
					return {name: '', color: ''};
			}
		})
		
		return () => {
			const {
				feedbackStatus,
			} = props;
			return <div class="form-control" ref={formControl}>
				
				<div class={`devui-form-control-container${feedbackStatus ? ' has-feedback' : ''}${feedbackStatus === 'error' ? ' feedback-error' : ''}`}>
					{ctx.slots.default?.()}
					{
						feedbackStatus &&
						<span class="feedback-status">
							<Icon name={iconData.value.name} color={iconData.value.color}></Icon>
						</span>
					}
				</div>
				
			</div>
		}
	}
})