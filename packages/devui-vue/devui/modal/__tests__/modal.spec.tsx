import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DModal from '../src/modal';
import DModalHeader from '../src/header';
import DIcon from '../../icon/src/icon';

describe('d-modal', () => {
  it('render correctly', async () => {
    const overlayAnchor = document.createElement('div');
    overlayAnchor.setAttribute('id', 'd-overlay-anchor');
    overlayAnchor.style.position = 'fixed';
    overlayAnchor.style.left = '0';
    overlayAnchor.style.top = '0';
    overlayAnchor.style.zIndex = '1000';
    document.body.appendChild(overlayAnchor);
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
    const modal = document.querySelector('.devui-modal');
    expect(modal).toBeTruthy();
    expect(modal?.childElementCount).toBe(3);
    expect(modal?.childNodes[0].className).toContain('btn-close');
    expect(modal?.childNodes[1].className).toContain('devui-modal-header');
    expect(modal?.childNodes[2].className).toContain('devui-modal-body');
    wrapper.unmount();
    document.body.removeChild(overlayAnchor);
  });

  it('custom header', async () => {
    const overlayAnchor = document.createElement('div');
    overlayAnchor.setAttribute('id', 'd-overlay-anchor');
    overlayAnchor.style.position = 'fixed';
    overlayAnchor.style.left = '0';
    overlayAnchor.style.top = '0';
    overlayAnchor.style.zIndex = '1000';
    document.body.appendChild(overlayAnchor);
    const visible = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <DModal v-model={visible.value} title="Start Snapshot Version">
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
    const modalHeader = document.querySelector('.devui-modal-header');
    expect(modalHeader?.children[0].className).toContain('icon-like');
    expect(modalHeader?.children[1].innerHTML).toContain('Good Title');
    expect(modalHeader?.childElementCount).toBe(2);
    wrapper.unmount();
  });
});
