import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { wait } from '../../shared/utils/wait';
import Drawer from '../src/drawer';

const drawerNs = useNamespace('drawer', true);
const noDotDrawerNs = useNamespace('drawer');
const baseClasses = drawerNs.b();

const getEl = (selector: string) => document.body.querySelector(selector);
const getDrawer = () => getEl(baseClasses);
const getOverlay = () => getEl(drawerNs.e('overlay'));

describe('d-drawer', () => {
  // html dom, overlay
  it('drawer basic render and show overlay', async () => {
    const wrapper = mount({
      props: {
        showOverlay: {
          type: Boolean,
          default: true,
        },
      },
      setup(props) {
        return () => (
          <Drawer modelValue showOverlay={props.showOverlay}>
            default innerHTML
          </Drawer>
        );
      },
    });

    const drawer = getDrawer();
    let overlay = getOverlay();

    expect(drawer).toBeTruthy();
    expect(drawer?.className).toContain(noDotDrawerNs.m('right'));
    expect(drawer?.innerHTML).toEqual('default innerHTML');

    expect(overlay).toBeTruthy();
    await wrapper.setProps({ showOverlay: false });
    await nextTick();
    overlay = getOverlay();
    expect(overlay).toBeFalsy();

    wrapper.unmount();
  });

  // button control visible
  // click outside(document click)
  // close onClickOverlay
  // Esc key event
  it('handle drawer visible with native events', async () => {
    const visible = ref(false);
    const wrapper = mount({
      setup() {
        const toggle = () => (visible.value = !visible.value);
        return () => (
          <>
            <button onClick={toggle}>toggle</button>
            <Drawer v-model={visible.value} closeOnClickOverlay />
          </>
        );
      },
    });

    let drawer = getDrawer();
    const button = wrapper.find('button');

    expect(button).toBeTruthy();
    expect(drawer).toBeFalsy();

    // button click to trigger v-model value
    await button.trigger('click');
    drawer = getDrawer();
    expect(drawer).toBeTruthy();

    // click outside
    await wait(0);
    document.dispatchEvent(new Event('click', { bubbles: true }));
    await nextTick();
    drawer = getDrawer();
    expect(drawer).toBeFalsy();

    // close on click overlay
    visible.value = true;
    await nextTick();
    drawer = getDrawer();
    expect(drawer).toBeTruthy();
    const overlay = getOverlay();
    overlay?.dispatchEvent(new Event('click'));
    await nextTick();
    drawer = getDrawer();
    expect(drawer).toBeFalsy();

    // Esc keyboard event
    await button.trigger('click');
    drawer = getDrawer();
    expect(drawer).toBeTruthy();
    document.dispatchEvent(new KeyboardEvent('keyup', { code: 'Escape' }));
    await nextTick();
    drawer = getDrawer();
    expect(drawer).toBeFalsy();

    wrapper.unmount();
  });

  // position: 'left' | 'right'
  it('toggle drawer position', async () => {
    const wrapper = mount({
      setup() {
        const position = ref<'left' | 'right'>('left');

        const toggle = () => (position.value = ({ left: 'right', right: 'left' } as const)[position.value]);
        return () => (
          <>
            <button onClick={toggle}>toggle</button>
            <Drawer modelValue position={position.value} />
          </>
        );
      },
    });

    let drawer = getDrawer();
    const button = wrapper.find('button');

    expect(drawer).toBeTruthy();
    expect(drawer?.className).toContain(noDotDrawerNs.m('left'));

    await button?.trigger('click');
    drawer = getDrawer();
    expect(drawer?.className).toContain(noDotDrawerNs.m('right'));

    wrapper.unmount();
  });

  // event: before-close open close
  it('handle drawer events', async () => {
    const onBeforeClose = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();

    const visible = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <>
            <Drawer
              v-model={visible.value}
              showOverlay
              onOpen={onOpen}
              beforeClose={(done) => {
                done();
                onBeforeClose();
              }}
              onClose={onClose}
            />
          </>
        );
      },
    });

    visible.value = true;
    await nextTick();
    expect(onOpen).toBeCalled();

    await wait(0);
    document.dispatchEvent(new Event('click', { bubbles: true }));
    await nextTick();
    expect(onBeforeClose).toBeCalled();
    expect(onClose).toBeCalled();

    wrapper.unmount();
  });

  it.todo('props lock-scroll should work well.');

  it.todo('$drawerService should work well.');
});
