import { defineComponent, Transition, ref, renderSlot, useSlots, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import { datePickerProProps, DatePickerProProps } from './date-picker-pro-types';
import usePickerPro from './use-picker-pro';
import { Input } from '../../input';
import { FlexibleOverlay } from '../../overlay';
import DatePickerProPanel from './components/date-picker-panel';
import { IconCalendar } from './components/icon-calendar';
import { IconClose } from './components/icon-close';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './date-picker-pro.scss';
import { createI18nTranslate } from '../../locale/create';

export default defineComponent({
  name: 'DDatePickerPro',
  props: datePickerProProps,
  emits: ['update:modelValue', 'toggleChange', 'confirmEvent', 'focus', 'blur'],
  setup(props: DatePickerProProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DDatePickerPro', app);

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
      pickerDisabled,
      pickerSize,
      isValidateError,
      onFocus,
      onSelectedDate,
      handlerClearTime,
    } = usePickerPro(props, ctx, t);
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
              placeholder={placeholder.value || t('placeholder')}
              onFocus={onFocus}
              size={pickerSize.value}
              disabled={pickerDisabled.value}
              error={isValidateError.value}
              v-slots={{
                prefix: () => (
                  <span class={ns.e('single-picker-icon')}>
                    <IconCalendar></IconCalendar>
                  </span>
                ),
                suffix: () => (
                  <span class={['close-icon', showCloseIcon.value ? ns.m('icon-visible') : ns.m('icon-hidden')]} onClick={handlerClearTime}>
                    <IconClose></IconClose>
                  </span>
                ),
              }}
            />
          </div>
          <Transition name="fade">
            <FlexibleOverlay v-model={isPanelShow.value} ref={overlayRef} origin={originRef.value} align="start" position={position.value}>
              <DatePickerProPanel
                {...props}
                dateValue={dateValue.value}
                visible={isPanelShow.value}
                format={format.value}
                onSelectedDate={onSelectedDate}
                v-slots={vSlots}></DatePickerProPanel>
            </FlexibleOverlay>
          </Transition>
        </div>
      );
    };
  },
});
