import { computed, defineComponent, CSSProperties, ref, watch, readonly, reactive } from 'vue'
import { modalProps, ModalProps } from './modal-types'
import { FixedOverlay } from '../../overlay'
import { Button } from '../../button';
import './modal.scss';

export default defineComponent({
  name: 'DModal',
  props: modalProps,
  emits: ['onUpdate:modelValue'],
  setup(props: ModalProps, ctx) {

    // 获取鼠标拖拽的偏移量
    const { draggingX, draggingY, elementRef } = useDraggable();

    // 拖拽的样式
    const draggingStyle = computed<CSSProperties>(() => ({
      position: 'relative',
      left: `${draggingX.value}px`,
      top: `${draggingY.value}px`,
    }));

    // 容器的样式
    const containerStyle = computed<CSSProperties>(() => ({
      width: props.width,
      maxHeight: props.maxHeight,
      transform: `translate(${props.offsetX}, ${props.offsetY})`
    }));

    // 处理按钮
    const buttons = computed(() => {
      return props.buttons.map((buttonProps, index) => {
        const { bsStyle, disabled, handler, text } = buttonProps;
        return (
          <Button
            key={index}
            style={{ display: 'inline-block', margin: '0 5px' }}
            bsStyle={bsStyle}
            disabled={disabled}
            btnClick={handler}
          >
            {text}
          </Button>
        );
      });
    });

    return () => (
      <FixedOverlay
        visible={props.modelValue}
        onUpdate:visible={props['onUpdate:modelValue']}
        backgroundClass="devui-modal-wrapper"
        backgroundBlock={props.bodyScrollable}
      >
        <div style={[containerStyle.value, draggingStyle.value]} class="devui-modal-content">
          <div class="devui-modal-header" ref={elementRef}>
            {props.title}
            <Button
              class="btn-close"
              icon="close"
              bsStyle="common"
              btnClick={() => props['onUpdate:modelValue']?.(false)}
            />
          </div>
          <div class="devui-modal-body">
            {ctx.slots.default?.()}
          </div>
          <div class="devui-modal-footer">
            {buttons.value}
          </div>
        </div>
      </FixedOverlay>
    )
  }
})


// 当前某个元素被拖拽时鼠标的偏移量
const useDraggable = () => {
  const draggingX = ref(0);
  const draggingY = ref(0);
  const elementRef = ref<HTMLElement | null>();

  watch(elementRef, (target, ov, onInvalidate) => {
    if (!(target instanceof HTMLElement)) {
      return;
    }
    let startX = 0;
    let startY = 0;
    let prevDraggingX = 0;
    let prevDraggingY = 0;
    let isDown = false;
    const handleMouseDown = (event: MouseEvent) => {
      isDown = true;
      startX = event.clientX;
      startY = event.clientY;
      prevDraggingX = draggingX.value;
      prevDraggingY = draggingY.value;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDown) {
        return;
      }
      draggingX.value = prevDraggingX + event.clientX - startX;
      draggingY.value = prevDraggingY + event.clientY - startY;
    }

    const handleMouseUp = () => {
      if (!isDown) {
        return;
      }
      isDown = false;
    }

    target.addEventListener('mousedown', handleMouseDown);
    target.addEventListener('mousemove', handleMouseMove);
    target.addEventListener('mouseup', handleMouseUp);
    onInvalidate(() => {
      target.removeEventListener('mousedown', handleMouseDown);
      target.removeEventListener('mousemove', handleMouseMove);
      target.removeEventListener('mouseup', handleMouseUp);
    })
  });

  return {
    draggingX: readonly(draggingX),
    draggingY: readonly(draggingY),
    elementRef
  }
}