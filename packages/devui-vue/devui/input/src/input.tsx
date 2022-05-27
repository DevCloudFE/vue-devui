import { defineComponent, watch, inject, toRefs, shallowRef, ref, computed } from 'vue';
import type { SetupContext } from 'vue';
import { inputProps, InputProps } from './input-types';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../form/src/components/form-item/form-item-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useInputRender } from './composables/use-input-render';
import { useInputEvent } from './composables/use-input-event';
import { useInputFunction } from './composables/use-input-function';
import './input.scss';

import Icon from '../../icon/src/icon';

export default defineComponent({
  name: 'DInput',
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'input', 'change', 'keydown', 'clear'],
  setup(props: InputProps, ctx: SetupContext) {
    const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
    const { modelValue, disabled } = toRefs(props);
    const ns = useNamespace('input');
    const slotNs = useNamespace('input-slot');
    const { isFocus, wrapClasses, inputClasses, customStyle, otherAttrs } = useInputRender(props, ctx);

    const input = shallowRef<HTMLInputElement>();
    const { select, focus, blur } = useInputFunction(input);

    const { onFocus, onBlur, onInput, onChange, onKeydown, onClear } = useInputEvent(isFocus, props, ctx, focus);

    const passwordVisible = ref(false);
    const clickPasswordIcon = () => {
      passwordVisible.value = !passwordVisible.value;
      blur();
    };

    const prefixVisiable = ctx.slots.prefix || props.prefix;
    const suffixVisiable = ctx.slots.suffix || props.suffix || props.showPassword || props.clearable;

    const showPwdVisible = computed(() => props.showPassword && !props.disabled);
    const showClearable = computed(() => props.clearable && !props.disabled);

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) {
          formItemContext?.validate('change').catch((err) => console.warn(err));
        }
      }
    );

    ctx.expose({ select, focus, blur });

    return () => (
      <div class={inputClasses.value} {...customStyle}>
        {ctx.slots.prepend && <div class={slotNs.e('prepend')}>{ctx.slots.prepend?.()}</div>}
        <div class={wrapClasses.value}>
          {prefixVisiable && (
            <span class={slotNs.e('prefix')}>
              {ctx.slots.prefix && <div>{ctx.slots.prefix?.()}</div>}
              {props.prefix && <Icon size={props.size} name={props.prefix} />}
            </span>
          )}
          <input
            ref={input}
            value={modelValue.value}
            disabled={disabled.value}
            class={ns.e('inner')}
            {...otherAttrs}
            type={props.showPassword ? (passwordVisible.value ? 'text' : 'password') : 'text'}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            onKeydown={onKeydown}
          />
          {suffixVisiable && (
            <span class={slotNs.e('suffix')}>
              {props.suffix && <Icon size={props.size} name={props.suffix} />}
              {ctx.slots.suffix && <div>{ctx.slots.suffix?.()}</div>}
              {showPwdVisible.value && (
                <Icon
                  size={props.size}
                  class={ns.em('password', 'icon')}
                  name={passwordVisible.value ? 'preview' : 'preview-forbidden'}
                  onClick={clickPasswordIcon}
                />
              )}
              {showClearable.value && <Icon size={props.size} class={ns.em('clear', 'icon')} name="close" onClick={onClear} />}
            </span>
          )}
        </div>
        {ctx.slots.append && <div class={slotNs.e('append')}>{ctx.slots.append?.()}</div>}
      </div>
    );
  },
});
