import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DAutoComplete from '../src/auto-complete';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { wait } from '../../shared/utils';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('auto-complete', true);
const noDotNs = useNamespace('auto-complete');
const dotInputNs = useNamespace('auto-complete-input', true);
const dropdownNS = useNamespace('dropdown', true);
const selectNS = useNamespace('select', true);

const baseClass = ns.b();
const unstyledClass = ns.e('list') + '-unstyled';
const tipsClass = ns.e('popup') + '-tips';

const dropdownItemClass = dropdownNS.b() + '-item';
const dropdownMenuClass = dropdownNS.b() + '-menu';

const selectOpenClass = selectNS.b() + '-open';

const dotInputPrefixClass = dotInputNs.e('prefix');
const dotInputSuffixClass = dotInputNs.e('suffix');

const dotSlotClass = ns.b() + '-slot';
const dotAppendClass = ns.m('append');
const dotPrependClass = ns.m('prepend');
const dotInputPrependClass = dotInputNs.e('prepend');
const dotInputAppendClass = dotInputNs.e('append');
const dotNsClearIconClass = ns.em('clear', 'icon');

const smClass = noDotNs.m('sm');
const lgClass = noDotNs.m('lg');

describe('auto-complete', () => {
  it('init render & KeyboardEvent ', async () => {
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
          :width="450"
        />
      `,
      setup() {
        const value = ref('');
        const source = ['C#', 'C', 'C++', 'CPython', 'CoffeeScript'];
        return {
          value,
          source,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
    await input.trigger('click');
    await nextTick();
    expect(wrapper.find(selectOpenClass).exists()).toBe(true);
    expect(wrapper.find(dropdownItemClass).exists()).toBe(false);
    expect(wrapper.find(baseClass).attributes('style')).toContain('width: 450px');
    await input.setValue('c');
    await nextTick();
    expect(wrapper.find(dropdownMenuClass).exists()).toBe(true);
    await wait(300);
    await nextTick();
    expect(wrapper.find(unstyledClass).element.childElementCount).toBe(5);
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await nextTick();
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await nextTick();
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await nextTick();
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await nextTick();
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await nextTick();
    expect(wrapper.vm.value).toBe('C++');
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await nextTick();
    expect(wrapper.find(selectOpenClass).exists()).toBe(false);
  });

  it('disabled ', async () => {
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <div>
          <d-auto-complete
            :source="source"
            v-model="value"
            :disabled="isDisabled"
          />
          <button @click="toggle">{{ isDisabled ? 'Enable AutoComplete' : 'Disable AutoComplete' }}</button>
        </div>
      `,
      setup() {
        const value = ref('');
        const isDisabled = ref(false);
        const source = ['C#', 'C', 'C++', 'CPython', 'CoffeeScript'];
        function toggle() {
          isDisabled.value = !isDisabled.value;
        }
        return {
          value,
          source,
          isDisabled,
          toggle,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    const button = wrapper.find('button');
    expect(input.element.value).toBe('');
    expect(button.element.innerHTML).toBe('Disable AutoComplete');
    await input.trigger('click');
    await nextTick();
    await input.setValue('c');
    await nextTick();
    await wait(300);
    await nextTick();
    expect(wrapper.find('ul .selected').exists()).toBe(true);
    const li = wrapper.find('ul .selected');
    li.trigger('click');
    await nextTick();
    expect(wrapper.vm.value).toBe('C#');
    expect(wrapper.find(selectOpenClass).exists()).toBe(false);
    button.trigger('click');
    await nextTick();
    expect(button.element.innerHTML).toBe('Enable AutoComplete');
    expect(input.element.disabled).toBe(true);
  });

  it('Customized data matching method ', async () => {
    type ItemType = {
      label: string;
      disabled: boolean;
    };
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          v-model="value"
          :searchFn="searchFn"
          disabledKey="disabled"
          isSearching
          :formatter="formatter"
        >
          <template #searching="slotProps" >
            <div id="devui-is-searching-template">
                {{slotProps}}
            </div>
          </template>
        </d-auto-complete>
      `,
      setup() {
        const value = ref('');
        const mySource = ref([
          {
            label: 'C#',
            disabled: false,
          },
          {
            label: 'C++',
            disabled: false,
          },
          {
            label: 'CPython',
            disabled: false,
          },
          {
            label: 'Java',
            disabled: false,
          },
          {
            label: 'JavaScript',
            disabled: false,
          },
          {
            label: 'Go',
            disabled: false,
          },
          {
            label: 'Ruby',
            disabled: false,
          },
          {
            label: 'F#',
            disabled: false,
          },
          {
            label: 'TypeScript',
            disabled: false,
          },
          {
            label: 'SQL',
            disabled: true,
          },
          {
            label: 'LiveScript',
            disabled: false,
          },
          {
            label: 'CoffeeScript',
            disabled: false,
          },
        ]);
        const formatter = (item: ItemType) => {
          return item.label;
        };
        // trem：input输入内容
        const searchFn = async (trem: string) => {
          const arr: ItemType[] = [];
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(1);
            }, 500);
          });
          mySource.value.forEach((item) => {
            let cur = item.label;
            cur = cur.toLowerCase();
            if (cur.startsWith(trem)) {
              arr.push(item);
            }
          });
          return arr;
        };
        return {
          value,
          searchFn,
          formatter,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
    await input.trigger('click');
    await nextTick();
    expect(wrapper.find(selectOpenClass).exists()).toBe(true);
    await input.setValue('c');
    await nextTick();
    await wait(300);
    expect(wrapper.find('#devui-is-searching-template').exists()).toBe(true);
    expect(wrapper.find('#devui-is-searching-template').element.innerHTML).toBe('c');
    await wait(500);
    await nextTick();
    expect(wrapper.find(unstyledClass).element.childElementCount).toBe(4);
    await input.setValue('s');
    await nextTick();
    await wait(300);
    await nextTick();
    await wait(500);
    expect(wrapper.find('li.disabled').exists()).toBe(true);
    expect(wrapper.find('li.disabled').element.innerHTML).toBe('SQL');
  });

  it('Customized template display', async () => {
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
        >
          <template #item="slotProps" >
            <div>
              第{{slotProps.index}}项: {{slotProps.item}}
            </div>
          </template>
          <template #nothing="slotProps" >
            <div id="noResultItemTemplate">
                {{slotProps}}
            </div>
          </template>
        </d-auto-complete>
      `,
      setup() {
        const value = ref('');
        const source = ref([
          'C#',
          'C',
          'C++',
          'CPython',
          'Java',
          'JavaScript',
          'Go',
          'Python',
          'Ruby',
          'F#',
          'TypeScript',
          'SQL',
          'LiveScript',
          'CoffeeScript',
        ]);

        return {
          value,
          source,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
    await input.trigger('click');
    await nextTick();
    expect(wrapper.find(selectOpenClass).exists()).toBe(true);
    await input.setValue('c');
    await nextTick();
    await wait(300);
    expect(wrapper.find(unstyledClass).exists()).toBe(true);
    expect(wrapper.find(unstyledClass).element.childElementCount).toBe(5);
    expect(wrapper.find('.selected div').element.innerHTML).toBe(' 第0项: C#');
    await input.setValue('cc');
    await nextTick();
    await wait(300);
    await nextTick();
    expect(wrapper.find('#noResultItemTemplate').exists()).toBe(true);
    expect(wrapper.find('#noResultItemTemplate').element.innerHTML).toBe('cc');
  });

  it('selectValue & transInputFocusEmit ', async () => {
    const transInputFocusEmitCB = jest.fn();
    const selectValueCB = jest.fn();
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
          :delay="300"
          :transInputFocusEmit="transInputFocusEmit"
          :selectValue="selectValue"
        />
      `,
      setup() {
        const value = ref('');
        const source = ['C#', 'C', 'C++', 'CPython', 'CoffeeScript'];
        const selectValue = (e: Event) => {
          selectValueCB(e);
        };
        const transInputFocusEmit = (e: Event) => {
          transInputFocusEmitCB(e);
        };
        return {
          value,
          source,
          selectValue,
          transInputFocusEmit,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
    await input.trigger('focus');
    await nextTick();
    await input.setValue('c');
    await nextTick();
    await wait(300);
    await nextTick();
    expect(transInputFocusEmitCB).toHaveBeenCalledTimes(1);
    const li = wrapper.find('ul .selected');
    li.trigger('click');
    await nextTick();
    expect(selectValueCB).toHaveBeenCalledTimes(1);
  });

  it('allowEmptyValueSearch ', async () => {
    const div = document.createElement('div');
    div.id = 'app';
    document.body.appendChild(div);
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
          :allow-empty-value-search="allowEmptyValueSearch"
        />
      `,
      setup() {
        const value = ref('');
        const allowEmptyValueSearch = ref(true);
        const source = ['C#', 'C', 'C++', 'CPython', 'CoffeeScript'];

        return {
          value,
          source,
          allowEmptyValueSearch,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
    await input.trigger('focus');
    await nextTick();
    await input.setValue('');
    await wait(300);
    await nextTick();
    expect(wrapper.find('ul').element.childElementCount).toBe(5);
  });

  it('appendToBody & position', async () => {
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
          :append-to-body="appendToBody"
          :position="position"
        />
      `,
      setup() {
        const value = ref('');
        const appendToBody = ref(true);
        const source = ['CC#', 'C', 'C++', 'CPython', 'CoffeeScript'];
        const position = ref(['bottom']);
        return {
          value,
          source,
          appendToBody,
          position,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
    await input.trigger('focus');
    await nextTick();
    await input.setValue('c');
    await nextTick();
    await wait(300);
    await nextTick();
    expect(wrapper.find(selectOpenClass).exists()).toBe(true);
    const ul = document.querySelector(unstyledClass);
    let lis = 0;
    if (ul && ul.getElementsByTagName('li')) {
      lis = ul.getElementsByTagName('li').length;
    }
    expect(lis).toBe(5);
    const li_ed = document.querySelector('.selected');
    let li_text = '';
    if (li_ed && li_ed.getElementsByTagName('li')) {
      li_text = li_ed.innerHTML;
    }
    expect(li_text).toBe('CC#');
  });

  it('latestSource', async () => {
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <div>
          <d-auto-complete
            :source="source"
            v-model="value"
            :latestSource="latestSource"
          />
        </div>
      `,
      setup() {
        const value = ref('');
        const latestSource = ref(['JavaScript', 'TypeScript']);
        const source = ref(['C#', 'C', 'C++', 'Java', 'JavaScript']);

        return {
          value,
          source,
          latestSource,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
    await input.trigger('click');
    await nextTick();
    expect(wrapper.find(tipsClass).exists()).toBe(true);
    await input.setValue('j');
    await wait(300);
    await nextTick();
    const li = wrapper.find('ul .selected');
    li.trigger('click');
    await nextTick();
    expect(wrapper.vm.value).toBe('Java');
  });

  it('enableLazyLoad', async () => {
    const wrapper = mount({
      components: { 'd-auto-complete': DAutoComplete },
      template: `
        <div>
          <d-auto-complete
            ref="autoCompleteRef"
            :source="source"
            v-model="value"
            enableLazyLoad
            :load-more="loadMore"
          />
        </div>
      `,
      setup() {
        const value = ref('');
        const source = ref([
          'C#',
          'C',
          'C++',
          'CPython',
          'Java',
          'JavaScript',
          'Go',
          'Python',
          'Ruby',
          'F#',
          'TypeScript',
          'SQL',
          'LiveScript',
          'CoffeeScript',
          'C1',
          'C2',
          'C3',
          'C4',
          'C5',
          'C6',
          'C7',
        ]);
        const autoCompleteRef = ref(null);

        const loadMore = () => {
          setTimeout(() => {
            source.value.push('lazyData' + source.value.length);
            const _value = autoCompleteRef.value as (HTMLElement & { loadFinish: () => void }) | null;
            _value?.loadFinish();
          }, 3000);
        };
        return {
          value,
          source,
          loadMore,
          autoCompleteRef,
        };
      },
    });
    expect(wrapper.find(baseClass).exists()).toBe(true);
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
    await input.trigger('click');
    await input.setValue('c');
    await nextTick();
    expect(wrapper.find(dropdownMenuClass).exists()).toBe(true);
    await wait(300);
    await nextTick();
    expect(wrapper.find(dropdownItemClass).exists()).toBe(true);
    const ul = wrapper.find(unstyledClass);
    const makeScroll = async (dom: Element, name: 'scrollTop', offset: number) => {
      const eventTarget = dom === document.documentElement ? window : dom;
      dom[name] = offset;
      const evt = new CustomEvent('scroll', {
        detail: {
          target: {
            [name]: offset,
          },
        },
      });
      eventTarget.dispatchEvent(evt);
      return await wait(3000);
    };
    await makeScroll(ul.element, 'scrollTop', 500);
    await nextTick();
    expect(wrapper.vm.value).toBe('c');
    await nextTick();
    await input.setValue('');
    const length = wrapper.vm.source.length;
    expect(wrapper.vm.source[length - 1]).toBe('lazyData21');
    await input.setValue('la');
    await wait(300);
    await nextTick();
    expect(wrapper.find(dropdownItemClass).element.innerHTML).toBe('lazyData21');
  });

  it('d-auto-complete prefix/suffix props work', async () => {
    const wrapper = mount({
      components: { DAutoComplete },
      template: `
        <d-auto-complete prefix="like" suffix="search" />
      `,
    });
    const icon = wrapper.find('.icon');
    const prefix = wrapper.find(dotInputPrefixClass);
    const suffix = wrapper.find(dotInputSuffixClass);
    expect(icon.exists()).toBe(true);
    expect(prefix.exists()).toBe(true);
    expect(suffix.exists()).toBe(true);
  });

  it('d-auto-complete prefix/suffix/prepend/append slot work', async () => {
    const wrapper = mount({
      components: { DAutoComplete },
      template: `
        <d-auto-complete>
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
        </d-auto-complete>
      `,
    });

    expect(wrapper.find(dotSlotClass).exists()).toBe(true);
    expect(wrapper.find(dotAppendClass).exists()).toBe(true);
    expect(wrapper.find(dotPrependClass).exists()).toBe(true);

    const likeIcon = wrapper.find('.icon-like');
    const searchIcon = wrapper.find('.icon-search');
    const prefix = wrapper.find(dotInputPrefixClass);
    const suffix = wrapper.find(dotInputSuffixClass);
    const prepend = wrapper.find(dotInputPrependClass);
    const append = wrapper.find(dotInputAppendClass);
    expect(likeIcon.exists()).toBe(true);
    expect(searchIcon.exists()).toBe(true);
    expect(prefix.exists()).toBe(true);
    expect(suffix.exists()).toBe(true);
    expect(prepend.exists()).toBe(true);
    expect(append.exists()).toBe(true);
  });

  it('d-auto-complete clearable/clear work', async () => {
    const onClear = jest.fn();
    const wrapper = mount({
      components: { DAutoComplete },
      template: `
        <d-auto-complete @clear="onClear" clearable/>
      `,
      setup() {
        return {
          onClear,
        };
      },
    });
    expect(wrapper.find(dotNsClearIconClass).exists()).toBe(true);
    const i = wrapper.find('i');
    await i.trigger('click');
    expect(onClear).toBeCalledTimes(1);
  });

  it('d-auto-complete size work', async () => {
    const wrapper = mount(DAutoComplete);
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

  it('d-auto-complete bindEvents work', async () => {
    const onInput = jest.fn(),
      onBlur = jest.fn(),
      onKeyUp = jest.fn();
    const wrapper = mount({
      components: { DAutoComplete },
      template: `
        <d-auto-complete
          @input="onInput"
          @blur="onBlur"
          @keyup="onKeyUp" />
      `,
      setup() {
        return {
          onInput,
          onBlur,
          onKeyUp,
        };
      },
    });
    const input = wrapper.find('input');

    await input.trigger('input');
    expect(onInput).toBeCalledTimes(1);

    await input.trigger('blur');
    expect(onBlur).toBeCalledTimes(1);

    await input.trigger('keyup');
    expect(onKeyUp).toBeCalledTimes(1);
  });
});
