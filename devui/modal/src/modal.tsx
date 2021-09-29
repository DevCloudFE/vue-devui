import {
  computed,
  defineComponent,
  CSSProperties,
  watch,
  Transition
} from 'vue'
import { modalProps, ModalProps } from './modal-types'
import { useDraggable } from './modal-hooks'
import { FixedOverlay } from '../../overlay'
import { Button } from '../../button';
import './modal.scss';

export default defineComponent({
  name: 'DModal',
  props: modalProps,
  emits: ['onUpdate:modelValue'],
  setup(props: ModalProps, ctx) {

    // 获取鼠标拖拽的偏移量
    const {
      draggingX,
      draggingY,
      elementRef,
      containerRef,
      reset
    } = useDraggable();

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
        const { btnStyle, disabled, handler, text } = buttonProps;
        return (
          <Button
            key={index}
            style={{ display: 'inline-block', margin: '0 5px' }}
            btnStyle={btnStyle}
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

