import { defineComponent, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import DTimeList from '../../../time-picker/src/components/popup-line';
import useTimePickerPanel from '../composables/use-time-picker-panel';
import { TimerPickerPanelProps, timerPickerPanelProps } from '../date-picker-pro-types';
import { createI18nTranslate } from '../../../locale/create';

export default defineComponent({
  name: 'TimerPickerPanel',
  props: timerPickerPanelProps,
  emits: ['selectedTime'],
  setup(props: TimerPickerPanelProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DDatePickerPro', app);

    const ns = useNamespace('date-picker-pro');
    const { timeListDom, hourList, minuteList, secondList, handlerTimeSelected } = useTimePickerPanel(props, ctx);

    return () => {
      return (
        <div class={ns.e('panel-time')}>
          <div class={ns.em('panel-time', 'title')}>
            {t('getTimeArr')().map((child: string) => (
              <span class={ns.em('panel-time', 'title-item')}> {child}</span>
            ))}
          </div>
          <div class={ns.em('panel-time', 'content')}>
            <DTimeList
              ref={timeListDom}
              hourList={hourList}
              minuteList={minuteList}
              secondList={secondList}
              itemHeight={30}
              onChange={handlerTimeSelected}
            />
          </div>
        </div>
      );
    };
  },
});
