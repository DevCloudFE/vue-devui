import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Steps } from '..';

describe('steps', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('steps init render', async () => {
    wrapper = mount({
      setup() {
        return () => {
          return <Steps />;
        };
      },
    });

    // todo
  });
});
