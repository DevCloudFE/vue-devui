import { defineComponent, computed, ref, watch } from 'vue';
import { ISourceOption } from '../__tests__/use-transfer'
import { transferBaseProps, TransferBaseClass, Query } from '../__tests__/use-transfer-base'
import DCheckbox from '../../checkbox/src/checkbox'
import DSearch from '../../search/src/search'
export default defineComponent({
    name: 'DTransferBase',
    components: {
        DCheckbox,
        DSearch
    },
    props: transferBaseProps,
    setup(props, ctx) {
        const baseClass = TransferBaseClass(props)
        const searchQuery = Query(props)
        const allSourceChecked = (): void => {
            ctx.emit('changeAllSource')
        }
        const updateChecked = (item: ISourceOption, idx: number): void => {
            ctx.emit('changeSource', item, idx)
        }
        const setSearchQuery = (val: string) => ctx.emit('changeQuery', val)

        return {
            baseClass,
            searchQuery,
            allSourceChecked,
            updateChecked,
            setSearchQuery
        }
    },
    data() {
        return {}
    },
    render() {
        const {
            title,
            baseClass,
            checkedNum,
            allSourceChecked,
            allChecked,
            updateChecked,
            sourceOption,
            setSearchQuery,
            filterable,
            searchQuery
        } = this

        return (
            <div class={baseClass}>
                {
                    this.$slots.Header ? this.$slots.Header() : (<div class="devui-transfer-panel-header">
                        <div class="devui-transfer-panel-header-allChecked">
                            <DCheckbox
                                value="allChecked"
                                checked={allChecked}
                                onUpdate:checked={allSourceChecked}>
                                {title}
                            </DCheckbox>
                        </div>
                        <div class="devui-transfer-panel-header-num">{checkedNum}/{sourceOption.length}</div>
                    </div>)
                }
                {
                    this.$slots.Body ? this.$slots.Body() : <div class="devui-transfer-panel-body">
                        {filterable && <div class="devui-transfer-panel-body-search">
                            <DSearch modelValue={searchQuery} onUpdate:modelValue={setSearchQuery}></DSearch>
                        </div>}
                        <div class="devui-transfer-panel-body-list"
                            style={{
                                height: `calc(100% - 40px - ${filterable ? 42 : 0}px)`
                            }}>
                            {
                                sourceOption.length ? sourceOption.map((item, idx) => {
                                    return <DCheckbox
                                        class="devui-transfer-panel-body-list-item"
                                        value={item.value}
                                        checked={item.checked}
                                        disabled={item.disabled || false}
                                        onUpdate:checked={() => updateChecked(item, idx)}
                                        key={idx}>
                                        {item.key}
                                    </DCheckbox>
                                }) : <div class="devui-transfer-panel-body-list-empty">无数据</div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
})