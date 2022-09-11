import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DInput from '../src/input';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('input');
const dotNs = useNamespace('input', true);
const slotNs = useNamespace('input-slot');
const dotSlotNs = useNamespace('input-slot', true);

const innerClass = ns.e('inner');
const smClass = ns.m('sm');
const lgClass = ns.m('lg');
const slotClass = slotNs.b();
const prependClass = ns.m('prepend');
const appendClass = ns.m('append');
const dotErrorClass = dotNs.m('error');
const dotSlotPrefixClass = dotSlotNs.e('prefix');
const dotSlotSuffixClass = dotSlotNs.e('suffix');
const dotSlotPrependClass = dotSlotNs.e('prepend');
const dotSlotAppendClass = dotSlotNs.e('append');
const dotNsClearIconClass = dotNs.em('clear', 'icon');

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

describe('d-input', () => {
  it('d-input render work', async () => {
    const value = ref('abc');
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input v-model="value" />
      `,
      setup() {
        return {
          value,
        };
      },
    });
    const input = wrapper.find('input');
    expect(input.classes()).toContain(innerClass);
    expect(input.element.value).toBe('abc');

    await input.setValue('def');
    expect(value.value).toBe('def');

    value.value = 'thx';
    await nextTick();
    expect(input.element.value).toBe('thx');
  });

  it('d-input bindEvents work', async () => {
    const onChange = jest.fn(),
      onFocus = jest.fn(),
      onBlur = jest.fn(),
      onKeydown = jest.fn(),
      onInput = jest.fn();
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeydown"
          @input="onInput" />
      `,
      setup() {
        return {
          onChange,
          onFocus,
          onBlur,
          onKeydown,
          onInput,
        };
      },
    });
    const input = wrapper.find('input');

    await input.trigger('change');
    expect(onChange).toBeCalledTimes(1);

    await input.trigger('focus');
    expect(onFocus).toBeCalledTimes(1);

    await input.trigger('blur');
    expect(onBlur).toBeCalledTimes(1);

    await input.trigger('keydown');
    expect(onKeydown).toBeCalledTimes(1);

    await input.trigger('input');
    expect(onInput).toBeCalledTimes(1);
  });

  it('d-input disabled work', async () => {
    const wrapper = mount(DInput, {
      props: {
        disabled: false,
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBe(undefined);

    await wrapper.setProps({
      disabled: true,
    });
    expect(input.attributes('disabled')).toBe('');
  });

  it('d-input error work', async () => {
    const wrapper = mount(DInput, {
      props: {
        error: false,
      },
    });
    const noError = wrapper.find(dotErrorClass);
    expect(noError.exists()).toBe(false);

    await wrapper.setProps({
      error: true,
    });
    const error = wrapper.find(dotErrorClass);
    expect(error.exists()).toBe(true);
  });

  it('d-input size work', async () => {
    const wrapper = mount(DInput);
    expect(wrapper.classes()).not.toContain(smClass);
    expect(wrapper.classes()).not.toContain(lgClass);

    await wrapper.setProps({
      size: 'sm',
    });
    expect(wrapper.classes()).toContain(smClass);
    expect(wrapper.classes()).not.toContain(lgClass);

    await wrapper.setProps({
      size: 'lg',
    });
    expect(wrapper.classes()).not.toContain(smClass);
    expect(wrapper.classes()).toContain(lgClass);
  });

  it('d-input Method:select/focus/blur work', async () => {
    const testValue = ref('abc');
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input ref="inputDemo" v-model="testValue" />
      `,
      setup() {
        return {
          testValue,
        };
      },
    });

    const input = wrapper.find('input').element;
    input.selectionEnd = 0;
    (wrapper.vm.$refs.inputDemo as HTMLInputElement).select();
    await nextTick();
    expect(input.selectionEnd).toBe(input.value.length);

    // TODO focus/blur
    // 调用DOM的focus和select并不会给节点的div加上devui-input--focus
  });

  it.todo('d-input validate-event work');

  it('d-input prefix/suffix props work', async () => {
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input prefix="like" suffix="search" />
      `,
    });
    const icon = wrapper.find('.icon');
    const prefix = wrapper.find(dotSlotPrefixClass);
    const suffix = wrapper.find(dotSlotSuffixClass);
    expect(icon.exists()).toBe(true);
    expect(prefix.exists()).toBe(true);
    expect(suffix.exists()).toBe(true);
  });

  it('d-input prefix/suffix/prepend/append slot work', async () => {
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input>
          <template #prepend>
            <d-button icon="like">测试</d-button>
          </template>
          <template #prefix>
            <d-icon name="search" />
          </template>
          <template #suffix>
            <d-icon name="search" />
          </template>
          <template #append>
            <d-icon name="like" />
          </template>
        </d-input>
      `,
    });

    expect(wrapper.classes()).toContain(slotClass);
    expect(wrapper.classes()).toContain(appendClass);
    expect(wrapper.classes()).toContain(prependClass);

    const likeIcon = wrapper.find('.icon-like');
    const searchIcon = wrapper.find('.icon-search');
    const prefix = wrapper.find(dotSlotPrefixClass);
    const suffix = wrapper.find(dotSlotSuffixClass);
    const prepend = wrapper.find(dotSlotPrependClass);
    const append = wrapper.find(dotSlotAppendClass);
    expect(likeIcon.exists()).toBe(true);
    expect(searchIcon.exists()).toBe(true);
    expect(prefix.exists()).toBe(true);
    expect(suffix.exists()).toBe(true);
    expect(prepend.exists()).toBe(true);
    expect(append.exists()).toBe(true);
  });

  it('d-input showPassword work', async () => {
    const wrapper = mount(DInput, {
      props: {
        showPassword: false,
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('text');
    wrapper.setProps({
      showPassword: true,
    });
    await nextTick();
    expect(input.attributes('type')).toBe('password');
  });

  it('d-input clearable/clear work', async () => {
    const onClear = jest.fn();
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input @clear="onTrigger" clearable v-model="value" />
      `,
      setup() {
        const value = ref('hello wolrd');
        const onTrigger = () => {
          value.value = '';
          onClear();
        };
        return {
          onTrigger,
          value,
        };
      },
    });
    expect(wrapper.find(dotNsClearIconClass).exists()).toBe(true);
    const iTag = wrapper.find('i');
    await iTag.trigger('click');
    expect(onClear).toBeCalledTimes(1);
  });
});
