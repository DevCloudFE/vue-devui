import { defineComponent } from 'vue';
import DButton from '../../button/index'
import { transferOperationProps } from '../__tests__/use-transfer-operation'

export default defineComponent({
    name: 'DTransferOperation',
    components: {
        DButton
    },
    props: transferOperationProps,
    setup(props, ctx) {
        return () => {
            return <div class="devui-transfer-panel-operation">
                <div class="devui-transfer-panel-operation-group">
                    <button class="devui-transfer-panel-operation-group-left icon-collapse"
                        disabled={props.sourceDisabled} onClick={() => ctx.emit('updateSourceData')}>
                    </button>
                    <button class="devui-transfer-panel-operation-group-right icon-chevron-right"
                        disabled={props.targetDisabled} onClick={() => ctx.emit('updateTargetData')}>
                    </button>
                    {/* <DButton class="devui-transfer-panel-operation-group-left icon-collapse"></DButton>
                    <DButton class="devui-transfer-panel-operation-panel-right icon-chevron-right"></DButton> */}
                </div>
            </div>
        }
    },
    data() {
        return {}
    },
    // render() {

    // }
})