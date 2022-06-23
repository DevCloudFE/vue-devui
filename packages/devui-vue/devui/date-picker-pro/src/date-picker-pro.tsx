import { defineComponent, Transition, ref, renderSlot, useSlots } from 'vue';
import type { SetupContext } from 'vue';
import { datePickerProProps, DatePickerProProps } from './date-picker-pro-types';
import usePickerPro from './use-picker-pro';
import { Input } from '../../input';
import { FlexibleOverlay } from '../../overlay';
import DatePickerProPanel from './components/date-picker-panel';
import { Icon } from '../../icon';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './date-picker-pro.scss';

export default defineComponent({
  name: 'DDatePickerPro',
  props: datePickerProProps,
  emits: ['update:modelValue', 'toggleChange', 'confirmEvent'],
  setup(props: DatePickerProProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');
    const {
      containerRef,
      originRef,
      inputRef,
      overlayRef,
      placeholder,
      isPanelShow,
      format,
      dateValue,
      displayDateValue,
      isMouseEnter,
      showCloseIcon,
      onFocus,
      onSelectedDate,
      handlerClearTime,
    } = usePickerPro(props, ctx);
    const position = ref(['bottom-start']);
    return () => {
      const vSlots = {
        rightArea: ctx.slots?.rightArea && (() => renderSlot(useSlots(), 'rightArea')),
        footer: ctx.slots?.footer && (() => renderSlot(useSlots(), 'footer')),
      };
      return (
        <div class={ns.b()} ref={containerRef}>
          <div
            class={ns.e('single-picker')}
            ref={originRef}
            onmouseover={() => (isMouseEnter.value = true)}
            onmouseout={() => (isMouseEnter.value = false)}>
            <Input
              ref={inputRef}
              modelValue={displayDateValue.value}
              placeholder={placeholder.value}
              onFocus={onFocus}
              prefix="calendar"
              size={props.size}
              v-slots={{
                suffix: () => (
                  <Icon
                    class={showCloseIcon.value ? ns.m('icon-visible') : ns.m('icon-hidden')}
                    name="error-o"
                    onClick={handlerClearTime}></Icon>
                ),
              }}
            />
          </div>
          <Transition name="fade">
            <FlexibleOverlay v-model={isPanelShow.value} ref={overlayRef} origin={originRef.value} align="start" position={position.value}>
              <DatePickerProPanel
                dateValue={dateValue.value}
                visible={isPanelShow.value}
                format={format.value}
                showTime={props.showTime}
                onSelectedDate={onSelectedDate}
                v-slots={vSlots}></DatePickerProPanel>
            </FlexibleOverlay>
          </Transition>
        </div>
      );
    };
  },
});
