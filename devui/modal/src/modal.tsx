import {
  computed,
  defineComponent,
  CSSProperties,
  ref,
  watch,
  readonly,
  Ref,
  isRef,
  Transition
} from 'vue'
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
    const { draggingX, draggingY, elementRef, containerRef, reset } = useDraggable();
    watch(() => props.modelValue, (value) => {
      if (value) {
        reset();
      }
    });

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
      transform: `translate(${props.offsetX}, ${props.offsetY})`,
      zIndex: props.zIndex
    }));

    const animatedVisible = computed(() => {
      return props.showAnimation ? props.modelValue : true;
    });

    // 处理按钮
    const buttons = computed(() => {
      return props.buttons.map((buttonProps, index) => {
        const { bsStyle, disabled, handler, text } = buttonProps;
        return (
          <Button
            key={index}
            style={{ display: 'inline-block', margin: '0 5px' }}
            btnStyle={bsStyle}
            disabled={disabled}
            onClick={handler}
          >
            {text}
          </Button>
        );
      });
    });

    // 处理取消事件
    const onVisibleChange = (value: boolean) => {
      const update = props['onUpdate:modelValue'];
      if (value) {
        update?.(value);
      } else {
        props.onClose?.();
        const beforeHidden = props.beforeHidden;
        if (beforeHidden instanceof Promise) {
          beforeHidden.then((visible) => {
            update?.(visible);
          });
        } else {
          const visible = beforeHidden?.() ?? false;
          update?.(visible);
        }
      }
    }

    return () => (
      <FixedOverlay
        visible={props.modelValue}
        onUpdate:visible={onVisibleChange}
        backgroundClass="devui-modal-wrapper"
        // overlay feature
        // backgroundStyle={{ zIndex: props.backdropZIndex }}
        backgroundBlock={!props.bodyScrollable}
        backdropClose={props.backdropCloseable}
      >
        <Transition name="devui-modal-wipe">
          <div
            ref={containerRef}
            class="devui-modal-content"
            style={[containerStyle.value, draggingStyle.value]}
            v-show={animatedVisible.value}
          >
            <div class="devui-modal-header" ref={elementRef}>
              {props.title}
              {/* TODO: Button icon need to visible */}
              <Button
                class="btn-close"
                icon="close"
                btnStyle="text-dark"
                onClick={() => onVisibleChange(false)}
              />
            </div>
            <div class="devui-modal-body">
              {ctx.slots.default?.()}
            </div>
            <div class="devui-modal-footer">
              {buttons.value}
            </div>
          </div>
        </Transition>
      </FixedOverlay>
    )
  }
})


const getRangeValueOf = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}


// 当前某个元素被拖拽时鼠标的偏移量
const useDraggable = (draggable: Ref<boolean> | boolean = true) => {
  const draggingX = ref(0);
  const draggingY = ref(0);
  const elementRef = ref<HTMLElement | null>();
  const containerRef = ref<HTMLElement | null>();
  const enabledDragging = isRef(draggable) ? draggable : ref(draggable);

  const reset = () => {
    draggingX.value = 0;
    draggingY.value = 0;
  }

  watch([containerRef, elementRef], ([container, target], ov, onInvalidate) => {
    if (!(target instanceof HTMLElement && container instanceof HTMLElement)) {
      return;
    }
    const body = window.document.body;
    let startX = 0;
    let startY = 0;
    let prevDraggingX = 0;
    let prevDraggingY = 0;
    let containerRect = container.getBoundingClientRect();
    let bodyRect = body.getBoundingClientRect();
    let isDown = false;
    const handleMouseDown = (event: MouseEvent) => {
      if (!enabledDragging.value) {
        return;
      }
      startX = event.clientX;
      startY = event.clientY;
      // 只拿最新的
      const targetRect = target.getBoundingClientRect();
      // 判断鼠标点是否在 target 元素内
      if (
        targetRect.x < startX &&
        targetRect.y < startY &&
        (targetRect.width + targetRect.x) >= startX &&
        (targetRect.height + targetRect.y) >= startY
      ) {
        isDown = true;
        prevDraggingX = draggingX.value;
        prevDraggingY = draggingY.value;
        bodyRect = body.getBoundingClientRect();
        containerRect = container.getBoundingClientRect();
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDown) {
        return;
      }
      const currentX = prevDraggingX + event.clientX - startX;
      const currentY = prevDraggingY + event.clientY - startY;
      const containerOriginX = containerRect.x - prevDraggingX;
      const containerOriginY = containerRect.y - prevDraggingY;
      draggingX.value = getRangeValueOf(currentX, -containerOriginX, bodyRect.width - containerRect.width - containerOriginX);
      draggingY.value = getRangeValueOf(currentY, -containerOriginY, bodyRect.height - containerRect.height - containerOriginY);
    }

    const handleMouseUp = () => {
      if (!isDown) {
        return;
      }
      isDown = false;
    }

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    onInvalidate(() => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    });
  });

  return {
    draggingX: readonly(draggingX),
    draggingY: readonly(draggingY),
    elementRef,
    containerRef,
    reset
  }
}