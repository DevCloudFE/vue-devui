import { mount } from '@vue/test-utils';
import { Button, ButtonGroup } from '../index';

describe('button group', () => {
  describe('button group basic', () => {
    const TestComponent = {
      components: {
        'd-button': Button,
        'd-button-group': ButtonGroup,
      },
      template: `
        <d-button-group>
        <d-button disabled>上海</d-button>
        <d-button color='primary' variant='solid'>北京</d-button>
        <d-button disabled>深圳</d-button>
        </d-button-group>
      `,
    };
    const wrapper = mount(TestComponent);

    it('button group demo has created successfully', async () => {
      expect(wrapper).toBeTruthy();
    });

    it('button group should have content', () => {
      const container = wrapper.find('.devui-button');
      expect(container.exists()).toBeTruthy();
    });

    it('size', () => {
      const container = wrapper.find('.devui-button--md');
      expect(container.exists()).toBeTruthy();
    });
  });
});
