import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DTreeSelect from '../src/tree-select';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

describe('tree-select', () => {

  it('tree-select should render correctly', async () => {
    const value = ref('');
    const data = ref([{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1',
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1',
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1',
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1',
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1',
        }]
      }]
    }]);
    const wrapper = mount({
      components: { DTreeSelect },
      template: `<d-tree-select v-model="value" :treeData="data"></d-tree-select>`,
      setup() {
        return {
          value,
          data,
        };
      },
    });

    expect(wrapper.classes()).toContain('devui-tree-select');
  });

  it.todo('Whether the placeholder is valid');

  it.todo('Whether the disabled is valid');

  it.todo('Whether the allowClear is valid');

  it.todo('Whether the multiple is valid');

  it.todo('Whether the leafOnly is valid');

  it.todo('Whether the enableLabelization is valid');
});
