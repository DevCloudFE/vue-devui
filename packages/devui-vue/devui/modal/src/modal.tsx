import { defineComponent, toRefs, Transition } from 'vue';
import { modalProps, ModalProps } from './modal-types';
import { Icon } from '../../icon';
import { FixedOverlay } from '../../overlay';
import { useModal } from './use-modal';
import DModalHeader from './header';
import DModalBody from './body';
import './modal.scss';

export default defineComponent({
  name: 'DModal',
  inheritAttrs: false,
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, attrs, emit, expose }) {
    const { modelValue, lockScroll, closeOnClickOverlay, title } = toRefs(props);
    const { handleVisibleChange } = useModal(props, emit);
    expose({ handleVisibleChange });

    return () => (
      <FixedOverlay
        visible={modelValue.value}
        onUpdate:visible={handleVisibleChange}
        background-class='devui-modal-mask'
        background-block={lockScroll.value}
        backdrop-close={closeOnClickOverlay.value}>
        <Transition name='devui-modal-wipe'>
          <div class='devui-modal' {...attrs}>
            <Icon name='close' class='btn-close' size='var(--devui-font-size-md,12px)' onClick={() => handleVisibleChange(false)}></Icon>
            {slots.header ? slots.header() : title.value && <DModalHeader>{title.value}</DModalHeader>}
            <DModalBody>{slots.default?.()}</DModalBody>
            {slots.footer?.()}
          </div>
        </Transition>
      </FixedOverlay>
    );
  },
});
