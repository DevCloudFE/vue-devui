import { defineComponent, ref, onMounted, watch, SetupContext, Transition, Teleport, computed } from 'vue';
import { TimePickerProps, timePickerProps } from './time-picker-types';
import { Icon } from '../../icon';
import useTimePicker from './composables/use-time-picker';
import TimePopup from './components/time-popup/index';
import DInput from '../../input/src/input';
import { FlexibleOverlay, Placement } from '../../overlay';
import { useNamespace } from '@devui/shared/utils';

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
    const position = ref(['bottom-start', 'top-start']);
    const currentPosition = ref('bottom');
    const handlePositionChange = (pos: string) => {
      currentPosition.value = pos.split('-')[0] === 'top' ? 'top' : 'bottom';
    };
    const styles = computed(() => ({
      transformOrigin: currentPosition.value === 'top' ? '0% 100%' : '0% 0%',
      'z-index': 'var(--devui-z-index-dropdown, 1052)',
    }));

    const {
      showPopup,
      trueTimeValue,
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
    onMounted(isOutOpen);

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
        <div class={ns.b()}>
          <DInput
            modelValue={vModeValue.value}
            ref={inputDom}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readonly={props.readonly}
            show-glow-style={props.showGlowStyle}
            size={props.size}
            onFocus={clickVerifyFun}
            v-slots={{
              suffix: () => (
                <span class="time-input-icon" onClick={clickVerifyFun}>
                  <span onClick={clearAll} class="clear-button">
                    {showClearIcon.value ? <Icon size="small" name="close" /> : ''}
                  </span>
                  <Icon size="small" name="time" />
                </span>
              ),
            }}></DInput>
          <Teleport to="body">
            <Transition name={ns.m(`fade-${currentPosition.value}`)}>
              <FlexibleOverlay
                v-model={showPopup.value}
                ref={overlayRef}
                origin={inputDom.value?.$el}
                position={position.value as Placement[]}
                align="start"
                style={styles.value}
                onPositionChange={handlePositionChange}>
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
          </Teleport>
        </div>
      );
    };
  },
});
