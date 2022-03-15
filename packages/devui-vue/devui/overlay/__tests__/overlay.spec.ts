import { mount } from '@vue/test-utils';
import { FixedOverlay } from '../src/fixed-overlay';
import { nextTick } from 'vue';
import { FlexibleOverlay } from '../src/flexible-overlay';
import { OriginOrDomRef, Rect, ConnectionPosition } from '../src/overlay-types';

let overlayContianerElement: HTMLElement;
let origin: OriginOrDomRef;

describe('overlay', () => {
  beforeEach(() => {
    const div = document.createElement('div');
    div.id = 'd-overlay-anchor';
    document.body.append(div);
    overlayContianerElement = document.querySelector('#d-overlay-anchor');
  });

  describe('fixed overlay', () => {

    it('should be create', async() => {
      const wrapper = mount(FixedOverlay, {
        props: {
          visible: true
        }
      });
      await nextTick();
      let bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.getAttribute('style')).toBeNull();
      await wrapper.setProps({visible: false});
      await nextTick();
      bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.style.display).toBe('none');
      wrapper.unmount();
    });
    it('test backgroundClass, backgroundStyle, overlayStyle', async() => {
      const wrapper = mount(FixedOverlay, {
        props: {
          visible: true,
          backgroundClass: 'bgColor',
          backgroundStyle: 'width: 100px',
          overlayStyle: 'width: 100%'
        }
      });
      await nextTick();
      const bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('bgColor');
      expect(bgElement.style.width).toBe('100px');
      expect((overlayContianerElement.querySelector('.devui-overlay') as HTMLElement).style.width).toBe('100%');
      wrapper.unmount();
    });
    it('test hasBackdrop', async() => {
      const wrapper = mount(FixedOverlay, {
        props: {
          visible: true,
          hasBackdrop: false
        }
      });
      await nextTick();
      let bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('devui-overlay-background__disabled');
      await wrapper.setProps({hasBackdrop: true});
      await nextTick();
      bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('devui-overlay-background__color');
      wrapper.unmount();
    });
    it('test emit update:visible and onBackdropClick', async() => {
      const wrapper = mount(FixedOverlay, {
        props: {
          visible: true
        }
      });
      await nextTick();
      const bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      const fn = jest.fn();
      await wrapper.setProps({onBackdropClick: fn});
      bgElement.click();
      expect(wrapper.emitted('update:visible').length).toBe(1);
      expect(fn).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('flexible overlay', () => {
    beforeEach(() => {
      origin = {x:100, y: 100, width: 100, height: 100} as Rect;
      // 解决 ResizeObserver is not defined
      global.ResizeObserver = window.ResizeObserver || jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
      }));
    });

    it('should be creat', async() => {
      const wrapper = mount(FlexibleOverlay, {
        props: {
          origin: origin,
          visible: true
        }
      });
      await nextTick();
      let bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.getAttribute('style')).toBeNull();
      await wrapper.setProps({ visible: false });
      await nextTick();
      bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.style.display).toBe('none');
      wrapper.unmount();
    });
    it('test backgroundClass, backgroundStyle', async() => {
      const wrapper = mount(FlexibleOverlay, {
        props: {
          origin: origin,
          visible: true,
          backgroundClass: 'bgColor',
          backgroundStyle: 'width: 100px'
        }
      });
      await nextTick();
      const bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('bgColor');
      expect(bgElement.style.width).toBe('100px');
      wrapper.unmount();
    });
    it('test hasBackdrop', async() => {
      const wrapper = mount(FlexibleOverlay, {
        props: {
          origin: origin,
          visible: true,
          hasBackdrop: false
        }
      });
      await nextTick();
      let bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('devui-overlay-background__disabled');
      await wrapper.setProps({hasBackdrop: true});
      await nextTick();
      bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      expect(bgElement.classList).toContain('devui-overlay-background__color');
      wrapper.unmount();
    });
    it('test emit update:visible and onBackdropClick', async() => {
      const wrapper = mount(FlexibleOverlay, {
        props: {
          origin: origin,
          visible: true
        }
      });
      await nextTick();
      const bgElement = overlayContianerElement.querySelector('.devui-overlay-background') as HTMLElement;
      const fn = jest.fn();
      await wrapper.setProps({onBackdropClick: fn});
      bgElement.click();
      expect(wrapper.emitted('update:visible').length).toBe(1);
      expect(fn).toHaveBeenCalled();
      wrapper.unmount();
    });
    it('test position', async() => {
      const position = {
        originX: 'left',
        originY: 'top',
        overlayX: 'left',
        overlayY: 'top'
      } as ConnectionPosition;
      const wrapper = mount(FlexibleOverlay, {
        props: {
          origin: origin,
          visible: true,
        },
        slots: {
          default: '<div style="width:100px; height: 100px;"></div>'
        }
      });
      await wrapper.setProps({position: position});
      await nextTick();
      let overlayElement = overlayContianerElement.querySelector('.devui-overlay') as HTMLElement;
      expect(overlayElement.style.left).toBe('100px');
      expect(overlayElement.style.top).toBe('100px');
      position.originX = 'center';
      position.originY = 'center';
      await wrapper.setProps({position: Object.assign({}, position)});
      await nextTick();
      overlayElement = overlayContianerElement.querySelector('.devui-overlay') as HTMLElement;
      expect(overlayElement.style.left).toBe('150px');
      expect(overlayElement.style.top).toBe('150px');
      position.originX = 'right';
      position.originY = 'bottom';
      await wrapper.setProps({position: Object.assign({}, position)});
      await nextTick();
      overlayElement = overlayContianerElement.querySelector('.devui-overlay') as HTMLElement;
      expect(overlayElement.style.left).toBe('200px');
      expect(overlayElement.style.top).toBe('200px');
      wrapper.unmount();
    });
  });
});

