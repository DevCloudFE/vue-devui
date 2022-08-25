import { defineComponent, ref, watch, onMounted, getCurrentInstance, withModifiers } from 'vue';
import type { SetupContext } from 'vue';
import { initializeTimeData, setTimeAstrict } from '../../utils';
import PopupLine from '../popup-line/index';
import { Button } from '../../../../button/index';
import { popupTimeObj } from '../../types';
import { timePopupProps, TimePopupProps } from './time-popup-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { createI18nTranslate } from '../../../../locale/create';
import './index.scss';

export default defineComponent({
  name: 'DTimePopup',
  props: timePopupProps,
  emits: ['submitData', 'change'],
  setup(props: TimePopupProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTimePopup', app);

    const ns = useNamespace('time-popup');
    const popupDome = ref<Node>();
    const timeListDom = ref();
    const hourList = initializeTimeData('hour');
    const minuteList = initializeTimeData('minute');
    const secondList = initializeTimeData('second');
    onMounted(() => {
      setTimeAstrict(hourList, minuteList, secondList, props.minTime, props.maxTime, props.popupFormat);
      timeListDom.value.setOuterTime(props.bindData);
    });

    watch(
      () => [props.showPopup, props.bindData],
      ([showPopup, newTimeVal], [, oldTimeVal]) => {
        if (showPopup || newTimeVal !== oldTimeVal) {
          timeListDom.value.setOuterTime(newTimeVal);
        } else {
          timeListDom.value.resetScrollTop();
        }
      }
    );

    const changTimeData = () => {
      return timeListDom.value.getNewTime();
    };
    const changeData = (value: popupTimeObj) => {
      ctx.emit('change', value);
    };

    const subDataFun = () => {
      ctx.emit('submitData');
    };

    ctx.expose({
      changTimeData,
    });

    return () => (
      <div ref={popupDome} class={ns.b()} style={{ width: props.popupWidth + 'px' }}>
        <PopupLine
          ref={timeListDom}
          hourList={hourList}
          minuteList={minuteList}
          secondList={secondList}
          minTime={props.minTime}
          maxTime={props.maxTime}
          format={props.popupFormat}
          onChange={changeData}
        />
        <div class={ns.m('btn')}>
          <div class="popup-slots">{ctx.slots.default?.()}</div>
          <div onClick={withModifiers(subDataFun, ['stop'])}>
            <Button variant="solid" color="secondary" size="sm">
              {t('ok')}
            </Button>
          </div>
        </div>
      </div>
    );
  },
});
