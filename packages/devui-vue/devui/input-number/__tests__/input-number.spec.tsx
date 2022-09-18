import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DInputNumber from '../src/input-number';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('input-number', true);
const noDotNs = useNamespace('input-number');

describe('d-input-number', () => {
  it('visible', () => {
    const num = ref(0);
    const wrapper = mount({
      setup() {
        return () => <DInputNumber v-model={num.value}></DInputNumber>;
      },
    });

    const inputNumber = wrapper.find(ns.b());
    expect(inputNumber.exists()).toBeTruthy();
    const inputInner = wrapper.find(ns.e('input-box'));
    expect((inputInner.element as HTMLInputElement).value).toBe('0');
    const controlButtons = wrapper.findAll('.control-button');
    expect(controlButtons.length).toBe(2);
    wrapper.unmount();
  });

  it('disabled', () => {
    const num = ref(0);
    const wrapper = mount({
      setup() {
        return () => <DInputNumber v-model={num.value} disabled></DInputNumber>;
      },
    });

    const controlButton = wrapper.find(ns.e('control-buttons'));
    expect(controlButton.classes()).toContain('disabled');
    const inputBox = wrapper.find(ns.e('input-box'));
    expect(inputBox.classes()).toContain('disabled');
    wrapper.unmount();
  });

  it('max min', async () => {
    const num = ref(0);
    const wrapper = mount({
      setup() {
        return () => <DInputNumber v-model={num.value} min={1} max={2}></DInputNumber>;
      },
    });

    const inputInner = wrapper.find(ns.e('input-box'));
    expect((inputInner.element as HTMLInputElement).value).toBe('1');

    const decIcon = wrapper.find('.control-dec');
    expect(decIcon.classes()).toContain('disabled');

    const incIcon = wrapper.find('.control-inc');
    await incIcon.trigger('click');
    expect((inputInner.element as HTMLInputElement).value).toBe('2');
    expect(wrapper.find('.control-inc').classes()).toContain('disabled');
    wrapper.unmount();
  });

  it('step', async () => {
    const num = ref(0);
    const wrapper = mount({
      setup() {
        return () => <DInputNumber v-model={num.value} step={3}></DInputNumber>;
      },
    });

    const inputInner = wrapper.find(ns.e('input-box'));
    expect((inputInner.element as HTMLInputElement).value).toBe('0');

    const incIcon = wrapper.find('.control-inc');
    await incIcon.trigger('click');
    expect((inputInner.element as HTMLInputElement).value).toBe('3');

    const decIcon = wrapper.find('.control-dec');
    await decIcon.trigger('click');
    expect((inputInner.element as HTMLInputElement).value).toBe('0');
    wrapper.unmount();
  });

  it('precision', async () => {
    const num = ref(1);
    const wrapper = mount({
      setup() {
        return () => <DInputNumber v-model={num.value} step={0.1} precision={2}></DInputNumber>;
      },
    });

    const inputInner = wrapper.find(ns.e('input-box'));
    expect((inputInner.element as HTMLInputElement).value).toBe('1.00');

    const incIcon = wrapper.find('.control-inc');
    await incIcon.trigger('click');
    expect((inputInner.element as HTMLInputElement).value).toBe('1.10');

    const decIcon = wrapper.find('.control-dec');
    await decIcon.trigger('click');
    await decIcon.trigger('click');
    expect((inputInner.element as HTMLInputElement).value).toBe('0.90');
    wrapper.unmount();
  });

  it('size', async () => {
    const num = ref(1);
    const wrapper = mount({
      setup() {
        return () => <DInputNumber v-model={num.value} size="lg"></DInputNumber>;
      },
    });

    const controlButtons = wrapper.find(ns.b());
    expect(controlButtons.classes()).toContain(noDotNs.m('lg'));

    wrapper.unmount();
  });

  it('regular expression check', async () => {
    const num = ref(2);
    const wrapper = mount({
      setup() {
        // 1到50
        const regStr = '^([1-9]|[1-4][0-9]|50)$';
        return () => <DInputNumber v-model={num.value} reg={regStr}></DInputNumber>;
      },
    });

    const inputInner = wrapper.find(ns.e('input-box'));
    expect((inputInner.element as HTMLInputElement).value).toBe('2');

    num.value = 51;
    expect((inputInner.element as HTMLInputElement).value).toBe('2');

    num.value = 10;
    await nextTick();
    expect((inputInner.element as HTMLInputElement).value).toBe('10');

    // 0 不符合要求返回上次结果 10
    num.value = 0;
    expect((inputInner.element as HTMLInputElement).value).toBe('10');

    wrapper.unmount();
  });

  it('placeholder work', async () => {
    const num = ref();
    const placeholderStr = '测试placeholderStr';
    const wrapper = mount({
      setup() {
        return () => <DInputNumber v-model={num.value} placeholder={placeholderStr}></DInputNumber>;
      },
    });
    const inputNumber = wrapper.find(ns.b());
    expect(inputNumber.exists()).toBeTruthy();
    const inputInner = wrapper.find(ns.e('input-box'));
    expect((inputInner.element as HTMLInputElement).placeholder).toBe(placeholderStr);

    wrapper.unmount();
  });

  it.todo('event change/focus/blur/input work well.');

  it.todo('method focus/blur/select work well.');
});
