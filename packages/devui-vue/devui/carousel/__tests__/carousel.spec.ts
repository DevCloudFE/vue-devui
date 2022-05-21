import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { CarouselItem, Carousel  } from '../index';
import { Button } from '../../button';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('carousel', true);
const button = useNamespace('button', true);

const baseClass = ns.b();
const arrowClass = ns.e('arrow');
const dotsClass = ns.e('dots');

const dotItemClass = '.dot-item';
const arrowLeftClass = '.arrow-left';
const arrowRightClass = '.arrow-right';

const buttonBaseClass = button.b();

const wait = (ms = 100) =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));

describe('d-carousel', () => {
  it('arrowTrigger-never', () => {
    const wrapper = mount(Carousel, {
      props: {
        arrowTrigger: 'never',
        height: '200px',
      },
    });
    expect(wrapper.find(arrowClass).exists()).toBe(false);
  });

  it('arrowTrigger-hover-out', () => {
    const wrapper = mount(Carousel, {
      props: {
        arrowTrigger: 'hover',
        height: '200px',
      },
    });
    expect(wrapper.find(arrowClass).exists()).toBe(false);
  });

  it('arrowTrigger-hover-in', async () => {
    const wrapper = mount(Carousel, {
      props: {
        arrowTrigger: 'hover',
        height: '200px',
      },
    });
    wrapper.find(baseClass).trigger('mouseenter');
    await nextTick();
    expect(wrapper.find(arrowClass).exists()).toBe(true);
  });

  it('arrowTrigger-always', () => {
    const wrapper = mount(Carousel, {
      props: {
        arrowTrigger: 'always',
        height: '200px',
      },
    });
    expect(wrapper.find(arrowClass).exists()).toBe(true);
  });

  it('showDots-false', () => {
    const wrapper = mount(Carousel, {
      props: {
        showDots: false,
        height: '200px',
      },
    });
    expect(wrapper.find(dotsClass).exists()).toBe(false);
  });

  it('showDots-click', async () => {
    const wrapper = mount({
      components: {
        'd-carousel': Carousel,
        'd-carousel-item': CarouselItem,
      },
      template: `
        <d-carousel ref="carousel" height="200px" :activeIndexChange="onChange">
          <d-carousel-item>Page 1</d-carousel-item>
          <d-carousel-item>Page 2</d-carousel-item>
          <d-carousel-item>Page 3</d-carousel-item>
          <d-carousel-item>Page 4</d-carousel-item>
        </d-carousel>
      `,
      setup() {
        const activeIndex = ref(0);

        const onChange = (index: number) => {
          activeIndex.value = index;
        };

        return {
          activeIndex,
          onChange
        };
      }
    });

    await nextTick();
    wrapper.findAll(dotItemClass)[1].trigger('click');
    await nextTick();
    expect(wrapper.vm.activeIndex).toBe(1);
  });

  it('showDots-enter', async () => {
    const wrapper = mount({
      components: {
        'd-carousel': Carousel,
        'd-carousel-item': CarouselItem,
      },
      template: `
        <d-carousel ref="carousel" height="200px" :activeIndexChange="onChange" dotTrigger="hover">
          <d-carousel-item>Page 1</d-carousel-item>
          <d-carousel-item>Page 2</d-carousel-item>
          <d-carousel-item>Page 3</d-carousel-item>
          <d-carousel-item>Page 4</d-carousel-item>
        </d-carousel>
      `,
      setup() {
        const activeIndex = ref(0);

        const onChange = (index: number) => {
          activeIndex.value = index;
        };

        return {
          activeIndex,
          onChange
        };
      }
    });
    await nextTick();
    wrapper.findAll(dotItemClass)[1].trigger('mouseenter');
    await nextTick();
    expect(wrapper.vm.activeIndex).toBe(1);
  });

  it('operate', async () => {
    const wrapper = mount({
      components: {
        'd-carousel': Carousel,
        'd-carousel-item': CarouselItem,
        'd-button': Button,
      },
      template: `
        <d-carousel ref="carousel" height="200px" arrowTrigger="always" :activeIndexChange="onChange">
          <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
        </d-carousel>
        <div class="carousel-demo-operate">
          <d-button bsStyle="common" :onClick="onPrev">上一张</d-button>
          <d-button bsStyle="primary" :onClick="onNext">下一张</d-button>
          <d-button bsStyle="common" :onClick="onGoFirst">第一张</d-button>
        </div>
      `,
      setup() {
        const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
        const activeIndex = ref(0);

        const carousel = ref();

        const onPrev = () => {
          carousel.value?.prev?.();
        };
        const onNext = () => {
          carousel.value?.next?.();
        };
        const onGoFirst = () => {
          carousel.value?.goto?.(0);
        };
        const onChange = (index: number) => {
          activeIndex.value = index;
        };

        return {
          activeIndex,
          items,

          carousel,
          onPrev,
          onNext,
          onGoFirst,
          onChange,
        };
      }
    });

    await nextTick();
    wrapper.find(arrowLeftClass).trigger('click');
    await nextTick();
    expect(wrapper.vm.activeIndex).toBe(3);
    wrapper.find(arrowRightClass).trigger('click');
    await nextTick();
    expect(wrapper.vm.activeIndex).toBe(0);

    wrapper.findAll(buttonBaseClass)[0].trigger('click');
    await nextTick();
    wrapper.findAll(buttonBaseClass)[0].trigger('click');
    await nextTick();
    expect(wrapper.vm.activeIndex).toBe(2);

    wrapper.findAll(buttonBaseClass)[1].trigger('click');
    await nextTick();
    expect(wrapper.vm.activeIndex).toBe(3);

    wrapper.findAll(buttonBaseClass)[2].trigger('click');
    await nextTick();
    expect(wrapper.vm.activeIndex).toBe(0);
  });

  it('autoplay', async () => {
    const wrapper = mount({
      components: {
        'd-carousel': Carousel,
        'd-carousel-item': CarouselItem,
      },
      template: `
        <d-carousel ref="carousel" height="200px" :activeIndexChange="onChange" autoplay :autoplaySpeed="3000">
          <d-carousel-item>Page 1</d-carousel-item>
          <d-carousel-item>Page 2</d-carousel-item>
          <d-carousel-item>Page 3</d-carousel-item>
          <d-carousel-item>Page 4</d-carousel-item>
        </d-carousel>
      `,
      setup() {
        const activeIndex = ref(2);

        const onChange = (index: number) => {
          activeIndex.value = index;
        };

        return {
          activeIndex,
          onChange
        };
      }
    });

    await wait(4500);
    expect(wrapper.vm.activeIndex).toBe(1);
    await wait(4600);
    expect(wrapper.vm.activeIndex).toBe(3);
  }, 10000);
});
