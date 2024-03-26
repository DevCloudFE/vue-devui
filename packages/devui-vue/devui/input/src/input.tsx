import { defineComponent, watch, inject, toRefs, shallowRef, ref, computed, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import Icon from '../../icon/src/icon';
import { AutoFocus } from '../../auto-focus';
import { inputProps, InputProps } from './input-types';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../form/src/components/form-item/form-item-types';
import { useNamespace } from '@devui/shared/utils';
import { InputClearIcon } from '../../svg-icons';
import { useInputRender } from './composables/use-input-render';
import { useInputEvent } from './composables/use-input-event';
import { useInputFunction } from './composables/use-input-function';
import './input.scss';
import { createI18nTranslate } from '../../locale/create';

export default defineComponent({
  name: 'DInput',
  directives: {
    dAutoFocus: AutoFocus,
  },
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'input', 'change', 'keydown', 'clear'],
  setup(props: InputProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DInput', app);

    const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
    const { modelValue, placeholder, title, autofocus } = toRefs(props);
    const ns = useNamespace('input');
    const slotNs = useNamespace('input-slot');
    const { inputDisabled, inputSize, isFocus, wrapClasses, inputClasses, customStyle, otherAttrs } = useInputRender(props, ctx);

    const input = shallowRef<HTMLInputElement>();
    const { select, focus, blur } = useInputFunction(input);

    const { onFocus, onBlur, onInput, onChange, onKeydown, onClear, onCompositionStart, onCompositionUpdate, onCompositionEnd } =
      useInputEvent(isFocus, props, ctx, focus);

    const passwordVisible = ref(false);
    const clickPasswordIcon = () => {
      passwordVisible.value = !passwordVisible.value;
      blur();
    };

    const prefixVisible = ctx.slots.prefix || props.prefix;
    const suffixVisible = ctx.slots.suffix || props.suffix || props.showPassword || props.clearable;

    const showPwdVisible = computed(() => props.showPassword && !inputDisabled.value);
    const showClearable = computed(() => {
      return props.clearable && !inputDisabled.value && modelValue.value?.length > 0;
    });

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
          {prefixVisible && (
            <span class={slotNs.e('prefix')}>
              {ctx.slots.prefix && ctx.slots.prefix?.()}
              {props.prefix && <Icon size={inputSize.value} name={props.prefix} />}
            </span>
          )}
          <input
            ref={input}
            v-dAutoFocus={autofocus.value}
            value={modelValue.value}
            disabled={inputDisabled.value}
            class={ns.e('inner')}
            placeholder={placeholder.value ?? t('placeholder')}
            {...otherAttrs}
            title={title.value}
            type={props.showPassword ? (passwordVisible.value ? 'text' : 'password') : 'text'}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            onKeydown={onKeydown}
            onCompositionstart={onCompositionStart}
            onCompositionupdate={onCompositionUpdate}
            onCompositionend={onCompositionEnd}
          />
          {suffixVisible && (
            <span class={slotNs.e('suffix')}>
              {props.suffix && <Icon size={inputSize.value} name={props.suffix} />}
              {ctx.slots.suffix && ctx.slots.suffix?.()}
              {showPwdVisible.value && (
                <Icon
                  size={inputSize.value}
                  class={ns.em('password', 'icon')}
                  name={passwordVisible.value ? 'preview' : 'preview-forbidden'}
                  onClick={clickPasswordIcon}
                />
              )}
              {showClearable.value && <InputClearIcon class={ns.em('clear', 'icon')} onClick={onClear} />}
            </span>
          )}
        </div>
        {ctx.slots.append && <div class={slotNs.e('append')}>{ctx.slots.append?.()}</div>}
      </div>
    );
  },
});
