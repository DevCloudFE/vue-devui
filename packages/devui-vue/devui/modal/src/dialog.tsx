import { defineComponent, computed, CSSProperties, watch, ref } from 'vue';
import { DialogProps, dialogProps } from './dialog-types';
import { useMoveable } from './use-moveable';

import { Button } from '../../button';
import Modal from './modal';

import './modal.scss';
import { Icon } from '../../icon';

export default defineComponent({
  name: 'DModal',
  inheritAttrs: false,
  props: dialogProps,
  emits: ['onUpdate:modelValue'],
  setup(props: DialogProps, ctx) {

    // 获取鼠标拖拽的偏移量
    const {
      movingX,
      movingY,
      handleRef,
      moveElRef,
      reset
    } = useMoveable();

    watch(() => props.modelValue, (value) => {
      if (value) {
        reset();
      }
    });

    // 拖拽的样式
    const movingStyle = computed<CSSProperties>(() => ({
      position: 'relative',
      left: `${movingX.value}px`,
      top: `${movingY.value}px`,
    }));

    // 容器的样式
    const containerStyle = computed<CSSProperties>(() => ({
      width: props.width,
      maxHeight: props.maxHeight,
      transform: `translate(${props.offsetX}, ${props.offsetY})`,
      zIndex: props.zIndex
    }));

    const iconName = computed(() => {
      switch (props.dialogType) {
        case 'standard':
          return '';
        case 'info':
          return 'icon-info-o';
        case 'success':
          return 'icon-right-o';
        case 'warning':
          return 'icon-warning-o';
        case 'failed':
          return 'icon-error-o';
        default:
          return '';
      }
    });

    // 处理按钮
    const buttonsRef = computed(() => {
      return props.buttons.map((buttonProps, index) => {
        const { variant, disabled, handler, text } = buttonProps;
        return (
          <Button
            key={index}
            style={{ display: 'inline-block', margin: '0 5px' }}
            variant={variant}
            disabled={disabled}
            onClick={handler}
          >
            {text}
          </Button>
        );
      });
    });

    const modalRef = ref<{ onVisibleChange(v: boolean): void; } | null>();
    const closeModal = () => {
      modalRef.value?.onVisibleChange?.(false)
    }
    ctx.expose({ closeModal });

    return () => (
      <Modal
        ref={modalRef}
        width={props.width}
        maxHeight={props.maxHeight}
        offsetX={props.offsetX}
        offsetY={props.offsetY}
        zIndex={props.zIndex}
        backdropZIndex={props.backdropZIndex}
        backdropCloseable={props.backdropCloseable}
        bodyScrollable={props.bodyScrollable}
        placement={props.placement}
        onClose={props.onClose}
        beforeHidden={props.beforeHidden}
        modelValue={props.modelValue}
        onUpdate:modelValue={props['onUpdate:modelValue']}
      >
        <div
          class="devui-modal-content"
          style={[containerStyle.value, movingStyle.value]}
          ref={moveElRef}
        >
          <div class="devui-modal-header" ref={handleRef}>
            {!!iconName.value ? (
              <Icon name={iconName.value} size="24px" class="header-alert-icon" />
            ) : null}
            <span>
              {props.title}
            </span>
            <Button
              class="btn-close"
              icon="close"
              variant="text-dark"
              onClick={closeModal}
            />
          </div>
          <div class="devui-modal-body">
            {ctx.slots.default?.()}
          </div>
          <div class="devui-modal-footer">
            {buttonsRef.value}
          </div>
        </div>
      </Modal>
    );
  }
});