import { defineComponent, Transition, ref } from 'vue';
import type { SetupContext } from 'vue';
import { datePickerProProps, DatePickerProProps } from './date-picker-pro-types';
import usePickerPro from './use-picker-pro';
import { Input } from '../../input';
import { FlexibleOverlay } from '../../overlay';
import DatePickerProPanel from './components/date-picker-panel';
import { useNamespace } from '../../shared/hooks/use-namespace';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear.js';
import dayOfYear from 'dayjs/plugin/dayOfYear.js';

import './date-picker-pro.scss';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(dayOfYear);

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
      dateValue,
      displayDateValue,
      onFocus,
      onSelectedDate,
    } = usePickerPro(props, ctx);
    const position = ref(['bottom-start']);
    return () => {
      return (
        <div class={ns.b()} ref={containerRef}>
          <div class={ns.e('single-picker')} ref={originRef}>
            <Input ref={inputRef} modelValue={displayDateValue.value} placeholder={placeholder.value} onFocus={onFocus} prefix="calendar" />
          </div>
          <Transition name="fade">
            <FlexibleOverlay
              v-model={isPanelShow.value}
              v-show={isPanelShow.value}
              ref={overlayRef}
              origin={originRef.value}
              position={position.value}>
              <DatePickerProPanel
                dateValue={dateValue.value}
                visible={isPanelShow.value}
                format={props.format}
                showTime={props.showTime}
                onSelectedDate={onSelectedDate}></DatePickerProPanel>
            </FlexibleOverlay>
          </Transition>
        </div>
      );
    };
  },
});
