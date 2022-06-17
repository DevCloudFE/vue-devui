import { mount } from '@vue/test-utils';
import DDatePickerPro from '../src/date-picker-pro';
import { nextTick, ref } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('date-picker-pro', true);
const baseClass = ns.b();
const pickerPanelClass = ns.e('panel');

const noDotNs = useNamespace('date-picker-pro', false);
const noDotBaseClass = noDotNs.b();

describe('time-picker test', () => {
  it('date-picker-pro init render', async () => {
    const datePickerProValue = ref('');
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value}></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    expect(input.attributes('placeholder')).toBe('请选择日期');
    input.trigger('focus');
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();
    wrapper.unmount();
  });
});
