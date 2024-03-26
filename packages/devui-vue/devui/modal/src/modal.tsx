import { computed, defineComponent, nextTick, ref, Teleport, toRefs, Transition, watch } from 'vue';
import { modalProps, ModalProps, ModalType } from './modal-types';
import { Icon } from '../../icon';
import { FixedOverlay } from '../../overlay';
import { useModal, useModalRender } from './composables/use-modal';
import { useDraggable } from './composables/use-draggable';
import DModalHeader from './components/header';
import DModalBody from './components/body';
import { CloseIcon } from './components/modal-icons';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './modal.scss';

interface TypeList {
  type: ModalType;
  text: string;
  icon: string;
  color: string;
}

export default defineComponent({
  name: 'DModal',
  inheritAttrs: false,
  props: modalProps,
  emits: ['update:modelValue', 'close'],
  setup(props: ModalProps, { slots, attrs, emit }) {
    const ns = useNamespace('modal');
    const { modelValue, title, showClose, showOverlay, appendToBody, closeOnClickOverlay, keepLast } = toRefs(props);
    const { execClose } = useModal(props, emit);
    useModalRender(props);
    const dialogRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();
    const draggable = computed(() => props.draggable);
    const { clearPosition, modalPosition } = useDraggable(dialogRef, headerRef, draggable);

    watch(modelValue, (val) => {
      if (val && !keepLast.value) {
        clearPosition();
        nextTick(() => {
          const autofocus = document?.querySelector('[autofocus]');
          if (autofocus) {
            (autofocus as HTMLElement).focus();
          }
        });
      }
    });

    const renderType = () => {
      const typeList: TypeList[] = [
        {
          type: 'success',
          text: '成功',
          icon: 'right-o',
          color: 'var(--devui-success)',
        },
        {
          type: 'failed',
          text: '错误',
          icon: 'error-o',
          color: 'var(--devui-danger)',
        },
        {
          type: 'warning',
          text: '警告',
          icon: 'warning-o',
          color: 'var(--devui-warning)',
        },
        {
          type: 'info',
          text: '信息',
          icon: 'info-o',
          color: 'var(--devui-info)',
        },
      ];
      const item = typeList.find((i) => i.type === props.type);
      return (
        <div style={{ cursor: props.draggable ? 'move' : 'default' }} ref={headerRef}>
          <DModalHeader>
            <div class="type-content">
              <div class="type-content-icon">
                <Icon name={item?.icon} color={item?.color}></Icon>
              </div>
              <div class="type-content-text">{item?.text}</div>
            </div>
          </DModalHeader>
        </div>
      );
    };

    return () => (
      <Teleport to="body" disabled={!appendToBody.value}>
        {showOverlay.value && (
          <FixedOverlay
            modelValue={modelValue.value}
            {...{ 'onUpdate:modelValue': execClose }}
            class={ns.e('overlay')}
            lock-scroll={false}
            close-on-click-overlay={closeOnClickOverlay.value}
            style={{ zIndex: 'calc(var(--devui-z-index-modal, 1050) - 1)' }}
          />
        )}
        <Transition name={props.showAnimation ? ns.m('wipe') : ''}>
          {modelValue.value && (
            <div
              ref={dialogRef}
              class={ns.b()}
              {...attrs}
              onClick={(e: Event) => e.stopPropagation()}
              style={{ transform: modalPosition.value }}>
              {showClose.value && (
                <div onClick={execClose} class="btn-close">
                  <Icon operable component={CloseIcon()}></Icon>
                </div>
              )}
              {props.type ? (
                renderType()
              ) : (
                <div style={{ cursor: props.draggable ? 'move' : 'default' }} ref={headerRef}>
                  {slots.header ? slots.header() : title.value && <DModalHeader>{title.value}</DModalHeader>}
                </div>
              )}
              <DModalBody>{slots.default?.()}</DModalBody>
              {slots.footer?.()}
            </div>
          )}
        </Transition>
      </Teleport>
    );
  },
});
