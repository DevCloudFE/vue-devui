import { defineComponent, ref, SetupContext, toRefs, watch } from 'vue';
import { textareaProps, TextareaProps } from './textarea-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useTextareaRender } from './composables/use-textarea-render';
import { useTextareaEvent } from './composables/use-textarea-event';
import './textarea.scss';

export default defineComponent({
  name: 'DTextarea',
  inheritAttrs: false,
  props: textareaProps,
  emits: ['update:modelValue', 'focus', 'blur', 'change', 'keydown'],
  setup(props: TextareaProps, ctx: SetupContext) {
    const { modelValue, disabled } = toRefs(props);
    const ns = useNamespace('textarea');
    const { isFocus, wrapClasses } = useTextareaRender(props);
    const { onFocus, onBlur, onInput, onChange, onKeydown } = useTextareaEvent(isFocus, ctx);

    return () => (
      <div>
        <textarea
          id={props.id}
          {...ctx.attrs}
          value={modelValue.value}
          autofocus={props.autofocus}
          placeholder={props.placeholder}
          disabled={disabled.value}
          style={{ resize: props.resize }}
          class={wrapClasses.value}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeydown={onKeydown}>
        </textarea>
        {props.showCount && (
          <div class={ns.e('show-count')}>
            {modelValue.value.length}
            {!(ctx.attrs.maxlength ?? false) ? '' : ' / ' + ctx.attrs.maxlength}
          </div>
        )}
      </div>
    );
  }
});
