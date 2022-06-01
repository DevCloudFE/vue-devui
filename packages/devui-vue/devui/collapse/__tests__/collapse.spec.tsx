import { mount } from '@vue/test-utils';
import { ref, reactive } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Collapse, CollapseItem } from '../index';

const ns = useNamespace('collapse', true);

const baseClass = ns.b();
const collapseItemClass = ns.e('item');

describe('d-collapse', () => {
  it('collapse render work', () => {
    const value = ref('');
    const items = ['Item1', 'Item2', 'Item3'];
    const options = reactive(items);
    const wrapper = mount({
      setup() {
        return () => (
          <Collapse v-model={value.value}>
            {options.map((item, index) => (
              <CollapseItem title={item} key={index}>
                {item}
              </CollapseItem>
            ))}
          </Collapse>
        );
      },
    });

    expect(wrapper.find(baseClass).exists()).toBeTruthy();
    const collapseItems = wrapper.findAll(collapseItemClass);
    expect(collapseItems.length).toBe(3);
  });
});
