import { mount } from '@vue/test-utils';
import { reactive, ref, nextTick } from 'vue';
import { Form, FormItem, FormOperation } from '../index';
import { Input } from '../../input';
import { Select } from '../../select';
import { AutoComplete } from '../../auto-complete';
import { Radio, RadioGroup } from '../../radio';
import { Switch } from '../../switch';
import { Checkbox, CheckboxGroup } from '../../checkbox';
import { DatePickerPro, DRangeDatePickerPro } from '../../date-picker-pro';
import { Textarea } from '../../textarea';
import { useNamespace } from '../../shared/hooks/use-namespace';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('form', true);
const inputNs = useNamespace('input', true);
const selectNs = useNamespace('select', true);
const autoCompleteNs = useNamespace('auto-complete', true);
const radioNs = useNamespace('radio', true);
const switchNs = useNamespace('switch', true);
const checkboxNs = useNamespace('checkbox', true);
const textareaNs = useNamespace('textarea', true);
const datePickerProNs = useNamespace('date-picker-pro', true);
const buttonNs = useNamespace('button', true);

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
    wrapper.unmount();
  });

  it('props label-size/label-align work well.', async () => {
    const formModel = reactive({
      name: '',
      description: '',
      executionDay: [],
    });
    const size = ref('sm');
    const align = ref('start');
    const wrapper = mount({
      components: { 'd-form': Form, 'd-form-item': FormItem, 'd-input': Input },
      setup() {
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
    expect(wrapper.find(ns.e('label')).classes().includes(ns.em('label', 'sm')));
    expect(wrapper.find(ns.e('label')).classes().includes(ns.em('label', 'start')));
    size.value = 'md';
    align.value = 'center';
    await nextTick();
    expect(wrapper.find(ns.e('label')).classes().includes(ns.em('label', 'md')));
    expect(wrapper.find(ns.e('label')).classes().includes(ns.em('label', 'center')));
    size.value = 'lg';
    align.value = 'end';
    await nextTick();
    expect(wrapper.find(ns.e('label')).classes().includes(ns.em('label', 'lg')));
    expect(wrapper.find(ns.e('label')).classes().includes(ns.em('label', 'end')));
    wrapper.unmount();
  });

  it('props layout work well.', async () => {
    const formModel = reactive({
      name: '',
      description: '',
      executionDay: [],
    });
    const layout = ref('horizontal');
    const wrapper = mount({
      components: { 'd-form': Form, 'd-form-item': FormItem, 'd-input': Input },
      setup() {
        return { formModel, layout };
      },
      template: `
        <d-form :data="formModel" :layout="layout">
          <d-form-item field="name" label="Name">
            <d-input v-model="formModel.name" />
          </d-form-item>
        </d-form>
      `
    });
    expect(wrapper.find(ns.em('item', 'horizontal')).exists()).toBe(true);
    layout.value = 'vertical';
    await nextTick();
    expect(wrapper.find(ns.em('item', 'vertical')).exists()).toBe(true);
    wrapper.unmount();
  });

  it('props size work well.', async () => {
    const formModel = reactive({
      name: '',
      description: '',
      executionDay: [],
      select: '',
      autoComplete: '',
      radio: '',
      switch: true,
      datePickerPro: '',
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    const source = ref(['C#', 'C', 'C++']);
    const size = ref('sm');
    const wrapper = mount({
      components: {
        'd-form': Form,
        'd-form-item': FormItem,
        'd-input': Input,
        'd-select': Select,
        'd-auto-complete': AutoComplete,
        'd-radio': Radio,
        'd-radio-group': RadioGroup,
        'd-switch': Switch,
        'd-checkbox': Checkbox,
        'd-checkbox-group': CheckboxGroup,
        'd-date-picker-pro': DatePickerPro,
      },
      setup() {
        return { formModel, size, selectOptions, source };
      },
      template: `
        <d-form :data="formModel" :size="size">
          <d-form-item field="name" label="Name">
            <d-input v-model="formModel.name" />
          </d-form-item>
          <d-form-item field="select" label="Select">
            <d-select v-model="formModel.select" :options="selectOptions" />
          </d-form-item>
          <d-form-item field="autoComplete" label="AutoComplete">
            <d-auto-complete :source="source" v-model="formModel.autoComplete"></d-auto-complete>
          </d-form-item>
          <d-form-item field="radio" label="Radio">
            <d-radio-group direction="row" v-model="formModel.radio">
              <d-radio value="0" border>Manual execution</d-radio>
            </d-radio-group>
          </d-form-item>
          <d-form-item field="switch" label="Switch">
            <d-switch v-model="formModel.switch"></d-switch>
          </d-form-item>
          <d-form-item field="executionDay" label="Execution day">
            <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row" border>
              <d-checkbox label="Sun" value="Sun" />
            </d-checkbox-group>
          </d-form-item>
          <d-form-item field="datePickerPro" label="Date Picker Pro">
            <d-date-picker-pro v-model="formModel.datePickerPro"></d-date-picker-pro>
          </d-form-item>
        </d-form>
      `
    });
    expect(wrapper.find(inputNs.m('sm')).exists()).toBe(true);
    expect(wrapper.find(selectNs.m('sm')).exists()).toBe(true);
    expect(wrapper.find(autoCompleteNs.m('sm')).exists()).toBe(true);
    expect(wrapper.find(radioNs.m('sm')).exists()).toBe(true);
    expect(wrapper.find(switchNs.m('sm')).exists()).toBe(true);
    expect(wrapper.find(checkboxNs.m('sm')).exists()).toBe(true);
    expect(wrapper.find(datePickerProNs.b()).find(inputNs.m('sm')).exists()).toBe(true);
    size.value = 'md';
    await nextTick();
    expect(wrapper.find(inputNs.m('md')).exists()).toBe(true);
    expect(wrapper.find(selectNs.b()).classes().includes(selectNs.m('sm'))).toBe(false);
    expect(wrapper.find(selectNs.b()).classes().includes(selectNs.m('lg'))).toBe(false);
    expect(wrapper.find(autoCompleteNs.m('md')).exists()).toBe(true);
    expect(wrapper.find(radioNs.m('md')).exists()).toBe(true);
    expect(wrapper.find(switchNs.m('md')).exists()).toBe(true);
    expect(wrapper.find(checkboxNs.m('md')).exists()).toBe(true);
    expect(wrapper.find(datePickerProNs.b()).find(inputNs.m('md')).exists()).toBe(true);
    size.value = 'lg';
    await nextTick();
    expect(wrapper.find(inputNs.m('lg')).exists()).toBe(true);
    expect(wrapper.find(selectNs.m('lg')).exists()).toBe(true);
    expect(wrapper.find(autoCompleteNs.m('lg')).exists()).toBe(true);
    expect(wrapper.find(radioNs.m('lg')).exists()).toBe(true);
    expect(wrapper.find(switchNs.m('lg')).exists()).toBe(true);
    expect(wrapper.find(checkboxNs.m('lg')).exists()).toBe(true);
    expect(wrapper.find(datePickerProNs.b()).find(inputNs.m('lg')).exists()).toBe(true);
    wrapper.unmount();
  });

  it('props disabled work well.', async () => {
    const formModel = reactive({
      name: '',
      description: '',
      executionDay: [],
      select: '',
      autoComplete: '',
      radio: '',
      switch: true,
      datePickerPro: '',
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    const source = ref(['C#', 'C', 'C++']);
    const size = ref('sm');
    const wrapper = mount({
      components: {
        'd-form': Form,
        'd-form-item': FormItem,
        'd-input': Input,
        'd-select': Select,
        'd-auto-complete': AutoComplete,
        'd-radio': Radio,
        'd-radio-group': RadioGroup,
        'd-switch': Switch,
        'd-checkbox': Checkbox,
        'd-checkbox-group': CheckboxGroup,
        'd-date-picker-pro': DatePickerPro,
        'd-textarea': Textarea,
      },
      setup() {
        return { formModel, size, selectOptions, source };
      },
      template: `
        <d-form :data="formModel" disabled :size="size">
          <d-form-item field="name" label="Name">
            <d-input v-model="formModel.name" />
          </d-form-item>
          <d-form-item field="description" label="Description">
            <d-textarea v-model="formModel.description" />
          </d-form-item>
          <d-form-item field="select" label="Select">
            <d-select v-model="formModel.select" :options="selectOptions" />
          </d-form-item>
          <d-form-item field="autoComplete" label="AutoComplete">
            <d-auto-complete :source="source" v-model="formModel.autoComplete"></d-auto-complete>
          </d-form-item>
          <d-form-item field="radio" label="Radio">
            <d-radio-group direction="row" v-model="formModel.radio">
              <d-radio value="0" border>Manual execution</d-radio>
            </d-radio-group>
          </d-form-item>
          <d-form-item field="switch" label="Switch">
            <d-switch v-model="formModel.switch"></d-switch>
          </d-form-item>
          <d-form-item field="executionDay" label="Execution day">
            <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row" border>
              <d-checkbox label="Sun" value="Sun" />
            </d-checkbox-group>
          </d-form-item>
          <d-form-item field="datePickerPro" label="Date Picker Pro">
            <d-date-picker-pro v-model="formModel.datePickerPro"></d-date-picker-pro>
          </d-form-item>
        </d-form>
      `
    });
    expect(wrapper.find(inputNs.m('disabled')).exists()).toBe(true);
    expect(wrapper.find(textareaNs.m('disabled')).exists()).toBe(true);
    expect(wrapper.find(selectNs.m('disabled')).exists()).toBe(true);
    expect(wrapper.find(autoCompleteNs.m('disabled')).exists()).toBe(true);
    expect(wrapper.find(radioNs.b()).classes().includes('disabled')).toBe(true);
    expect(wrapper.find(switchNs.m('disabled')).exists()).toBe(true);
    expect(wrapper.find(datePickerProNs.b()).find(inputNs.m('disabled')).exists()).toBe(true);
    wrapper.unmount();
  });

  // TODO: 可增加对datePickPro的验证
  it('form validate work well.', async () => {
    let isValid, invalidFields = {};
    const formData = reactive({
      userInfo: '',
      age: '',
      select: '',
      autoComplete: '',
      executionDay: [],
      radio: '',
    });

    const wrapper = mount({
      components: {
        'd-form': Form,
        'd-form-item': FormItem,
        'd-input': Input,
        'd-select': Select,
        'd-auto-complete': AutoComplete,
        'd-radio': Radio,
        'd-radio-group': RadioGroup,
        'd-switch': Switch,
        'd-checkbox': Checkbox,
        'd-checkbox-group': CheckboxGroup,
        'd-date-picker-pro': DatePickerPro,
        'd-textarea': Textarea,
        'd-range-date-picker-pro': DRangeDatePickerPro,
        'd-form-operation': FormOperation,
      },
      setup() {
        const formRef = ref(null);
        const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
        const source = ref(['C#', 'C', 'C++']);

        const rules = {
          userInfo: [{ required: true, message: '用户信息不能为空', trigger: 'blur' }],
          age: [{ required: true, message: '不能为空', trigger: 'blur' }],
          select: [{ required: true, message: '请选择', trigger: 'change' }],
          autoComplete: [{ required: true, message: '请选择', trigger: 'change' }],
          executionDay: [{ type: 'array', required: true, message: '请至少选择一个执行时间', trigger: 'change' }],
          radio: [{ required: true, message: '请选择', trigger: 'change' }],
        };

        const onClick = () => {
          formRef.value.validate((a: boolean, b: unknown) => {
            isValid = a;
            invalidFields = b;
          });
        };

        const onClear = () => {
          formRef.value.clearValidate();
        };

        const onReset = () => {
          formRef.value.resetFields();
        };

        return { formRef, formData, selectOptions, source, rules, onClick, onClear, onReset };
      },
      template: `
        <d-form ref="formRef" layout="vertical" :data="formData" :rules="rules" :pop-position="['right']">
          <d-form-item field="userInfo" label="用户信息">
            <d-textarea v-model="formData.userInfo"></d-textarea>
          </d-form-item>
          <d-form-item field="age" label="年龄">
            <d-input v-model="formData.age" />
          </d-form-item>
          <d-form-item field="select" label="Select">
            <d-select v-model="formData.select" :options="selectOptions" allow-clear />
          </d-form-item>
          <d-form-item field="autoComplete" label="AutoComplete">
            <d-auto-complete :source="source" v-model="formData.autoComplete"></d-auto-complete>
          </d-form-item>
          <d-form-item field="radio" label="Radio">
            <d-radio-group direction="row" v-model="formData.radio">
              <d-radio value="0">Manual execution</d-radio>
              <d-radio value="1">Daily execution</d-radio>
              <d-radio value="2">Weekly execution</d-radio>
            </d-radio-group>
          </d-form-item>
          <d-form-item field="executionDay" label="Execution day">
            <d-checkbox-group v-model="formData.executionDay" label="Execution day" direction="row">
              <d-checkbox label="Mon" value="Mon" />
              <d-checkbox label="Tue" value="Tue" />
              <d-checkbox label="Wed" value="Wed" />
              <d-checkbox label="Thur" value="Thur" />
              <d-checkbox label="Fri" value="Fri" />
              <d-checkbox label="Sat" value="Sat" />
              <d-checkbox label="Sun" value="Sun" />
            </d-checkbox-group>
          </d-form-item>
          <d-form-operation class="form-operation-wrap">
            <d-button variant="solid" @click="onClick">提交</d-button>
            <d-button @click="onClear">清除校验结果</d-button>
            <d-button @click="onReset">重置</d-button>
          </d-form-operation>
        </d-form>
      `
    });
    await wrapper.find('.form-operation-wrap').findAll(buttonNs.b())[0].trigger('click');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(isValid).toBe(false);
    expect(Object.keys(invalidFields).length).toBe(6);
    formData.userInfo = '用户信息';
    formData.age = '18';
    formData.select = 'Options1';
    formData.autoComplete = '请选择';
    formData.executionDay = ['Mon'];
    formData.radio = '1';
    await wrapper.find('.form-operation-wrap').findAll(buttonNs.b())[0].trigger('click');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(isValid).toBe(true);
    expect(invalidFields).toBeFalsy();
    wrapper.unmount();
  });
});
