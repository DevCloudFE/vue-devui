import { defineComponent, toRefs, Transition } from 'vue';
import { modalProps, ModalProps } from './modal-types';
import { Icon } from '../../icon';
import { FixedOverlay } from '../../overlay';
import { useModal } from './composables/use-modal';
import DModalHeader from './components/header';
import DModalBody from './components/body';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './modal.scss';

export default defineComponent({
  name: 'DModal',
  inheritAttrs: false,
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, attrs, emit, expose }) {
    const ns = useNamespace('modal');
    const { modelValue, lockScroll, closeOnClickOverlay, title, showClose } = toRefs(props);
    const { handleVisibleChange } = useModal(props, emit);
    expose({ handleVisibleChange });

    return () => {
      const fixedOverlayProps = {
        visible: modelValue.value,
        'onUpdate:visible': handleVisibleChange,
        'background-class': ns.e('mask'),
        'background-block': lockScroll.value,
        'backdrop-close': closeOnClickOverlay.value,
      };
      return (
        <FixedOverlay {...fixedOverlayProps}>
          <Transition name={ns.m('wipe')}>
            <div class={ns.b()} {...attrs}>
              {showClose.value && (
                <Icon
                  name="close"
                  class="btn-close"
                  size="var(--devui-font-size-md,12px)"
                  onClick={() => handleVisibleChange(false)}></Icon>
              )}
              {slots.header ? slots.header() : title.value && <DModalHeader>{title.value}</DModalHeader>}
              <DModalBody>{slots.default?.()}</DModalBody>
              {slots.footer?.()}
            </div>
          </Transition>
        </FixedOverlay>
      );
    };
  },
});
