import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DAutoComplete from '../src/auto-complete';
//yarn test --testMatch="**/**/auto-complete.spec.(ts|tsx)"
describe('auto-complete', () => {
  it('auto-complete  render correctly', async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
        />
      `,
      setup() {
        const value = ref('')
        const source = [
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
        ]
        return {
          value,
          source,
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    // expect(wrapper.classes()).toContain(['devui-auto-complete', 'devui-form-group', 'devui-has-feedback'])
  })
})
