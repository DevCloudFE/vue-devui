import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { FixedOverlay } from '../src/fixed-overlay';
import { FlexibleOverlay } from '../src/flexible-overlay';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { wait } from '../../shared/utils';

const fixedOverlayNs = useNamespace('fixed-overlay', true);
const flexibleOverlayNs = useNamespace('flexible-overlay', true);
let origin: HTMLElement;

describe('overlay', () => {
  describe('fixed overlay', () => {
    it('should be created', async () => {
      const visible = ref(false);
      const wrapper = mount({
        setup() {
          return () => <FixedOverlay v-model={visible.value}></FixedOverlay>;
        },
      });

      visible.value = true;
      await wait(100);
      await nextTick();
      const overlay = wrapper.find(fixedOverlayNs.b());
      expect(overlay).toBeTruthy();
      wrapper.unmount();
    });

    it('test close on click overlay', async () => {
      const visible = ref(true);
      const wrapper = mount({
        setup() {
          return () => <FixedOverlay v-model={visible.value}></FixedOverlay>;
        },
      });

      await wait(100);
      await nextTick();
      const overlay = wrapper.find(fixedOverlayNs.b());
      await overlay.trigger('click');
      await wait(100);
      await nextTick();
      expect(visible.value).toBe(false);
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
      const flexibleOverlay = wrapper.find(flexibleOverlayNs.b());
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
      const flexibleOverlay = wrapper.find(flexibleOverlayNs.b());
      expect(flexibleOverlay.find(flexibleOverlayNs.e('arrow')).exists()).toBe(true);
      wrapper.unmount();
    });
  });
});
