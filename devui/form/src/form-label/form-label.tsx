import { defineComponent, inject, reactive, computed } from 'vue';
import { IForm, formLabelProps, FormLabelProps, formInjectionKey } from '../form-types';
import './form-label.scss';
import Icon from '../../../icon/src/icon';

export default defineComponent({
	name: 'DFormLabel',
	props: formLabelProps,
	setup(props: FormLabelProps, ctx) {
		const dForm = reactive(inject(formInjectionKey, {} as IForm));
		const labelData = reactive(dForm.labelData);

		const isHorizontal = computed(() => labelData.layout === 'horizontal').value;
		const isLg = computed(() => labelData.labelSize === 'lg').value;
		const isSm = computed(() => labelData.labelSize === 'sm').value;
		const isCenter = computed(() => labelData.labelAlign === 'center').value;
		const isEnd = computed(() => labelData.labelAlign === 'end').value;
		
		const wrapperCls = `form-label${isHorizontal ? (isSm ? ' form-label_sm' : (isLg ? ' form-label_lg' : ' form-label_sd')) : ''}${isCenter ? ' form-label_center' : (isEnd ? ' form-label_end' : '')}`;
		const className = `${props.required ? ' devui-required' : ''}`;
		const style = {display: isHorizontal ? 'inline' : 'inline-block'};
		
		return () => {
			return <span class={wrapperCls} style={style}>
				<span class={className} >
					{ctx.slots.default?.()} 
					{
						props.hasHelp && 
						<span class="form-label-help">
							{(props.hasHelp ? <Icon name="helping" color="#252b3a"></Icon> : null)}
						</span>}
				</span>
			</span>
		}
	}
})