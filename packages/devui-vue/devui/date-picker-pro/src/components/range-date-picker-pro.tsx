import { defineComponent, Transition, ref, renderSlot, useSlots } from 'vue';
import type { SetupContext } from 'vue';
import { rangeDatePickerProProps, RangeDatePickerProProps } from '../range-date-picker-types';
import { FlexibleOverlay } from '../../../overlay';
import DatePickerProPanel from './date-picker-panel';
import { Input } from '../../../input';
import { Icon } from '../../../icon';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useRangePickerPro from '../composables/use-range-date-picker-pro';

import '../date-picker-pro.scss';

export default defineComponent({
  name: 'DRangeDatePickerPro',
  props: rangeDatePickerProProps,
  emits: ['update:modelValue', 'toggleChange', 'confirmEvent', 'focus', 'blur'],
  setup(props: RangeDatePickerProProps, ctx: SetupContext) {
    const ns = useNamespace('range-date-picker-pro');
    const {
      containerRef,
      originRef,
      startInputRef,
      endInputRef,
      overlayRef,
      placeholder,
      isPanelShow,
      format,
      dateValue,
      displayDateValue,
      isMouseEnter,
      showCloseIcon,
      onFocus,
      focusHandler,
      focusType,
      pickerDisabled,
      pickerSize,
      isValidateError,
      onSelectedDate,
      handlerClearTime,
      onChangeRangeFocusType,
    } = useRangePickerPro(props, ctx);
    const position = ref(['bottom-start']);

    return () => {
      const vSlots = {
        rightArea: ctx.slots?.rightArea && (() => renderSlot(useSlots(), 'rightArea')),
        footer: ctx.slots?.footer && (() => renderSlot(useSlots(), 'footer')),
      };

      return (
        <div
          class={[ns.b(), props.showTime ? ns.e('range-time-width') : ns.e('range-width'), isPanelShow.value && ns.m('open')]}
          ref={containerRef}>
          <div
            class={[ns.e('range-picker'), pickerDisabled.value && ns.m('disabled'), isValidateError.value && ns.m('error')]}
            ref={originRef}
            onmouseover={() => (isMouseEnter.value = true)}
            onmouseout={() => (isMouseEnter.value = false)}>
            <span
              class={[
                isPanelShow.value && focusType.value === 'start' ? ns.e('active-input') : ns.e('normal-input'),
                ns.e('input'),
                ns.e('start'),
              ]}>
              <Input
                ref={startInputRef}
                modelValue={displayDateValue.value[0]}
                placeholder={placeholder.value[0]}
                onFocus={(e: MouseEvent) => {
                  e.stopPropagation();
                  onFocus('start');
                  focusHandler(e);
                }}
                size={pickerSize.value}
                disabled={pickerDisabled.value}
                prefix="calendar"
              />
            </span>

            <span class={ns.e('separator')}>{props.separator}</span>
            <span
              class={[
                isPanelShow.value && focusType.value === 'end' ? ns.e('active-input') : ns.e('normal-input'),
                ns.e('input'),
                ns.e('end'),
              ]}>
              <Input
                ref={endInputRef}
                modelValue={displayDateValue.value[1]}
                placeholder={placeholder.value[1]}
                onFocus={(e: MouseEvent) => {
                  e.stopPropagation();
                  onFocus('end');
                  focusHandler(e);
                }}
                size={pickerSize.value}
                disabled={pickerDisabled.value}
                v-slots={{
                  suffix: () => (
                    <Icon
                      class={showCloseIcon.value ? ns.m('icon-visible') : ns.m('icon-hidden')}
                      name="error-o"
                      onClick={handlerClearTime}
                      style="font-size: inherit;"></Icon>
                  ),
                }}
              />
            </span>
          </div>
          <Transition name="fade">
            <FlexibleOverlay v-model={isPanelShow.value} ref={overlayRef} origin={originRef.value} align="start" position={position.value}>
              <DatePickerProPanel
                {...props}
                dateValue={dateValue.value}
                visible={isPanelShow.value}
                format={format.value}
                isRangeType={true}
                focusType={focusType.value}
                onSelectedDate={onSelectedDate}
                onChangeRangeFocusType={onChangeRangeFocusType}
                v-slots={vSlots}></DatePickerProPanel>
            </FlexibleOverlay>
          </Transition>
        </div>
      );
    };
  },
});
