import { mount } from '@vue/test-utils';
import { reactive, ref } from 'vue';
import { Form, FormItem } from '../index';
import { Input } from '../../input';
import { useNamespace } from '../../shared/hooks/use-namespace';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('form', true);
describe('form', () => {

  it('render form', async () => {
    const wrapper = mount({
      components: { 'd-form': Form, 'd-form-item': FormItem, 'd-input': Input },
      setup() {
        const formModel = reactive({
          name: '',
          description: '',
          executionDay: [],
        });
        const size = ref('md');
        const align = ref('start');
        return { formModel, size, align };
      },
      template: `
        <d-form :data="formModel" :label-size="size" :label-align="align">
          <d-form-item field="name" label="Name">
            <d-input v-model="formModel.name" />
          </d-form-item>
        </d-form>
      `
    });
    expect(wrapper.find(ns.b()).exists()).toBeTruthy();
  });

});
