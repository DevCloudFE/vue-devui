import { defineComponent, inject } from 'vue';
import './form-control.scss';

export default defineComponent({
	name: 'DFormControl',
	props: {
		
	},
	setup(props, ctx) {
		const dForm = inject('dForm', {});
		// console.log('form-control dForm', dForm);
		
		return () => {
			return <div class="form-control">
				{ctx.slots.default?.()}
			</div>
		}
	}
})