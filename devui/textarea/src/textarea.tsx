import { computed, defineComponent, ref } from 'vue'
import { textareaProps, TextareaProps } from './textarea-types'
import './textarea.scss'

export default defineComponent({
	name: 'DTextarea',
	props: textareaProps,
	emits: ['update:value', 'focus', 'blur', 'change', 'keydown'],
	setup(props: TextareaProps, ctx) {

		const showCount = true

		const textareaCls = {
			error: props.error,
			[props.cssClass]: true,
		}
		console.log('textareaCls: ', textareaCls);

		const curLengthRef = ref<number>(0)
		console.log('curLength: ', curLengthRef.value);

		const onInput = ($event: Event) => {
			const inputValue = ($event.target as HTMLInputElement).value
			console.log('inputValue: ', inputValue);
			curLengthRef.value = inputValue.length
			console.log('inputValue.length: ', inputValue.length);
			ctx.emit('update:value', inputValue);
		},
			onFocus = () => {
				ctx.emit('focus');
			},
			onBlur = () => {
				ctx.emit('blur');
			},
			onChange = ($event: Event) => {
				ctx.emit('change', ($event.target as HTMLInputElement).value);
			},
			onKeydown = ($event: KeyboardEvent) => {
				ctx.emit('keydown', $event);
			};

		return {
			textareaCls, onInput, onFocus, onBlur, onChange, onKeydown, showCount, curLengthRef
		};

	},
	render() {
		const { id, placeholder, disabled,

			maxLength, resize, textareaCls, onInput, onFocus, onBlur, onChange, onKeydown
			, showCount, curLengthRef, ...attrs } = this
		console.log('textareaCls: ', attrs);
		return (
			<div class='devui-textarea-wrap'
			>
				<textarea
					{...attrs}
					{...{ DTextarea: true }}
					id={id}
					autofocus={true}
					placeholder={placeholder}
					disabled={disabled}
					maxlength={maxLength}
					style={{ resize: resize }}
					class={textareaCls}
					onInput={onInput}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onChange}
					onKeydown={onKeydown}
				>
				</textarea>
				{
					showCount && <div
						class='devui-textarea-show-count'>
						{curLengthRef}
						{!(maxLength ?? false) ? '' : ' / ' + maxLength}
					</div>
				}
			</div>
		)
	}
})
