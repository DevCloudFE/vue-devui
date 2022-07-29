import { computed, defineComponent, ref, Teleport, toRefs, Transition } from 'vue';
import { modalProps, ModalProps, ModalType } from './modal-types';
import { Icon } from '../../icon';
import { FixedOverlay } from '../../overlay';
import { useModal, useModalRender } from './composables/use-modal';
import { useDraggable } from './composables/useDraggable';
import DModalHeader from './components/header';
import DModalBody from './components/body';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './modal.scss';

interface TypeList {
  type: ModalType;
  text: string;
  icon: string;
}

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
    const dialogRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();
    const modalWidth = computed(() => {
      if (typeof props.width === 'string') {
        if ((props.width as string).includes('%')) {
          return props.width;
        } else {
          return props.width + 'px';
        }
      } else {
        return props.width + 'px';
      }
    });
    const draggable = computed(() => props.draggable);
    useDraggable(dialogRef, headerRef, draggable);

    const renderType = () => {
      const typeList: TypeList[] = [
        {
          type: 'success',
          text: '成功',
          icon: 'right-o',
        },
        {
          type: 'failed',
          text: '错误',
          icon: 'error-o',
        },
        {
          type: 'warning',
          text: '警告',
          icon: 'warning-o',
        },
        {
          type: 'info',
          text: '信息',
          icon: 'info-o',
        },
      ];
      const item = typeList.find((i) => i.type === props.type);
      return (
        <DModalHeader>
          <div class="type-content">
            <div class="type-content-icon">
              <Icon name={item?.icon}></Icon>
            </div>
            <div class="type-content-text">{item?.text}</div>
          </div>
        </DModalHeader>
      );
    };

    return () => (
      <Teleport to="body" disabled={!appendToBody.value}>
        {showOverlay.value && (
          <FixedOverlay v-model={modelValue.value} lock-scroll={false} style={{ zIndex: 'calc(var(--devui-z-index-modal, 1050) - 1)' }} />
        )}
        {showContainer.value && (
          <div class={ns.e('container')} onClick={onOverlayClick}>
            <Transition name={props.showAnimation ? ns.m('wipe') : ''}>
              {showModal.value && (
                <div
                  ref={dialogRef}
                  class={ns.b()}
                  style={{ width: modalWidth.value, marginTop: props.top }}
                  {...attrs}
                  onClick={(e) => e.stopPropagation()}>
                  {showClose.value && (
                    <div onClick={onCloseBtnClick} class="btn-close">
                      <Icon name="close" color="red" size="20px"></Icon>
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
          </div>
        )}
      </Teleport>
    );
  },
});
