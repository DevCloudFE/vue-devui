import { defineComponent, computed } from 'vue'
import { transferBaseProps, TransferBaseClass } from '../common/use-transfer-base'
import { TransferBaseProps } from '../common/use-transfer-base'
import DCheckbox from '../../checkbox/src/checkbox'
import DCheckboxGroup from '../../checkbox/src/checkbox-group'
import DSearch from '../../search/src/search'
export default defineComponent({
    name: 'DTransferBase',
    components: {
        DSearch,
        DCheckboxGroup,
        DCheckbox
    },
    props: transferBaseProps,
    setup(props: TransferBaseProps, ctx) {
        /** data start **/
        const modelValues = computed(() => props.checkedValues)
        const searchQuery = computed(() => props.query)
        const baseClass = TransferBaseClass(props)
        /** data end **/

        /** watch start **/
        /** watch start **/

        /** methods start **/
        const updateSearchQuery = (val: string): void => ctx.emit('changeQuery', val)
        /** methods start **/

        return {
            baseClass,
            searchQuery,
            modelValues,
            updateSearchQuery
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
            modelValues
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
                    this.$slots.body ? this.$slots.body() : <div class="devui-transfer-panel-body">
                        {search && <div class="devui-transfer-panel-body-search">
                            <DSearch modelValue={searchQuery} onUpdate:modelValue={updateSearchQuery} />
                        </div>}
                        <div class="devui-transfer-panel-body-list"
                            style={{
                                height: `calc(100% - 40px - ${search ? 42 : 0}px)`
                            }}>
                            {
                                sourceOption.length ? <DCheckboxGroup modelValue={modelValues}
                                    onChange={(values: string[]): void => this.$emit('updateCheckeds', values)}>
                                    {
                                        sourceOption.map((item, idx) => {
                                            return <DCheckbox
                                                class="devui-transfer-panel-body-list-item"
                                                label={item.key}
                                                value={item.value}
                                                disabled={item.disabled}
                                                key={idx}>
                                            </DCheckbox>
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