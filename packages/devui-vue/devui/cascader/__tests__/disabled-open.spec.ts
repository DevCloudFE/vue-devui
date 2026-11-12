import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import DCascader from '../src/cascader';

it('ignores an option click after the open cascader is disabled', async () => {
  const wrapper = mount(DCascader, {
    attachTo: document.body,
    props: {
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Orange', value: 'orange' },
      ],
      modelValue: ['apple'],
    },
  });
  try {
    await wrapper.get('input').trigger('click');
    await nextTick();
    const option = Array.from(
      document.querySelectorAll<HTMLElement>('.cascader-li__wraper')
    ).find((item) => item.textContent?.trim() === 'Orange');
    expect(option).toBeDefined();
    const count = wrapper.emitted('update:modelValue')?.length;

    await wrapper.setProps({ disabled: true });
    option?.click();
    await nextTick();
    expect(wrapper.emitted('update:modelValue')?.length).toBe(count);
  } finally {
    wrapper.unmount();
  }
});
