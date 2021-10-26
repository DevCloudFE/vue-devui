import { defineComponent, ref } from 'vue'
import { textareaProps, TextareaProps } from './textarea-types'
import './textarea.scss'

export default defineComponent({
	name: 'DTextarea',
	props: textareaProps,
	emits: ['update:value', 'focus', 'blur', 'change', 'keydown'],
	setup(props: TextareaProps, ctx) {
		const textareaCls = {
			error: props.error,
			[props.cssClass]: true,
		}

		const curLengthRef = ref<number>(0)
		const onInput = ($event: Event) => {
			const inputValue = ($event.target as HTMLInputElement).value
			curLengthRef.value = inputValue.length
			ctx.emit('update:value', inputValue);
		},
			onFocus = ($event: Event) => {
				ctx.emit('focus', $event);
			},
			onBlur = ($event: Event) => {
				ctx.emit('blur', $event);
			},
			onChange = ($event: Event) => {
				ctx.emit('change', ($event.target as HTMLInputElement).value);
			},
			onKeydown = ($event: KeyboardEvent) => {
				ctx.emit('keydown', $event);
			};

		return {
			textareaCls, onInput, onFocus, onBlur, onChange, onKeydown, curLengthRef, ...props
		};

	},
	render() {
		const {
			id,
			value,
			placeholder,
			disabled,
			maxLength,
			resize,
			textareaCls,
			onInput,
			onFocus,
			onBlur,
			onChange,
			onKeydown,
			showCount,
			curLengthRef,
			...attrs
		} = this
		return (
			<div class='devui-textarea-wrap'
			>
				<textarea
					{...attrs}
					{...{ DTextarea: true }}
					id={id}
					value={value}
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
