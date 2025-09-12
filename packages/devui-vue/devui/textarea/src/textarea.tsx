import { defineComponent, inject, nextTick, onMounted, SetupContext, shallowRef, toRefs, watch } from 'vue';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../form';
import { textareaProps, TextareaProps } from './textarea-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useTextareaRender } from './composables/use-textarea-render';
import { useTextareaEvent } from './composables/use-textarea-event';
import { useTextareaAutosize } from './composables/use-textarea-autosize';
import './textarea.scss';

export default defineComponent({
  name: 'DTextarea',
  inheritAttrs: false,
  props: textareaProps,
  emits: ['update:modelValue', 'update', 'focus', 'blur', 'change', 'keydown'],
  setup(props: TextareaProps, ctx: SetupContext) {
    const { modelValue } = toRefs(props);
    const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
    const textarea = shallowRef<HTMLTextAreaElement>();
    const ns = useNamespace('textarea');
    const { isFocus, textareaDisabled, wrapClasses } = useTextareaRender(props);
    const { onFocus, onBlur, onInput, onChange, onKeydown } = useTextareaEvent(isFocus, props, ctx);
    const { textareaStyle, updateTextareaStyle } = useTextareaAutosize(props, textarea);

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) {
          formItemContext?.validate('change').catch((err) => console.warn(err));
        }
        nextTick(() => updateTextareaStyle());
      }
    );

    onMounted(() => {
      updateTextareaStyle();
    });

    return () => (
      <div style="width: 100%">
        <textarea
          ref={textarea}
          {...ctx.attrs}
          value={modelValue.value}
          autofocus={props.autofocus}
          placeholder={props.placeholder}
          disabled={textareaDisabled.value}
          style={textareaStyle.value}
          class={wrapClasses.value}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeydown={onKeydown}></textarea>
        {props.showCount && (
          <div class={ns.e('show-count')}>
            {modelValue.value.length}
            {!(ctx.attrs.maxlength ?? false) ? '' : ' / ' + ctx.attrs.maxlength}
          </div>
        )}
      </div>
    );
  },
});
