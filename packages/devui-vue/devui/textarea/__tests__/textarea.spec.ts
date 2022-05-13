import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DTextarea from '../src/textarea';

describe('textarea test', () => {
  it('d-input render work', async () => {
    const wrapper = mount({
      components: { DTextarea },
      template: `
        <d-textarea value="value" :rows="5"/>
      `
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('dtextarea')).toBe('true');
  });

  it('d-input rows work', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        rows: 5
      }
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.element.rows).toBe(5);
  });
});
