import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DInputNumber from '../src/input-number';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('input-number', true);

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
    const inputInner = document.body.querySelector(ns.e('input-wrap'));
    console.log(ns.e('input-box'));
    console.log(inputInner);
    expect(inputInner?.value).toBe('0');
  });
});
