import { defineComponent, computed } from 'vue'
import { transferBaseProps, TransferBaseClass, TransferBaseProps } from '../common/use-transfer-base'
import DCheckbox from '../../checkbox/src/checkbox'
import DCheckboxGroup from '../../checkbox/src/checkbox-group'
import DSearch from '../../search/src/search'
import DTooltip from '../../tooltip/src/tooltip'
export default defineComponent({
    name: 'DTransferBase',
    components: {
        DSearch,
        DCheckboxGroup,
        DCheckbox,
        DTooltip
    },
    props: transferBaseProps,
    setup(props: TransferBaseProps, ctx) {
        /** data start **/
        const modelValues = computed(() => props.checkedValues as Array<string>)
        const searchQuery = computed(() => props.filter)
        const baseClass = TransferBaseClass(props)
        /** data end **/

        /** watch start **/
        /** watch end **/

        /** methods start **/
        const updateSearchQuery = (val: string): void => ctx.emit('changeQuery', val)

        const renderCheckbox = (props, key, showTooltip = false, tooltipPosition = 'top') => {
            const checkbox = <DCheckbox
                class="devui-transfer-panel-body-list-item"
                label={props.key}
                value={props.value}
                disabled={props.disabled}
                key={key}>
            </DCheckbox>
            return !showTooltip ? checkbox : <DTooltip
                position={tooltipPosition}
                content={props.key}>{checkbox}</DTooltip>
        }
        /** methods start **/

        return {
            baseClass,
            searchQuery,
            modelValues,
            updateSearchQuery,
            renderCheckbox
        }
    },
    render() {
        const {
            title,
            baseClass,
            checkedNum,
            allChecked,
            sourceOption,
            allCount,
            updateSearchQuery,
            search,
            searchQuery,
            modelValues,
            height,
            showTooltip,
            tooltipPosition,
            renderCheckbox,
        } = this

        return (
            <div class={baseClass}>
                {
                    this.$slots.header ? this.$slots.header() : (<div class="devui-transfer-panel-header">
                        <div class="devui-transfer-panel-header-allChecked">
                            <DCheckbox
                                modelValue={allChecked}
                                onChange={(value: boolean) => this.$emit('changeAllSource', value)}>
                                {title}
                            </DCheckbox>
                        </div>
                        <div class="devui-transfer-panel-header-num">{checkedNum}/{allCount}</div>
                    </div>)
                }
                {
                    this.$slots.body ? this.$slots.body() :
                        <div class="devui-transfer-panel-body">
                            {search && <div class="devui-transfer-panel-body-search">
                                <DSearch modelValue={searchQuery} onUpdate:modelValue={updateSearchQuery} />
                            </div>}
                            <div class="devui-transfer-panel-body-list" style={{ height: height }}>
                                {
                                    sourceOption.length ? <DCheckboxGroup
                                        modelValue={modelValues}
                                        onChange={
                                            (values: string[]): void => this.$emit('updateCheckeds', values)}>
                                        {
                                            sourceOption.map((item, idx) => {
                                                return renderCheckbox(item, idx, showTooltip, tooltipPosition)
                                            })
                                        }
                                    </DCheckboxGroup> :
                                        <div class="devui-transfer-panel-body-list-empty">无数据</div>
                                }
                            </div>
                        </div>
                }
            </div>
        )
    }
})