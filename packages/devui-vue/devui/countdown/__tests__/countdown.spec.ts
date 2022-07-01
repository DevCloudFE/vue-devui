import { mount } from '@vue/test-utils';
import { Countdown } from '../index';
import { nextTick } from 'vue';

type IValueStyle = { color: string; 'font-size': string };

describe('countdown test', () => {
  it('countdown default render', async () => {
    // todo
    const wrapper = mount(Countdown, {
      props: {
        value: +new Date()
      }
    });
    expect(wrapper.get('.countdown-content'));

  });

  it('countdown text', () => {
    // todo
    const time = Date.now() + 11 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 40 * 60 * 1000 + 40 * 1000;
    [
      ['YY-MM-DD HH:mm:ss', '00-00-11 08:40:40'],
      ['HH:mm:ss', '272:40:40'],
      ['YY-MM-DD mm:ss', '00-00-11 520:40'],
    ].forEach(async ([format, value]) => {
      const wrapper = await mount(Countdown, {
        props: {
          format,
          value: time,
        }
      });
      expect(wrapper.find('.countdown-value').text()).toEqual(value);
    });

  });

  it('countdown millisecond', async () => {
    const time = Date.now() + 11 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 40 * 60 * 1000 + 40 * 1000 + 5;
    const wrapper = await mount(Countdown, {
      props: {
        format: 'HHH:mm:ss SSS',
        value: time,
      }
    });
    await nextTick();
    expect(Math.abs(time - Date.now() - (wrapper.emitted('onChange')?.[0] as {leftTime: number}[])?.[0].leftTime) < 16).toEqual(true);
  });

  it('countdown prefix and suffix', async () => {
    const time = Date.now() + 5000;
    const prefix = '前缀-';
    const suffix = '前缀-';
    const wrapper = mount(Countdown, {
      props: {
        format: 'HHH:mm:ss SSS',
        value: time,
        prefix,
        suffix
      }
    });
    expect(wrapper.find('.countdown-prefix').text()).toEqual(prefix);
    expect(wrapper.find('.countdown-suffix').text()).toEqual(suffix);
  });

  it('countdown valueStyle', async () => {
    const time = Date.now() + 5000;
    const valueStyle: IValueStyle = {'color': 'rgb(94, 124, 224)', 'font-size': '20px'};
    const wrapper = await mount(Countdown, {
      props: {
        format: 'HHH:mm:ss SSS',
        value: time,
        valueStyle
      }
    });
    const { style } = wrapper.find('.countdown-content').attributes();
    let styleStr = '';
    for (const k in valueStyle) {
      styleStr += `${k}: ${valueStyle[k as keyof IValueStyle]}; `;
    }
    expect(style).toEqual(styleStr.slice(0,-1));
  });

  it('countdown slot', async () => {
    const time = Date.now() + 5000;
    const wrapper = await mount(Countdown, {
      props: {
        value: time
      },
      slots: {
        default: 'test slot'
      }
    });
    expect(wrapper.find('.devui-countdown').text()).toEqual('test slot');
  });
});
