import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DTransfer from '../src/transfer';
import { useNamespace } from '../../shared/hooks/use-namespace';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('transfer', true);
const baseClass = ns.b();
const sourceClass = ns.e('source');
const targetClass = ns.e('target');
const bodyClass = ns.em('panel', 'body');
const operateLeftClass = ns.em('operate', 'group-left');
const operateRightClass = ns.em('operate', 'group-right');
const allCheckedClass = ns.em('panel', 'header-allChecked');

const checkboxNs = useNamespace('checkbox', true);
const inputClass = checkboxNs.e('input');

const searchNs = useNamespace('search', true);
const clearClass = searchNs.e('clear');

const SOURCE_DATA = [
  {
    name: '北京',
    value: '北京',
    disabled: false,
  },
  {
    name: '上海',
    value: '上海',
    disabled: true,
  },
  {
    name: '广州',
    value: '广州',
    disabled: true,
  },
  {
    name: '深圳',
    value: '深圳',
    disabled: false,
  },
  {
    name: '成都',
    value: '成都',
    disabled: false,
  },
  {
    name: '武汉',
    value: '武汉',
    disabled: false,
  },
  {
    name: '西安',
    value: '西安',
    disabled: false,
  },
  {
    name: '福建',
    value: '福建',
    disabled: false,
  },
];

describe('d-transfer', () => {
  it('d-transfer basic work', async () => {
    const sourceOption = ref(SOURCE_DATA);
    const wrapper = mount({
      components: {
        DTransfer,
      },
      template: `
                <d-transfer
                    v-model="modelValues"
                    :titles="titles"
                    :data="source"
                >
                </d-transfer>
            `,
      setup() {
        return {
          modelValues: ref(['成都']),
          titles: ref(['sourceHeader', 'targetHeader']),
          source: sourceOption,
        };
      },
    });

    expect(wrapper.find(baseClass).exists()).toBeTruthy();
    await nextTick();
    expect(wrapper.findAll(`${sourceClass} ${bodyClass} .devui-checkbox`).length).toBe(7);
    expect(wrapper.findAll(`${targetClass} ${bodyClass} .devui-checkbox`).length).toBe(1);

    const disableds = wrapper.findAll(`${baseClass} ${sourceClass} .disabled`);
    expect(disableds.length).toBe(2);
    expect(disableds.filter((item) => ['上海', '广州'].includes(item.text())).length).toBe(2);

    const leftButton = wrapper.find(`${baseClass} ${operateLeftClass}`);
    expect(leftButton.attributes('disabled')).toBeFalsy();
    leftButton.trigger('click');
    await nextTick();
    expect(leftButton.attributes('disabled')).toEqual('');

    const rightButton = wrapper.find(`${baseClass} ${operateRightClass}`);
    expect(rightButton.attributes('disabled')).toBeFalsy();
    rightButton.trigger('click');
    await nextTick();
    expect(rightButton.attributes('disabled')).toEqual('');

    const sourceAllInput = wrapper.find(`${sourceClass} ${allCheckedClass} ${inputClass}`);
    sourceAllInput.trigger('click');
    await nextTick();
    const newSourceAllInput = wrapper.find<HTMLInputElement>(`${sourceClass} ${allCheckedClass} ${inputClass}`);
    expect(newSourceAllInput.element.checked).toBeTruthy();

    const targetAllInput = wrapper.find(`${targetClass} ${allCheckedClass} ${inputClass}`);
    targetAllInput.trigger('click');
    await nextTick();
    const newTargetAllInput = wrapper.find<HTMLInputElement>(`${targetClass} ${allCheckedClass} ${inputClass}`);
    expect(newTargetAllInput.element.checked).toBeTruthy();
  });

  it('d-transfer search work', async () => {
    const sourceOption = ref(SOURCE_DATA);
    const modelValues = ref(['北京', '武汉']);
    const titles = ref(['sourceHeader', 'targetHeader']);
    const filter = ref(true);
    const wrapper = mount({
      components: {
        DTransfer,
      },
      template: `
                <d-transfer
                    v-model="modelValues"
                    :titles="titles"
                    :data="source"
                    :filter="filter"
                >
                </d-transfer>
            `,
      setup() {
        return {
          modelValues,
          titles,
          source: sourceOption,
          filter,
        };
      },
    });

    expect(wrapper.find(`${sourceClass} .devui-search`).exists()).toBe(true);
    const sourceSearch = wrapper.find<HTMLInputElement>(`${sourceClass} input[type="text"]`);
    const sourceSearchClear = wrapper.find(`${sourceClass} ${clearClass}`);
    expect(sourceSearchClear.exists()).toBe(false);
    sourceSearch.setValue('福建');
    expect(sourceSearch.element.value).toBe('福建');
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    expect(wrapper.find(`${sourceClass} ${bodyClass} .devui-checkbox`).text()).toBe('福建');

    const newSourceSearchClear = wrapper.find(`${sourceClass} ${clearClass}`);
    expect(newSourceSearchClear.exists()).toBe(true);
    newSourceSearchClear.trigger('click');
    await nextTick();
    expect(wrapper.find<HTMLInputElement>(`${sourceClass} input[type="text"]`).element.value).toBe('');

    // 目标搜索功能
    expect(wrapper.find(`${targetClass} .devui-search`).exists()).toBe(true);
    const targetSearch = wrapper.find<HTMLInputElement>(`${targetClass}  input[type="text"]`);
    const targetSearchClear = wrapper.find(`${targetClass} ${clearClass}`);
    expect(targetSearchClear.exists()).toBe(false);
    targetSearch.setValue('武汉');
    await nextTick();
    expect(targetSearch.element.value).toBe('武汉');
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    expect(wrapper.find(`${targetClass} ${bodyClass} .devui-checkbox`).text()).toBe('武汉');
    const newTargetSearchClear = wrapper.find(`${targetClass} ${clearClass}`);
    expect(newTargetSearchClear.exists()).toBe(true);
    newTargetSearchClear.trigger('click');
    await nextTick();
    expect(wrapper.find<HTMLInputElement>(`${targetClass} input[type="text"]`).element.value).toBe('');
  });

  it('d-transfer render-content work', async () => {
    const sourceOption = ref(SOURCE_DATA);
    const modelValues = ref(['武汉']);
    const titles = ref(['sourceHeader', 'targetHeader']);
    const filter = ref(true);
    const renderContent = (h, option) => {
      return h('span', { style: { color: '#5e7ce0' } }, [option.value, option.name]);
    };
    const wrapper = mount({
      components: {
        DTransfer,
      },
      template: `
                <d-transfer
                    v-model="modelValues"
                    :titles="titles"
                    :data="source"
                    :filter="filter"
                    :render-content="renderContent"
                >
                </d-transfer>
            `,
      setup() {
        return {
          modelValues,
          titles,
          source: sourceOption,
          filter,
          renderContent,
        };
      },
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    const firstCheckbox = wrapper.find(`${sourceClass} ${bodyClass} .devui-checkbox`);
    const firstCheckboxTextLabel = firstCheckbox.find('.devui-checkbox__label-text span'); // the text element
    expect(firstCheckboxTextLabel.text()).toBe('北京北京');

    // check the checkbox props —— renderContent: h('span', { style: { color: '#5e7ce0' } }, [option.value, option.name])
    expect(firstCheckboxTextLabel.attributes().style).toBe('color: rgb(94, 124, 224);');
  });
});
