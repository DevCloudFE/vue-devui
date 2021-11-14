import { mount } from '@vue/test-utils';
import { reactive, ref, nextTick } from 'vue';
import DCheckboxGroup from '../src/checkbox-group';
import DCheckbox from '../src/checkbox';

describe('d-checkbox-group', () => {
  it('checkbox-group render work', async () => {
    const list = reactive(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox
      },
      template: `
        <d-checkbox-group v-model:value="list">
          <d-checkbox value="a"></d-checkbox>
          <d-checkbox value="b"></d-checkbox>
        </d-checkbox-group>
      `,
      setup () {
        return {
          list
        };
      }
    });
    const [box1, box2] = wrapper.findAll('.devui-checkbox');

    expect(wrapper.classes()).toContain('devui-checkbox-group');
    expect(box1.classes()).toContain('unchecked');
    expect(box2.classes()).toContain('active');

    Object.assign(list, ['a']);
    await nextTick();
    expect(box1.classes()).toContain('active');
    expect(box2.classes()).toContain('unchecked');
  });

  it('checkbox-group disabled work', async () => {
    const list = ref(['b']);
    const disabled = ref(true);
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox
      },
      template: `
        <d-checkbox-group v-model:value="list" :disabled="disabled" @change="onChange">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup () {
        return {
          list,
          disabled,
          onChange
        };
      }
    });
    const label1 = wrapper.find('label');

    await label1.trigger('click');
    expect(list.value).toStrictEqual(['b']);
    expect(onChange).toBeCalledTimes(0);
    expect(wrapper.findAll('.devui-checkbox').every(el => el.classes().includes('disabled'))).toBe(true);

    disabled.value = false;
    await nextTick();
    await label1.trigger('click');
    expect(list.value).toStrictEqual(['b', 'a']);
    expect(onChange).toBeCalledTimes(1);
    expect(wrapper.findAll('.devui-checkbox').some(el => el.classes().includes('disabled'))).toBe(false);
  });

  it('checkbox-group direction work', async () => {
    const direction = ref('column');
    const list = ref(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox
      },
      template: `
        <d-checkbox-group v-model:value="list" :direction="direction">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup () {
        return {
          list,
          direction
        };
      }
    });

    expect(wrapper.findAll('.devui-checkbox-column-margin').length).toBe(2);
    expect(wrapper.find('.devui-checkbox-list-inline').exists()).toBe(false);

    direction.value = 'row';
    await nextTick();
    expect(wrapper.find('.devui-checkbox-list-inline').exists()).toBe(true);
  });

  it('checkbox-group itemWidth work', () => {
    const itemWidth = ref(100);
    const list = ref(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox
      },
      template: `
        <d-checkbox-group v-model:value="list" :item-width="itemWidth">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup () {
        return {
          list,
          itemWidth
        };
      }
    });

    expect(wrapper.findAll('.devui-checkbox-wrap').length).toBe(2);
  });

  it('checkbox-group options work', () => {
    const list = ref(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup
      },
      template: `
        <d-checkbox-group v-model:value="list" :options="options">
        </d-checkbox-group>
      `,
      setup () {
        const options = [
          {
            value: 'a'
          }, {
            value: 'b'
          }
        ];
        return {
          list,
          options
        };
      }
    });

    const boxList = wrapper.findAll('.devui-checkbox');

    expect(boxList.length).toBe(2);
    expect(boxList[0].classes()).toContain('unchecked');
    expect(boxList[1].classes()).toContain('active');
  });

  it('checkbox-group beforeChange work', async () => {
    const list = ref(['b']);
    const beforeChange = jest.fn(() => false);
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox
      },
      template: `
        <d-checkbox-group v-model:value="list" :before-change="beforeChange" @change="onChange">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup () {
        return {
          list,
          beforeChange,
          onChange
        };
      }
    });

    const box1 = wrapper.find('label');
    await box1.trigger('click');

    expect(beforeChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);
    expect(list.value).toStrictEqual(['b']);

    beforeChange.mockReturnValue(true);
    await box1.trigger('click');

    expect(beforeChange).toHaveBeenCalledTimes(2);
    expect(onChange).toBeCalledTimes(1);
    expect(list.value).toStrictEqual(['b', 'a']);
  });
});
