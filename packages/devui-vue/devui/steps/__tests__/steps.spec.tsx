// import { ComponentPublicInstance } from 'vue';
import { mount } from '@vue/test-utils';
import { Steps } from '..';

describe('steps', () => {
  // let wrapper: VueWrapper<ComponentPublicInstance>;

  it('steps init render', async () => {
    mount({
      setup() {
        return () => {
          return <Steps />;
        };
      },
    });

    // todo
  });
});
