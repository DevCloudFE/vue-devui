import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { MultiAutoComplete } from '..';

describe('multi-auto-complete', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('multi-auto-complete init render', async () => {
    wrapper = mount({
      setup() {
        return () => {
          return <MultiAutoComplete />;
        };
      },
    });

    // todo
  });
});
