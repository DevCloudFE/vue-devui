import { defineComponent, Transition, ref } from 'vue';
import type { SetupContext } from 'vue';
import { datePickerProProps, DatePickerProProps } from './date-picker-pro-types';
import usePickerPro from './use-picker-pro';
import { Input } from '../../input';
import { FlexibleOverlay } from '../../overlay';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './date-picker-pro.scss';

export default defineComponent({
  name: 'DDatePickerPro',
  props: datePickerProProps,
  emits: ['update:modelValue', 'toggle-change'],
  setup(props: DatePickerProProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');
    const { containerRef, originRef, inputRef, overlayRef, state, onFocus } = usePickerPro(props, ctx);
    const position = ref(['bottom']);
    return () => {
      return (
        <div class={ns.b()} ref={containerRef}>
          <div class={ns.e('single-picker')} ref={originRef}>
            <Input ref={inputRef} modelValue={state.value} placeholder={state.placeholder} onFocus={onFocus} prefix="calendar" />
          </div>
          <Transition name="fade">
            <FlexibleOverlay v-model={state.show} v-show={state.show} ref={overlayRef} origin={originRef.value} position={position.value}>
              <div class={ns.e('panel')}>日历选择</div>
            </FlexibleOverlay>
          </Transition>
        </div>
      );
    };
  },
});
