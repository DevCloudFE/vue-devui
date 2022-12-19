import { mount } from '@vue/test-utils';
import { reactive, ref, nextTick } from 'vue';
import { Form, FormItem } from '../index';
import { Input } from '../../input';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { wait } from '../../shared/utils';

const formNs = useNamespace('form', true);
const inputNs = useNamespace('input', true);
const popoverNs = useNamespace('popover', true);

// eslint-disable-next-line
console.warn = () => {};

const removePopover = () => {
  const baseDom = document.querySelector(popoverNs.e('content'));
  baseDom?.parentNode?.removeChild(baseDom);
};

describe('d-form-item', () => {
  afterEach(removePopover);

  it('basic function work well.', async () => {
    const wrapper = mount({
      setup () {
        return () => (
          <Form>
            <FormItem>
              <Input></Input>
            </FormItem>
          </Form>
        );
      },
    });
    expect(wrapper.find(formNs.b()).exists()).toBeTruthy();
    expect(wrapper.find(formNs.em('item', 'horizontal')).exists()).toBeTruthy();
    expect(wrapper.find(inputNs.b()).exists()).toBeTruthy();

    wrapper.unmount();
  });

  it('props required work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const rules = reactive([{ required: true, message: '用户名不能为空', trigger: 'blur' }]);

    const wrapper = mount({
      setup () {
        return () => (
          <Form>
            <FormItem field="username" rules={rules}>
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    });

    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(wrapper.find(inputNs.m('error')).exists()).toBe(true);

    rules[0].required = false;
    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(wrapper.find(inputNs.m('error')).exists()).toBe(false);

    wrapper.unmount();
  });

  it('props rules work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const rules = reactive([{ required: true, message: '用户名不能为空', trigger: 'blur' }]);

    const wrapper = mount({
      setup () {
        return () => (
          <Form>
            <FormItem field="username" rules={rules}>
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    });

    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(wrapper.find(inputNs.m('error')).exists()).toBe(true);

    wrapper.unmount();
  });

  it('props message-type work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const rules = reactive([{ required: true, message: '用户名不能为空', trigger: 'blur' }]);
    const messageType = ref('popover');

    const wrapper = mount({
      setup () {
        return () => (
          <Form>
            <FormItem field="username" rules={rules} messageType={messageType.value}>
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    });

    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(document.querySelector(popoverNs.e('content'))?.innerHTML).toContain('用户名不能为空');

    messageType.value = 'text';
    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(wrapper.find('.error-message').html()).toContain('用户名不能为空');

    wrapper.unmount();
  });

  it('props pop-position work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const rules = reactive([{ required: true, message: '用户名不能为空', trigger: 'blur' }]);

    let popPosition = ref(['top']);
    const comp = {
      setup () {
        return () => (
          <Form>
            <FormItem field="username" rules={rules} popPosition={popPosition.value} show-feedback={false}>
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    };

    let wrapper = mount(comp);
    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(document.querySelector(popoverNs.e('content'))?.style['transform-origin']).toBe('50% calc(100% + 8px)');
    removePopover();

    popPosition = ref(['bottom']);
    wrapper = mount(comp);
    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(document.querySelector(popoverNs.e('content'))?.style['transform-origin']).toBe('50% -8px');
    removePopover();

    popPosition = ref(['left']);
    wrapper = mount(comp);
    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(document.querySelector(popoverNs.e('content'))?.style['transform-origin']).toBe('calc(100% + 8px)');
    removePopover();

    popPosition = ref(['right']);
    wrapper = mount(comp);
    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(document.querySelector(popoverNs.e('content'))?.style['transform-origin']).toBe('-8px 50%');
    removePopover();

    wrapper.unmount();
  });

  it('props show-feedback work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const rules = reactive([{ required: true, message: '用户名不能为空', trigger: 'blur' }]);
    const showFeedback = ref(true);

    const wrapper = mount({
      setup () {
        return () => (
          <Form>
            <FormItem field="username" rules={rules} showFeedback={showFeedback.value}>
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    });

    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(wrapper.find(inputNs.m('feedback')).exists()).toBe(true);

    showFeedback.value = false;
    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(wrapper.find(inputNs.m('feedback')).exists()).toBe(false);

    wrapper.unmount();
  });

  it('props feedback-status work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const feedbackStatus = ref('error');

    const wrapper = mount({
      setup () {
        return () => (
          <Form>
            <FormItem
              field="username"
              feedbackStatus={feedbackStatus.value}
            >
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    });

    expect(wrapper.find(formNs.em('control-container', 'feedback-error')).exists()).toBe(true);

    feedbackStatus.value = 'success';
    await nextTick();
    expect(wrapper.find(formNs.em('control-container', 'feedback-error')).exists()).toBe(false);

    wrapper.unmount();
  });

  it('props help-tips work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const helpTips = ref('包含中文名');

    const wrapper = mount({
      setup () {
        return () => (
          <Form>
            <FormItem
              field="username"
              helpTips={helpTips.value}
            >
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    });

    expect(wrapper.find(formNs.e('label-help')).exists()).toBe(true);

    await wrapper.find(formNs.e('label-help')).trigger('mouseenter');
    await wait(500);
    expect(document.querySelector(popoverNs.e('content'))?.innerHTML).toContain('包含中文名');

    wrapper.unmount();
  });

  it('props extra-info work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const extraInfo = ref('额外信息补充');

    const wrapper = mount({
      setup () {
        return () => (
          <Form>
            <FormItem
              field="username"
              extraInfo={extraInfo.value}
            >
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    });

    expect(wrapper.find(formNs.e('control-extra')).exists()).toBe(true);
    expect(wrapper.find(formNs.e('control-extra')).text()).toContain('额外信息补充');

    wrapper.unmount();
  });

  it('method resetField、clearValidate work well.', async () => {
    const formData = reactive({
      username: '',
    });
    const rules = ref([
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 3, message: '用户名不能小于3字', trigger: 'blur' },
    ]);
    const formItemRef = ref();

    const wrapper = mount({
      setup () {
        return () => (
          <Form data={formData}>
            <FormItem field="username" rules={rules.value} ref={formItemRef}>
              <Input v-model={formData.username}></Input>
            </FormItem>
          </Form>
        );
      },
    });

    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(wrapper.find(inputNs.m('error')).exists()).toBe(true);
    expect(document.querySelector(popoverNs.e('content'))?.innerHTML).toContain('用户名不能为空');

    formItemRef.value.clearValidate();
    await wait(500);
    expect(wrapper.find(inputNs.m('error')).exists()).toBe(false);
    expect(document.querySelector(popoverNs.e('content'))).toBeFalsy();

    formData.username = '12';
    await wrapper.find(inputNs.e('inner')).trigger('blur');
    expect(wrapper.find(inputNs.m('error')).exists()).toBe(true);
    expect(document.querySelector(popoverNs.e('content'))?.innerHTML).toContain('用户名不能小于3字');
    expect(wrapper.find(inputNs.e('inner')).element?.value).toBe('12');

    formItemRef.value.resetField();
    await wait(500);
    expect(wrapper.find(inputNs.m('error')).exists()).toBe(false);
    expect(document.querySelector(popoverNs.e('content'))).toBeFalsy();
    expect(wrapper.find(inputNs.e('inner')).element?.value).toBeFalsy();

    wrapper.unmount();
  });
});
