import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DToggle from '../src/toggle';

describe('d-toggle', () => {
  it('toggle render work', async () => {
    const checked = ref(false);
    const wrapper = mount({
      components: { DToggle },
      template: `
        <d-toggle v-model:checked="checked"></d-toggle>
      `,
      setup () {
        return {
          checked
        };
      }
    });

    expect(wrapper.classes()).toContain('devui-toggle');
    expect(wrapper.classes()).not.toContain('devui-checked');

    checked.value = true;
    await nextTick();

    expect(wrapper.classes()).toContain('devui-checked');
  });

  it('toggle disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DToggle, {
      props: {
        disabled: true,
        onChange
      }
    });

    expect(wrapper.classes()).toContain('devui-disabled');

    await wrapper.trigger('click');
    expect(onChange).toBeCalledTimes(0);

    await wrapper.setProps({
      disabled: false
    });
    await wrapper.trigger('click');

    expect(wrapper.classes()).not.toContain('devui-disabled');
    expect(onChange).toBeCalledTimes(1);
  });

  it('toggle size work', async () => {
    const wrapper = mount(DToggle, {
      props: {
        size: 'sm'
      }
    });

    expect(wrapper.classes()).toContain('devui-toggle-sm');

    await wrapper.setProps({
      size: 'lg'
    });
    expect(wrapper.classes()).not.toContain('devui-toggle-sm');
    expect(wrapper.classes()).toContain('devui-toggle-lg');
  });

  it('toggle beforeChange work', async () => {
    const beforeChange = jest.fn(() => false);
    const onChange = jest.fn();
    const wrapper = mount(DToggle, {
      props: {
        beforeChange,
        onChange
      }
    });

    await wrapper.trigger('click');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);

    beforeChange.mockReturnValue(true);
    await wrapper.trigger('click');
    expect(beforeChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledTimes(1);
  });

  it('toggle slot work', async () => {
    const isChecked = ref(false);
    const wrapper = mount({
      components: { DToggle },
      template: `
        <d-toggle :checked="isChecked">
          <template v-slot:checkedContent>开</template>
          <template v-slot:uncheckedContent>关</template>
        </d-toggle>
      `,
      setup () {
        return {
          isChecked
        };
      }
    });

    expect(wrapper.text()).toBe('关');

    isChecked.value = true;
    await nextTick();

    expect(wrapper.text()).toBe('开');
  });
});
