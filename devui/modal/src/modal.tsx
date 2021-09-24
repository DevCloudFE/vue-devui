import { computed, defineComponent } from 'vue'
import { modalProps, ModalProps } from './modal-types'
import { FixedOverlay } from '../../overlay'
import { Button } from '../../button';
import { Icon } from '../../icon';
import './modal.scss';

export default defineComponent({
  name: 'DModal',
  props: modalProps,
  emits: ['onUpdate:modelValue'],
  setup(props: ModalProps, ctx) {

    const containerStyle = computed(() => {
      return {
        width: props.width,
        maxHeight: props.maxHeight
      };
    });

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
          >{text}</Button>
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
        <div style={containerStyle.value} class="devui-modal-content">
          <div class="devui-modal-header">
            {props.title}
            <Button class="btn-close" bsStyle="common" btnClick={() => props['onUpdate:modelValue']?.(false)}>
              <Icon name="close" />
            </Button>
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
