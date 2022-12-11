import { mount } from '@vue/test-utils';
import { reactive, ref, nextTick } from 'vue';
import DCheckboxGroup from '../src/checkbox-group';
import DCheckbox from '../src/checkbox';
import DCheckboxButton from '../src/checkbox-button';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('checkbox', true);
const baseClass = ns.b();
const columnMarginClass = ns.e('column-margin');
const wrapClass = ns.e('wrap');
const borderClass = ns.m('bordered');
const sizeLgClass = ns.m('lg');

const buttonNs = useNamespace('checkbox-button', true);
const contentClass = buttonNs.e('content');

const nsGroup = useNamespace('checkbox', false);
const baseGroupClass = nsGroup.e('group');

describe('d-checkbox-group', () => {
  it('checkbox-group render work', async () => {
    const list = reactive(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox,
      },
      template: `
        <d-checkbox-group v-model="list">
          <d-checkbox value="a"></d-checkbox>
          <d-checkbox value="b"></d-checkbox>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
        };
      },
    });
    const [box1, box2] = wrapper.findAll(baseClass);

    expect(wrapper.classes()).toContain(baseGroupClass);
    expect(box1.classes()).toContain('unchecked');
    expect(box2.classes()).toContain('active');

    Object.assign(list, ['a']);
    await nextTick();
    expect(box1.classes()).toContain('active');
    expect(box2.classes()).toContain('unchecked');

    wrapper.unmount();
  });

  it('checkbox-group disabled work', async () => {
    const list = ref(['b']);
    const disabled = ref(true);
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox,
      },
      template: `
        <d-checkbox-group v-model="list" :disabled="disabled" @change="onChange">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
          disabled,
          onChange,
        };
      },
    });
    const label1 = wrapper.find('label');

    await label1.trigger('click');
    expect(list.value).toStrictEqual(['b']);
    expect(onChange).toBeCalledTimes(0);
    expect(wrapper.findAll(baseClass).every((el) => el.classes().includes('disabled'))).toBe(true);

    disabled.value = false;
    await nextTick();
    await label1.trigger('click');
    expect(list.value).toStrictEqual(['b', 'a']);
    expect(onChange).toBeCalledTimes(1);
    expect(wrapper.findAll(baseClass).some((el) => el.classes().includes('disabled'))).toBe(false);

    wrapper.unmount();
  });

  it('checkbox-group direction work', async () => {
    const direction = ref('column');
    const list = ref(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox,
      },
      template: `
        <d-checkbox-group v-model="list" :direction="direction">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
          direction,
        };
      },
    });

    expect(wrapper.findAll(columnMarginClass).length).toBe(2);
    expect(wrapper.find('.is-column').exists()).toBe(true);

    direction.value = 'row';
    await nextTick();
    expect(wrapper.find('.is-row').exists()).toBe(true);

    wrapper.unmount();
  });

  it('checkbox-group itemWidth work', () => {
    const itemWidth = ref(100);
    const list = ref(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox,
      },
      template: `
        <d-checkbox-group v-model="list" :item-width="itemWidth">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
          itemWidth,
        };
      },
    });

    expect(wrapper.findAll(wrapClass).length).toBe(2);

    wrapper.unmount();
  });

  it('checkbox-group options work', () => {
    const list = ref(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
      },
      template: `
        <d-checkbox-group v-model="list" :options="options">
        </d-checkbox-group>
      `,
      setup() {
        const options = [
          {
            value: 'a',
          },
          {
            value: 'b',
          },
        ];
        return {
          list,
          options,
        };
      },
    });

    const boxList = wrapper.findAll(baseClass);

    expect(boxList.length).toBe(2);
    expect(boxList[0].classes()).toContain('unchecked');
    expect(boxList[1].classes()).toContain('active');

    wrapper.unmount();
  });

  it('checkbox-group beforeChange work', async () => {
    const list = ref(['b']);
    const beforeChange = jest.fn(() => false);
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox,
      },
      template: `
        <d-checkbox-group v-model="list" :before-change="beforeChange" @change="onChange">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
          beforeChange,
          onChange,
        };
      },
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

    wrapper.unmount();
  });

  it('checkbox-group max work', async () => {
    const list = ref(['a', 'b']);
    const max = ref(3);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox,
      },
      template: `
        <d-checkbox-group v-model="list" :max="max">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
          <d-checkbox value="c">3</d-checkbox>
          <d-checkbox value="d">4</d-checkbox>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
          max,
        };
      },
    });
    const [label1, label2, label3, label4] = wrapper.findAll('label');

    await label3.trigger('click');
    await label4.trigger('click');
    expect(list.value).toStrictEqual(['a', 'b', 'c']);
    expect(list.value.length).toBeLessThanOrEqual(max.value);
    expect(wrapper.findAll(baseClass).filter((el) => el.classes().includes('disabled'))?.length).toBe(1);

    await label1.trigger('click');
    await label2.trigger('click');
    expect(list.value).toStrictEqual(['c']);
    expect(wrapper.findAll(baseClass).filter((el) => el.classes().includes('disabled'))?.length).toBe(0);

    wrapper.unmount();
  });

  it('checkbox-group border size work', () => {
    const list = ref(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckbox,
      },
      template: `
        <d-checkbox-group v-model="list" border size="lg">
          <d-checkbox value="a">1</d-checkbox>
          <d-checkbox value="b">2</d-checkbox>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
        };
      },
    });

    expect(wrapper.find(borderClass).exists()).toBe(true);
    expect(wrapper.find(sizeLgClass).exists()).toBe(true);

    wrapper.unmount();
  });

  it('checkbox-group checkbox-button', async () => {
    const list = ref(['b']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckboxButton,
      },
      template: `
        <d-checkbox-group v-model="list">
          <d-checkbox-button value="a">1</d-checkbox-button>
          <d-checkbox-button value="b">2</d-checkbox-button>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
        };
      },
    });

    const [label1, label2] = wrapper.findAll('label');

    await label1.trigger('click');
    expect(list.value).toStrictEqual(['b', 'a']);
    await label2.trigger('click');
    expect(list.value).toStrictEqual(['a']);

    wrapper.unmount();
  });

  it('checkbox-button color text-color', async () => {
    const list = ref(['a']);
    const wrapper = mount({
      components: {
        DCheckboxGroup,
        DCheckboxButton,
      },
      template: `
        <d-checkbox-group v-model="list" color="red" text-color="rgb(204,204,204)">
          <d-checkbox-button value="a">1</d-checkbox-button>
          <d-checkbox-button value="b">2</d-checkbox-button>
        </d-checkbox-group>
      `,
      setup() {
        return {
          list,
        };
      },
    });

    await nextTick();
    const content = wrapper.findAll(contentClass);
    expect(content[0].attributes().style).toBe('border-color: red; background-color: red; color: rgb(204, 204, 204);');

    wrapper.unmount();
  });
});
