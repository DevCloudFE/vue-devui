import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DModal from '../src/modal';
import DModalHeader from '../src/components/header';
import DModalFooter from '../src/components/footer';
import DIcon from '../../icon/src/icon';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('modal', true);
const noDotNs = useNamespace('modal');
const buttonNoDotNs = useNamespace('button');

describe('d-modal', () => {
  beforeEach(() => {
    const overlayAnchor = document.createElement('div');
    overlayAnchor.setAttribute('id', 'd-overlay-anchor');
    overlayAnchor.style.position = 'fixed';
    overlayAnchor.style.left = '0';
    overlayAnchor.style.top = '0';
    overlayAnchor.style.zIndex = '1000';
    document.body.appendChild(overlayAnchor);
  });
  afterEach(() => {
    const overlayAnchor = document.querySelector('#d-overlay-anchor');
    overlayAnchor && document.body.removeChild(overlayAnchor);
  });
  it('render correctly', async () => {
    const visible = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <DModal v-model={visible.value} title="Start Snapshot Version">
            {{
              default: () => (
                <>
                  <div>name: Tom</div>
                  <div>age: 20</div>
                  <div>address: Chengdu</div>
                </>
              ),
            }}
          </DModal>
        );
      },
    });

    visible.value = true;
    await nextTick();
    const modal = document.querySelector(ns.b());
    expect(modal).toBeTruthy();
    expect(modal?.childElementCount).toBe(3);
    expect(modal?.childNodes[0].className).toContain('btn-close');
    expect(modal?.childNodes[1].className).toContain(noDotNs.e('header'));
    expect(modal?.childNodes[2].className).toContain(noDotNs.e('body'));
  });

  it('custom header', async () => {
    const visible = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <DModal v-model={visible.value}>
            {{
              header: () => (
                <DModalHeader>
                  <DIcon name="like"></DIcon>
                  <span>Good Title</span>
                </DModalHeader>
              ),
              default: () => (
                <>
                  <div>name: Tom</div>
                  <div>age: 20</div>
                  <div>address: Chengdu</div>
                </>
              ),
            }}
          </DModal>
        );
      },
    });

    visible.value = true;
    await nextTick();
    const modalHeader = document.querySelector(ns.e('header'));
    expect(modalHeader?.children[0].className).toContain('icon-like');
    expect(modalHeader?.children[1].innerHTML).toContain('Good Title');
    expect(modalHeader?.childElementCount).toBe(2);
    wrapper.unmount();
  });

  it('custom footer', async () => {
    const visible = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <DModal v-model={visible.value} title="Start Snapshot Version">
            {{
              default: () => (
                <>
                  <div>name: Tom</div>
                  <div>age: 20</div>
                  <div>address: Chengdu</div>
                </>
              ),
              footer: () => (
                <DModalFooter>
                  <d-button>取消</d-button>
                  <d-button>确认</d-button>
                </DModalFooter>
              ),
            }}
          </DModal>
        );
      },
    });

    visible.value = true;
    await nextTick();
    const modalHeader = document.querySelector(ns.e('footer'));
    expect(modalHeader?.children[0].className).toContain(buttonNoDotNs.b());
    expect(modalHeader?.children[1].className).toContain(buttonNoDotNs.b());
    expect(modalHeader?.childElementCount).toBe(2);
    wrapper.unmount();
  });

  it('before-close', async () => {
    const visible = ref(true);
    const beforeClose = jest.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <DModal v-model={visible.value} title="Start Snapshot Version" before-close={beforeClose}>
            {{
              default: () => (
                <>
                  <div>name: Tom</div>
                  <div>age: 20</div>
                  <div>address: Chengdu</div>
                </>
              ),
            }}
          </DModal>
        );
      },
    });

    await nextTick();
    const btnClose = document.querySelector('.btn-close');
    await btnClose?.dispatchEvent(new Event('click'));
    expect(beforeClose).toBeCalled();
    wrapper.unmount();
  });
});
