import { reactive, ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import EditableSelect from '../src/editable-select';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { wait } from '../../shared/utils';

const ns = useNamespace('editable-select', true);
const inputClasses = useNamespace('editable-select-input', true);

const createData = (len = 5) => {
  return reactive(
    Array.from({ length: len }).map((_, index) => {
      return {
        label: `Option${index}`,
        value: index,
      };
    })
  );
};

describe('Event EditableSelect', () => {
  it('visible event', async () => {
    const visibleChange = jest.fn();
    const wrapper = mount({
      setup() {
        const value = ref(4);
        const data = createData();
        return () => {
          return <EditableSelect v-model={value.value} options={data} onVisibleChange={visibleChange} />;
        };
      },
    });
    await nextTick();
    await wrapper.trigger('click');

    expect(visibleChange).toBeCalled();
    wrapper.unmount();
  });
  it('event focus & blur ', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const wrapper = mount({
      setup() {
        const value = ref(4);
        const data = createData();
        return () => {
          return <EditableSelect v-model={value.value} options={data} onFocus={handleFocus} onBlur={handleBlur} />;
        };
      },
    });

    await nextTick();
    await wrapper.trigger('click');
    const input = wrapper.find(inputClasses.e('inner'));
    await input.trigger('focus');
    expect(handleFocus).toHaveBeenCalled();
    await input.trigger('blur');
    expect(handleBlur).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('load more event', async () => {
    const loadMore = jest.fn();
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
    };

    const wrapper = mount({
      setup() {
        const value = ref(4);
        const data = createData(20);
        return () => {
          return <EditableSelect v-model={value.value} options={data} enable-lazy-load onLoadMore={loadMore} max-height={300} />;
        };
      },
    });
    await nextTick();
    await wrapper.trigger('click');

    const ul = wrapper.find(ns.e('inner'));
    await makeScroll(ul.element, 'scrollTop', 300);
    await wait(300);

    expect(loadMore).toBeCalled();
    wrapper.unmount();
  });
});
