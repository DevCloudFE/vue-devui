import { mount } from '@vue/test-utils';
import DTimePicker from '../src/time-picker';
import { nextTick, ref } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Form as DForm, FormItem as DFormItem } from '../../form';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('time-picker', true);
const baseClass = ns.b();

const noDotNs = useNamespace('time-picker', false);
const noDotBaseClass = noDotNs.b();

const dotInputNs = useNamespace('input', true);
const inputNs = useNamespace('input');

const inputClass = dotInputNs.b();
const inputInnerClass = dotInputNs.e('inner');
const inputDisabledClass = dotInputNs.m('disabled');
const inputSizeSmClass = inputNs.m('sm');
const inputSizeLgClass = inputNs.m('lg');

const timePopupNs = useNamespace('time-popup', true);

describe('time-picker test', () => {
  it('time-picker init render', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker></d-time-picker>`,

      setup() {
        return;
      },
    });

    const container = wrapper.find(baseClass);
    const input = wrapper.find(inputInnerClass);
    await input.trigger('focus');
    const timeUl = document.querySelectorAll('.time-ul');
    expect(timeUl[0].childElementCount).toBe(24);
    expect(timeUl[1].childElementCount).toBe(60);
    expect(timeUl[2].childElementCount).toBe(60);
    expect(container.classes()).toContain(noDotBaseClass);

    wrapper.unmount();
  });

  it('time-picker disabled work', async () => {
    const wrapper = mount(DTimePicker, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.find(inputDisabledClass)).toBeTruthy();
    wrapper.unmount();
  });

  it('time-picker default open work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" :time-picker-width="300" autoOpen></d-time-picker>`,
      setup() {
        const vModelValue = ref('12:30:40');
        return {
          vModelValue,
        };
      },
    });

    await nextTick();
    const timeInput = wrapper.find<HTMLInputElement>(inputInnerClass);
    const timePopup = document.querySelector(timePopupNs.b());

    await nextTick();
    expect(timeInput.element.value).toBe('12:30:40');
    expect(timePopup).toBeTruthy();
    expect(timePopup?.style.width).toBe('300px');

    wrapper.unmount();
  });

  it('time-picker min-time work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker min-time='01:04:30' v-model="vModelValue"></d-time-picker>`,
      setup() {
        const vModelValue = ref('01:03:00');
        return {
          vModelValue,
        };
      },
    });

    const timeInput = wrapper.find<HTMLInputElement>(inputInnerClass);
    await timeInput.trigger('focus');
    await nextTick();
    // 如果 v-mode 的时间超出 限制范围，将返回最小时间值
    expect(timeInput.element.value).toBe('01:04:30');

    wrapper.unmount();
  });

  it('time-picker max-time work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker max-time='22:46:20' v-model="vModelValue"></d-time-picker>`,
      setup() {
        const vModelValue = ref('23:30:00');
        return {
          vModelValue,
        };
      },
    });

    const timeInput = wrapper.find<HTMLInputElement>(inputInnerClass);
    await timeInput.trigger('focus');
    await nextTick();
    expect(timeInput.element.value).toBe('22:46:20');

    wrapper.unmount();
  });

  it('time-picker format mm:ss work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" format='mm:ss'></d-time-picker>`,
      setup() {
        const vModelValue = ref('12:12:30');
        return {
          vModelValue,
        };
      },
    });

    const timeInput = wrapper.find<HTMLInputElement>(inputInnerClass);
    await nextTick();
    expect(timeInput.element.value).toBe('12:30');

    wrapper.unmount();
  });

  it('time-picker format hh:mm work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" format='hh:mm'></d-time-picker>`,
      setup() {
        const vModelValue = ref('23:30:20');
        return {
          vModelValue,
        };
      },
    });

    const timeInput = wrapper.find<HTMLInputElement>(inputInnerClass);
    await nextTick();
    expect(timeInput.element.value).toBe('23:30');

    wrapper.unmount();
  });

  it('time-picker slot customViewTemplate work', async () => {
    const slotDemo = ref();

    const chooseTime = () => {
      const timeObj = {
        time: '21',
        type: 'mm',
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
        time: hour + ':' + minute + ':' + second,
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
          slotDemo,
        };
      },
    });

    const timeInput = wrapper.find<HTMLInputElement>(inputInnerClass);
    await timeInput.trigger('focus');
    const slotBottomNow = document.querySelector('.slot-bottom-now');
    const slotBottomOne = document.querySelector('.slot-bottom-one');
    await slotBottomNow?.dispatchEvent(new Event('click'));
    expect(timeInput.element.value).toBe(chooseNowFun());

    await slotBottomOne?.dispatchEvent(new Event('click'));
    expect(timeInput.element.value).toMatch(/21/);

    wrapper.unmount();
  });

  it('time-picker size work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" size="lg"></d-time-picker>`,
      setup() {
        const vModelValue = ref('23:30:20');
        return {
          vModelValue,
        };
      },
    });

    const container = wrapper.find(inputClass);
    expect(container.classes()).toContain(inputSizeLgClass);

    await wrapper.setProps({
      size: 'sm',
    });
    expect(container.classes()).toContain(inputSizeSmClass);

    await wrapper.setProps({
      size: '',
    });

    expect(container.classes()).not.toContain(inputSizeSmClass);
    expect(container.classes()).not.toContain(inputSizeLgClass);

    wrapper.unmount();
  });

  it('time-select props size priority', async () => {
    const dFormSize = ref('lg');
    const dTimePickerSize = ref('sm');

    const wrapper = mount({
      components: { DTimePicker, DForm, DFormItem },
      template: `
        <DForm :size="dFormSize">
        <DFormItem>
          <d-time-picker :size="dTimePickerSize"></d-time-picker>
        </DFormItem>
        </DForm>`,
      setup() {
        return {
          dFormSize,
          dTimePickerSize,
        };
      },
    });

    const container = wrapper.find(inputClass);

    // form 与 元素同时存在size 属性，以元素为准。
    expect(container.classes()).toContain(inputSizeSmClass);

    // 元素不存在 size ，form 存在，以表单为准
    dTimePickerSize.value = '';
    await nextTick();
    expect(container.classes()).toContain(inputSizeLgClass);

    // form 与 元素都不存在 size 属性，使用默认值。
    dFormSize.value = '';
    await nextTick();
    expect(container.classes()).not.toContain(inputSizeSmClass);
    expect(container.classes()).not.toContain(inputSizeLgClass);

    wrapper.unmount();
  });

  it('time-picker readonly work', async () => {
    const wrapper = mount({
      components: { DTimePicker },
      template: `<d-time-picker v-model="vModelValue" readonly></d-time-picker>`,
      setup() {
        const vModelValue = ref('23:30:20');
        return {
          vModelValue,
        };
      },
    });

    await nextTick();
    const timeInput = wrapper.find<HTMLInputElement>(inputInnerClass);
    await timeInput.trigger('focus');
    expect(wrapper.find('.devui-time-popup').exists()).toBeFalsy();

    wrapper.unmount();
  });
});
