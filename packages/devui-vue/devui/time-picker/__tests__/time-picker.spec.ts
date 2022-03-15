import { mount } from '@vue/test-utils';
import DTimePicker from '../src/time-picker';
import { nextTick, ref } from 'vue';

describe('time-picker test', () => {
  it('time-picker init render', async () => {

    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker></d-time-picker>`,

      setup() {
        return;
      }
    });

    const container = wrapper.find('.devui-time-picker');
    const timeUl = wrapper.findAll('.time-ul');
    await nextTick();
    expect(timeUl[0].element.childElementCount).toBe(24);
    expect(timeUl[1].element.childElementCount).toBe(60);
    expect(timeUl[2].element.childElementCount).toBe(60);
    expect(container.classes()).toContain('devui-time-picker');
  });

  it('time-picker default open work', async () => {

    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" :time-picker-width="300" :autoOpen="autoOpen"></d-time-picker>`,
      setup() {

        const vModelValue = ref('12:30:40');
        const autoOpen = ref(true);

        return {
          vModelValue,
          autoOpen
        };
      }
    });

    const timeInput = wrapper.find<HTMLInputElement>('.time-input');
    const tiemPopup = wrapper.find('.devui-time-popup');

    await nextTick();
    expect(timeInput.element.value).toBe('12:30:40');
    expect(tiemPopup.classes()).toContain('devui-show-time-popup');
    expect(tiemPopup.attributes('style')).toMatch('width: 300px');

  });

  it('time-picker disabled work', async () => {
    const wrapper = mount(DTimePicker, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.find('.devui-time-picker').classes()).toContain('picker-disabled');
    expect(wrapper.find<HTMLInputElement>('.time-input').element.disabled).toBe(true);
  });

  it('time-picker min-time work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker min-time='01:04:30' v-model="vModelValue"></d-time-picker>`,
      setup() {
        const vModelValue = ref('01:03:00');
        return {
          vModelValue
        };
      }
    });

    const timeInput = wrapper.find<HTMLInputElement>('.time-input');
    await nextTick();
    // 如果 v-mode 的时间超出 限制范围，将返回最小时间值
    expect(timeInput.element.value).toBe('01:04:30');
  });

  it('time-picker max-time work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker max-time='22:46:20' v-model="vModelValue"></d-time-picker>`,
      setup() {
        const vModelValue = ref('23:30:00');
        return {
          vModelValue
        };
      }
    });

    const timeInput = wrapper.find<HTMLInputElement>('.time-input');
    await nextTick();
    expect(timeInput.element.value).toBe('22:46:20');
  });

  it('time-picker format mm:HH:ss work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" format='mm:HH:ss'></d-time-picker>`,
      setup() {
        const vModelValue = ref('23:30:00');
        return {
          vModelValue
        };
      }
    });

    const timeInput = wrapper.find<HTMLInputElement>('.time-input');
    await nextTick();
    expect(timeInput.element.value).toBe('30:23:00');
  });

  it('time-picker format mm:ss work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" format='mm:ss'></d-time-picker>`,
      setup() {
        const vModelValue = ref('23:30:00');
        return {
          vModelValue
        };
      }
    });

    const timeInput = wrapper.find<HTMLInputElement>('.time-input');
    await nextTick();
    expect(timeInput.element.value).toBe('30:00');
  });

  it('time-picker format hh:mm work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" format='hh:mm'></d-time-picker>`,
      setup() {
        const vModelValue = ref('23:30:00');
        return {
          vModelValue
        };
      }
    });

    const timeInput = wrapper.find<HTMLInputElement>('.time-input');
    await nextTick();
    expect(timeInput.element.value).toBe('23:30');
  });

  it('time-picker slot customViewTemplate work', async () => {

    const slotDemo = ref();

    const chooseTime = () => {
      const timeObj = {
        time: '21',
        type: 'mm'
      };
      slotDemo.value.chooseTime(timeObj);
    };
    // 插槽内方法  --  选择当前时间
    const chooseNowFun = () => {
      const date = new Date();
      const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
      const timeObj = {
        time: hour + ':' + minute + ':' + second
      };
      slotDemo.value.chooseTime(timeObj);

      return timeObj.time;
    };

    const wrapper = mount({
      components: { DTimePicker },
      template: `
        <d-time-picker ref='slotDemo'>
            <template v-slot:customViewTemplate>
                <div class='slot-box'>
                    <div class='slot-bottom-now' @click='chooseNowFun'>choose now</div>
                    <div class='slot-bottom-one' @click='chooseTime' >choose 23:00</div>
                </div>
            </template>
        </d-time-picker>`,
      setup() {
        return {
          chooseNowFun,
          chooseTime,
          slotDemo
        };
      }
    });

    const timeInput = wrapper.find<HTMLInputElement>('.time-input');
    const slotBottomNow = wrapper.find<HTMLElement>('.slot-bottom-now');
    const slotBottomOne = wrapper.find<HTMLElement>('.slot-bottom-one');
    await slotBottomNow.trigger('click');
    expect(timeInput.element.value).toBe(chooseNowFun());

    await slotBottomOne.trigger('click');
    expect(timeInput.element.value).toMatch(/21/);
  });
});
