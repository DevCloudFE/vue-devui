import { defineComponent, Teleport, toRefs, Transition } from 'vue';
import { modalProps, ModalProps } from './modal-types';
import { Icon } from '../../icon';
import { FixedOverlay } from '../../overlay';
import { useModal, useModalRender } from './composables/use-modal';
import DModalHeader from './components/header';
import DModalBody from './components/body';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './modal.scss';

export default defineComponent({
  name: 'DModal',
  inheritAttrs: false,
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, attrs, emit }) {
    const ns = useNamespace('modal');
    const { modelValue, title, showClose, showOverlay, appendToBody } = toRefs(props);
    const { onCloseBtnClick, onOverlayClick } = useModal(props, emit);
    const { showContainer, showModal } = useModalRender(props);

    return () => (
      <Teleport to="body" disabled={!appendToBody.value}>
        {showOverlay.value && (
          <FixedOverlay v-model={modelValue.value} lock-scroll={false} style={{ zIndex: 'calc(var(--devui-z-index-modal, 1050) - 1)' }} />
        )}
        {showContainer.value && (
          <div class={ns.e('container')} onClick={onOverlayClick}>
            <Transition name={ns.m('wipe')}>
              {showModal.value && (
                <div class={ns.b()} {...attrs}>
                  {showClose.value && (
                    <Icon name="close" class="btn-close" size="var(--devui-font-size-md,12px)" onClick={onCloseBtnClick}></Icon>
                  )}
                  {slots.header ? slots.header() : title.value && <DModalHeader>{title.value}</DModalHeader>}
                  <DModalBody>{slots.default?.()}</DModalBody>
                  {slots.footer?.()}
                </div>
              )}
            </Transition>
          </div>
        )}
      </Teleport>
    );
  },
});
