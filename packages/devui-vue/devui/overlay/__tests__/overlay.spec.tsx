import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { FixedOverlay } from '../src/fixed-overlay';
import { FlexibleOverlay } from '../src/flexible-overlay';

let overlayContainerElement: HTMLElement | null;
let origin: HTMLElement;

describe('overlay', () => {
  beforeEach(() => {
    const div = document.createElement('div');
    div.id = 'd-overlay-anchor';
    document.body.append(div);
    overlayContainerElement = document.querySelector('#d-overlay-anchor');
  });

  describe('fixed overlay', () => {
    it('should be created', async () => {
      const wrapper = mount(FixedOverlay, {
        props: {
          visible: true,
        },
      });
      await nextTick();
      let bgElement = overlayContainerElement?.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.getAttribute('style')).toBeNull();
      await wrapper.setProps({ visible: false });
      await nextTick();
      bgElement = overlayContainerElement?.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement).toBeFalsy();
      wrapper.unmount();
    });
    it('test backgroundClass, backgroundStyle, overlayStyle', async () => {
      const wrapper = mount(FixedOverlay, {
        props: {
          visible: true,
          backgroundClass: 'bgColor',
          backgroundStyle: 'width: 100px',
          overlayStyle: 'width: 100%',
        },
      });
      await nextTick();
      const bgElement = overlayContainerElement?.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('bgColor');
      expect(bgElement.style.width).toBe('100px');
      expect((overlayContainerElement?.querySelector('.devui-overlay') as HTMLElement).style.width).toBe('100%');
      wrapper.unmount();
    });
    it('test hasBackdrop', async () => {
      const wrapper = mount(FixedOverlay, {
        props: {
          visible: true,
          hasBackdrop: false,
        },
      });
      await nextTick();
      let bgElement = overlayContainerElement?.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('devui-overlay-background__disabled');
      await wrapper.setProps({ hasBackdrop: true });
      await nextTick();
      bgElement = overlayContainerElement?.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('devui-overlay-background__color');
      wrapper.unmount();
    });
    it('test emit update:visible and onBackdropClick', async () => {
      const wrapper = mount(FixedOverlay, {
        props: {
          visible: true,
        },
      });
      await nextTick();
      const bgElement = overlayContainerElement?.querySelector('.devui-overlay-background') as HTMLElement;
      const fn = jest.fn();
      await wrapper.setProps({ onBackdropClick: fn });
      bgElement.click();
      expect(wrapper.emitted('update:visible').length).toBe(1);
      expect(fn).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('flexible overlay', () => {
    beforeEach(() => {
      const div = document.createElement('div');
      div.style.width = '100px';
      div.style.height = '100px';
      document.body.appendChild(div);
      origin = div;
    });
    afterEach(() => {
      origin && document.body.removeChild(origin);
    });

    it('render correctly', () => {
      const visible = ref(true);
      const wrapper = mount({
        setup() {
          return () => (
            <FlexibleOverlay v-model={visible.value} origin={origin}>
              hello world
            </FlexibleOverlay>
          );
        },
      });
      const flexibleOverlay = wrapper.find('.devui-flexible-overlay');
      expect(flexibleOverlay.exists()).toBe(true);
      wrapper.unmount();
    });

    it('show arrow', () => {
      const visible = ref(true);
      const wrapper = mount({
        setup() {
          return () => (
            <FlexibleOverlay v-model={visible.value} origin={origin} show-arrow>
              hello world
            </FlexibleOverlay>
          );
        },
      });
      const flexibleOverlay = wrapper.find('.devui-flexible-overlay');
      expect(flexibleOverlay.find('.devui-flexible-overlay-arrow').exists()).toBe(true);
      wrapper.unmount();
    });
  });
});
