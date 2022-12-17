import { mount } from '@vue/test-utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { ref, reactive, nextTick } from 'vue';
import DCascader from '../src/cascader';
import { Form as DForm, FormItem as DFormItem } from '../../form';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('cascader', true);
const baseClass = ns.b();
const dropMenuWrapperClass = ns.e('drop-menu-wrapper');
const ulClass = ns.e('ul');
const liClass = ns.e('li');
const closeClass = ns.e('close');
const panelClass = ns.e('panel');
const suggestListClass = ns.e('suggest-list');

const dotInputNs = useNamespace('input', true);
const inputNs = useNamespace('input');

const inputClass = dotInputNs.b();
const inputInnerClass = dotInputNs.e('inner');
const inputDisabledClass = dotInputNs.m('disabled');
const inputSizeSmClass = inputNs.m('sm');
const inputSizeLgClass = inputNs.m('lg');

const OPTIONS = [
  {
    label: 'option1.1',
    value: 1,
    children: [
      {
        label: 'option1.1-1',
        value: 4,
        children: [
          {
            label: 'option1.1-1-1',
            value: 8,
            children: [],
          },
          {
            label: 'option1.1-1-2',
            value: 9,
            children: [
              {
                label: 'option1.1-1-2-1',
                value: 81,
              },
            ],
          },
        ],
      },
      {
        label: 'option1.1-2',
        value: 41,
      },
      {
        label: 'option1.1-3',
        value: 42,
      },
      {
        label: 'option1.1-4',
        value: 43,
      },
    ],
  },
  {
    label: 'option2.1',
    value: 2,
    children: [
      {
        label: 'option2.1-1',
        value: 5,
        children: [
          {
            label: 'option2.1-1-1',
            value: 51,
          },
          {
            label: 'option2.1-1-2',
            value: 61,
            disabled: true,
          },
        ],
      },
      {
        label: 'option2.1-2',
        value: 6,
        children: [
          {
            label: 'option2.1-2-1',
            value: 512,
          },
          {
            label: 'option2.1-2-2',
            value: 611,
          },
        ],
      },
      {
        label: 'option2.1-3',
        value: 712,
      },
    ],
  },
  {
    label: 'option3.1',
    value: 3,
    children: [],
    disabled: true,
  },
];

describe('cascader', () => {
  it('cascader render work', async () => {
    const value = ref([2, 712]);
    const options = reactive(OPTIONS);
    const wrapper = mount({
      components: { DCascader },
      template: `<d-cascader v-model="value" :options="options"></d-cascader>`,
      setup() {
        return {
          value,
          options,
        };
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();

    const input = wrapper.find(inputInnerClass);
    expect(input.element.value).toBe('option2.1-3');

    await input.trigger('click');
    await nextTick();
    const dropdownMenu = document.querySelector(dropMenuWrapperClass);
    expect(dropdownMenu).toBeTruthy();

    const ulList = document.querySelectorAll(ulClass);
    const firstUlLis = ulList[0].querySelectorAll(liClass);
    expect(firstUlLis[1].classList).toContain('leaf-active');
    const selectUlLis = ulList[1].querySelectorAll(liClass);
    expect(selectUlLis[2].classList).toContain('leaf-active');

    wrapper.unmount();
  });

  it('cascader showPath work', async () => {
    const value = ref([2, 712]);
    const options = reactive(OPTIONS);
    const wrapper = mount({
      components: { DCascader },
      template: `<d-cascader v-model="value" :options="options" showPath></d-cascader>`,
      setup() {
        return {
          value,
          options,
        };
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();

    const input = wrapper.find(inputInnerClass);
    expect(input.element.value).toBe('option2.1 / option2.1-3');

    wrapper.unmount();
  });

  it('cascader clearable work', async () => {
    const value = ref([2, 712]);
    const options = reactive(OPTIONS);
    const wrapper = mount({
      components: { DCascader },
      template: `<d-cascader v-model="value" :options="options" showPath clearable></d-cascader>`,
      setup() {
        return {
          value,
          options,
        };
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();

    container.trigger('mouseenter');
    await nextTick();
    const closeIcon = wrapper.find(closeClass);
    expect(closeIcon.exists()).toBeTruthy();

    closeIcon.trigger('click');
    await nextTick();
    const input = wrapper.find(inputInnerClass);
    expect(input.element.value).toBe('');

    wrapper.unmount();
  });

  it('cascader disabled work', async () => {
    const value = ref([]);
    const options = reactive(OPTIONS);
    const wrapper = mount({
      components: { DCascader },
      template: `<d-cascader v-model="value" :options="options" disabled></d-cascader>`,
      setup() {
        return {
          value,
          options,
        };
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();

    const disabledInput = wrapper.find(inputDisabledClass);
    expect(disabledInput.exists()).toBeTruthy();

    wrapper.unmount();
  });

  it('cascader filterable work', async () => {
    const value = ref([]);
    const options = reactive(OPTIONS);
    const wrapper = mount({
      components: { DCascader },
      template: `<d-cascader v-model="value" :options="options" filterable></d-cascader>`,
      setup() {
        return {
          value,
          options,
        };
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();

    const input = wrapper.find(inputInnerClass);
    input.setValue('3');
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    const panel = document.querySelector(panelClass);
    expect(panel).toBeTruthy();

    const suggestionList = document.querySelectorAll(suggestListClass);
    expect(suggestionList.length).toBe(2);

    await suggestionList[1].dispatchEvent(new Event('click'));
    await nextTick();
    expect(input.element.value).toBe('option2.1-3');

    wrapper.unmount();
  });

  it('cascader props size priority', async () => {
    const options = reactive(OPTIONS);
    const dFormSize = ref('lg');
    const dCascaderSize = ref('sm');

    const wrapper = mount({
      components: { DCascader, DForm, DFormItem },
      template: `
        <DForm :size="dFormSize">
        <DFormItem>
          <d-cascader  :options="options" :size="dCascaderSize"></d-cascader>
        </DFormItem>
        </DForm>`,
      setup() {
        return {
          dFormSize,
          dCascaderSize,
          options
        };
      },
    });

    const dSearch = wrapper.find(inputClass);
    // form 与 元素同时存在size 属性，以元素为准。
    expect(dSearch.classes()).toContain(inputSizeSmClass);

    dCascaderSize.value = '';
    await nextTick();
    expect(dSearch.classes()).toContain(inputSizeLgClass);

    dFormSize.value = '';
    await nextTick();
    expect(dSearch.classes()).not.toContain(inputSizeLgClass);
    expect(dSearch.classes()).not.toContain(inputSizeSmClass);

    wrapper.unmount();
  });
});
