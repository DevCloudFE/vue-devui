import { defineComponent, computed } from 'vue';
import DButton from '../../button/src/button'
import { transferOperationProps } from '../common/use-transfer-operation'

export default defineComponent({
    name: 'DTransferOperation',
    components: {
        DButton
    },
    props: transferOperationProps,
    setup(props, ctx) {
        return () => {
            return ctx.slots.operation && ctx.slots.operation() || <div class="devui-transfer-panel-operation">
                <div class="devui-transfer-panel-operation-group">
                    <DButton class="devui-transfer-panel-operation-group-left icon-collapse" disabled={props.disabled ? props.disabled : props.sourceDisabled}
                        btnClick={() => ctx.emit('updateSourceData')}></DButton>
                    <DButton class="devui-transfer-panel-operation-group-right icon-chevron-right" disabled={props.disabled ? props.disabled : props.targetDisabled} btnClick={() => ctx.emit('updateTargetData')}></DButton>
                </div>
            </div>
        }
    }
})