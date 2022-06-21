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
  emits: ['update:modelValue', 'toggleChange', 'confirmEvent'],
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
      focusType,
      onSelectedDate,
      handlerClearTime,
      onChangeRangeFocusType,
    } = useRangePickerPro(props, ctx);
    const position = ref(['bottom-start']);

    return () => {
      const vSlots = {
        shortcutOptions: ctx.slots?.shortcutOptions && (() => renderSlot(useSlots(), 'shortcutOptions')),
      };

      return (
        <div
          class={[ns.b(), props.showTime ? ns.e('range-time-width') : ns.e('range-width'), isPanelShow.value && ns.m('open')]}
          ref={containerRef}>
          <div
            class={ns.e('range-picker')}
            ref={originRef}
            onmouseover={() => (isMouseEnter.value = true)}
            onmouseout={() => (isMouseEnter.value = false)}>
            <span class={[isPanelShow.value && focusType.value === 'start' ? ns.e('active-input') : ns.e('normal-input'), ns.e('input')]}>
              <Input
                ref={startInputRef}
                modelValue={displayDateValue.value[0]}
                placeholder={placeholder.value[0]}
                onFocus={(e: MouseEvent) => {
                  e.stopPropagation();
                  onFocus('start');
                }}
                size={props.size}
                prefix="calendar"
              />
            </span>

            <span class={ns.e('separator')}>{props.separator}</span>
            <span class={[isPanelShow.value && focusType.value === 'end' ? ns.e('active-input') : ns.e('normal-input'), ns.e('input')]}>
              <Input
                ref={endInputRef}
                modelValue={displayDateValue.value[1]}
                placeholder={placeholder.value[1]}
                onFocus={(e: MouseEvent) => {
                  e.stopPropagation();
                  onFocus('end');
                }}
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
            </span>
          </div>
          <Transition name="fade">
            <FlexibleOverlay v-model={isPanelShow.value} ref={overlayRef} origin={originRef.value} align="start" position={position.value}>
              <DatePickerProPanel
                dateValue={dateValue.value}
                visible={isPanelShow.value}
                format={format.value}
                showTime={props.showTime}
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
