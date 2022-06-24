import { defineComponent, ref, onMounted, watch, SetupContext, Transition } from 'vue';
import { TimePickerProps, timePickerProps } from './time-picker-types';
import { Icon } from '../../icon';
import useTimePicker from './composables/use-time-picker';
import TimePopup from './components/time-popup/index';
import DInput from '../../input/src/input';
import { FlexibleOverlay } from '../../overlay';
import { useNamespace } from '../../shared/hooks/use-namespace';

import './time-picker.scss';

export default defineComponent({
  name: 'DTimePicker',
  components: { TimePopup, DInput },
  props: timePickerProps,
  emits: ['change', 'update:modelValue'],
  setup(props: TimePickerProps, ctx: SetupContext) {
    const ns = useNamespace('time-picker');
    const activeHour = ref('00');
    const activeMinute = ref('00');
    const activeSecond = ref('00');
    const format = props.format.toLowerCase();

    const {
      showPopup,
      trueTimeValue,
      devuiTimePicker,
      inputDom,
      overlayRef,
      showClearIcon,
      firsthandActiveTime,
      chooseTime,
      clickVerifyFun,
      isOutOpen,
      clearAll,
      timePopupDom,
      vModeValue,
      changeTimeData,
    } = useTimePicker(activeHour, activeMinute, activeSecond, format, props);

    const selectedTimeChange = () => {
      showPopup.value = false;
      ctx.emit('change', trueTimeValue.value);
    };
    onMounted(() => {
      isOutOpen();
    });

    watch(trueTimeValue, (newValue: string) => {
      ctx.emit('update:modelValue', trueTimeValue.value);
      if (newValue !== props.minTime && newValue !== '00:00') {
        showClearIcon.value = true;
      } else {
        showClearIcon.value = false;
      }
    });

    ctx.expose({
      clearAll,
      chooseTime,
    });

    return () => {
      return (
        <div class={ns.b()} ref={devuiTimePicker}>
          <div ref={inputDom}>
            <DInput
              modelValue={vModeValue.value}
              placeholder={props.placeholder}
              disabled={props.disabled}
              readonly={props.readonly}
              size={props.size}
              onFocus={clickVerifyFun}
              v-slots={{
                suffix: () => (
                  <span class="time-input-icon">
                    <span onClick={clearAll} class="clear-button">
                      {showClearIcon.value ? <Icon size="small" name="close" /> : ''}
                    </span>
                    <Icon size="small" name="time" />
                  </span>
                ),
              }}></DInput>
          </div>
          <Transition name="fade">
            <FlexibleOverlay v-model={showPopup.value} ref={overlayRef} origin={inputDom.value}>
              <TimePopup
                ref={timePopupDom}
                showPopup={showPopup.value}
                popupWidth={props.timePickerWidth}
                popupFormat={props.format.toLowerCase()}
                minTime={props.minTime}
                maxTime={props.maxTime}
                bindData={firsthandActiveTime.value}
                onSubmitData={selectedTimeChange}
                onChange={changeTimeData}>
                {ctx.slots.customViewTemplate?.()}
              </TimePopup>
            </FlexibleOverlay>
          </Transition>
        </div>
      );
    };
  },
});
