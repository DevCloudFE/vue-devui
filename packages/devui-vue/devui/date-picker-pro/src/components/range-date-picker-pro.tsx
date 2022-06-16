import { defineComponent, Transition, ref } from 'vue';
import type { SetupContext } from 'vue';
import { rangeDatePickerProProps, RangeDatePickerProProps } from '../range-date-picker-types';
import { FlexibleOverlay } from '../../../overlay';
import DatePickerProPanel from './date-picker-panel';
import { Input } from '../../../input';
import { Icon } from '../../../icon';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useRangePickerPro from '../composables/use-range-date-picker-pro';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear.js';
import dayOfYear from 'dayjs/plugin/dayOfYear.js';

import '../date-picker-pro.scss';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(dayOfYear);

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
      return (
        <div class={[ns.b(), props.showTime ? ns.e('range-time-width') : ns.e('range-width')]} ref={containerRef}>
          <div
            class={ns.e('ranger-picker')}
            ref={originRef}
            onmouseover={() => (isMouseEnter.value = true)}
            onmouseout={() => (isMouseEnter.value = false)}>
            <span class={isPanelShow.value && focusType.value === 'start' ? ns.e('active-input') : ns.e('normal-input')}>
              <Input
                ref={startInputRef}
                modelValue={displayDateValue.value[0]}
                placeholder={placeholder.value[0]}
                onFocus={(e: MouseEvent) => {
                  e.stopPropagation();
                  onFocus('start');
                }}
                prefix="calendar"
              />
            </span>

            <span class={ns.e('separator')}>{props.separator}</span>
            <span class={isPanelShow.value && focusType.value === 'end' ? ns.e('active-input') : ns.e('normal-input')}>
              <Input
                ref={endInputRef}
                modelValue={displayDateValue.value[1]}
                placeholder={placeholder.value[1]}
                onFocus={(e: MouseEvent) => {
                  e.stopPropagation();
                  onFocus('end');
                }}
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
            <FlexibleOverlay v-model={isPanelShow.value} ref={overlayRef} origin={originRef.value} position={position.value}>
              <DatePickerProPanel
                dateValue={dateValue.value}
                visible={isPanelShow.value}
                format={props.format}
                showTime={props.showTime}
                isRangeType={true}
                focusType={focusType.value}
                onSelectedDate={onSelectedDate}
                onChangeRangeFocusType={onChangeRangeFocusType}></DatePickerProPanel>
            </FlexibleOverlay>
          </Transition>
        </div>
      );
    };
  },
});
