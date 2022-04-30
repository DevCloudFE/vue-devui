import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DRate from '../src/rate';

describe('rate', () => {
  describe('rate basic', () => {
    const TestComponent = {
      components: {
        'd-rate': DRate,
      },
      template: `
        <div>
          <d-rate v-model="value" icon="star-o" />
        </div>
      `,
      setup() {
        const value = ref(0);

        return {
          value,
        };
      },
    };
    const wrapper = mount(TestComponent);
    it('Rate demo has created successfully', async () => {
      expect(wrapper).toBeTruthy();
    });

    it('Rate should have content', () => {
      const container = wrapper.find('.devui-star-container');
      expect(container.exists()).toBeTruthy();
    });

    it('Rate is color attributes should have content', async () => {
      const _wrapper = mount(DRate, {
        props: { modelValue: 2 },
      });

      await nextTick();
      expect(_wrapper.find('.devui-star-color-').exists()).toBeTruthy();

      await _wrapper.setProps({ color: 'red' });
      expect(_wrapper.find('.devui-star-color-customize').exists()).toBeTruthy();
    });
  });

  describe('rate change', () => {
    it('Rate can be changed', async () => {
      const wrapper = mount({
        components: {
          'd-rate': DRate,
        },
        template: `
            <div>
              <d-rate v-model="value" icon="star-o" />
              <div class="count">当前有{{ value }}颗星</div>
            </div>
          `,
        setup() {
          const value = ref(0);

          return {
            value,
          };
        },
      });
      await nextTick();

      const starEles = wrapper.findAll('.devui-star-align');

      const container = wrapper.find('.devui-star-container');
      const firstStarEle = starEles[0];
      const thirdStarEle = starEles[2];
      const fourthStarEle = starEles[3];

      expect(starEles.length).toBe(5);

      await fourthStarEle.trigger('mouseover');

      expect(
        fourthStarEle.find('.devui-star-color-active').attributes('style')
      ).toBe('width: 100%;');

      await container.trigger('mouseleave');
      expect(
        fourthStarEle.find('.devui-star-color-active').attributes('style')
      ).toBe('width: 0px;');
      expect(wrapper.find('.count').html()).toContain('0');

      await firstStarEle.trigger('click');

      expect(wrapper.find('.count').html()).toContain('1');

      await thirdStarEle.trigger('click');
      expect(wrapper.find('.count').html()).toContain('3');

      await container.trigger('mouseleave');
      expect(
        fourthStarEle.find('.devui-star-color-active').attributes('style')
      ).toBe('width: 0px;');
      expect(wrapper.find('.count').html()).toContain('3');
    });
  });

  describe('read only', () => {
    const TestComponent = {
      components: {
        'd-rate': DRate,
      },
      template: `
        <div>
          <d-rate v-model="value" icon="star-o" :read="true"/>
          <div class="count">当前有{{ value }}颗星</div>
        </div>
      `,
      setup() {
        const value = ref(3);

        return {
          value,
        };
      },
    };
    const wrapper = mount(TestComponent);

    it('Rate should have content', async () => {
      expect(wrapper.find('.devui-star-container').exists()).toBeTruthy();
    });

    it('Rate should not be changed', async () => {
      const starEles = wrapper.findAll('.devui-star-align');

      const firstStarEle = starEles[0];
      const thirdStarEle = starEles[2];
      const fourthStarEle = starEles[3];

      await firstStarEle.trigger('click');
      expect(wrapper.find('.count').html()).toContain('3');

      await thirdStarEle.trigger('click');
      expect(wrapper.find('.count').html()).toContain('3');

      await fourthStarEle.trigger('click');
      expect(wrapper.find('.count').html()).toContain('3');
    });
  });
});
