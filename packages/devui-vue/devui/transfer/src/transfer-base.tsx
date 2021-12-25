import { defineComponent, computed, ref, watch, SetupContext } from 'vue'
import { transferBaseProps, TransferBaseClass, TransferBaseProps } from '../common/use-transfer-base'
import DCheckbox from '../../checkbox/src/checkbox'
import DCheckboxGroup from '../../checkbox/src/checkbox-group'
import DSearch from '../../search/src/search'
import DTransferDrag from './transfer-drag-item'
import DTransfeCheckbox from './transfer-checkbox'
export default defineComponent({
    name: 'DTransferBase',
    components: {
        DSearch,
        DCheckboxGroup,
        DCheckbox,
        DTransferDrag,
        DTransfeCheckbox
    },
    props: transferBaseProps,
    setup(props: TransferBaseProps, ctx: SetupContext) {
        /** data start **/
        const allHalfchecked = ref(false)//ref(props.allChecked)
        const modelValues = computed(() => props.checkedValues as Array<string>)
        const dragWrapClass = computed(() => {
            const isDrag = props.isSourceDroppable || props.isTargetDroppable
            return `devui-transfer-panel-body-list devui-transfer-panel-body-${isDrag ? '' : 'no'}drag`
        })
        const searchQuery = computed(() => props.filter)
        const baseClass = TransferBaseClass(props)
        const dropItem = ref(null)

        /** data end **/

        /** watch start **/
        watch(
            () => props.checkedNum,
            (nVal) => {
                if (props.allChecked) {
                    allHalfchecked.value = !props.allChecked
                } else {
                    allHalfchecked.value = nVal !== 0
                }
            },
            {
                immediate: true
            }
        )
        /** watch end **/

        /** methods start **/
        const updateSearchQuery = (val: string): void => ctx.emit('changeQuery', val)

        const renderCheckboxGroup = () => {
            return <DCheckboxGroup
                modelValue={modelValues.value}
                onChange={
                    (values: string[]): void => ctx.emit('updateCheckeds', values)
                }>
                {
                    props.sourceOption.map((item, idx) => {
                        return <DTransfeCheckbox
                            data={item}
                            id={idx}
                            showTooltip={props.showTooltip}
                            tooltipPosition={props.tooltipPosition}>
                        </DTransfeCheckbox>
                    })
                }
            </DCheckboxGroup>
        }

        const renderDragCheckboxGroup = () => {
            return <DCheckboxGroup
                modelValue={modelValues.value}
                onChange={
                    (values: string[]): void => ctx.emit('updateCheckeds', values)
                }>
                {
                    props.sourceOption.map((item, idx) => {
                        return <DTransferDrag
                            itemData={item}
                            id={idx}
                            showTooltip={props.showTooltip}
                            tooltipPosition={props.tooltipPosition}
                            onDrop={(event, item) => {
                                dropItem.value = item
                            }}
                            onDragend={(event, dragItem) => {
                                props.onDragend && props.onDragend(dragItem, dropItem.value)
                            }} />
                    })
                }
            </DCheckboxGroup>
        }

        /** methods start **/

        return {
            baseClass,
            searchQuery,
            dragWrapClass,
            modelValues,
            dropItem,
            allHalfchecked,
            updateSearchQuery,
            renderCheckboxGroup,
            renderDragCheckboxGroup
        }
    },
    render() {
        const {
            title,
            baseClass,
            checkedNum,
            allChecked,
            allHalfchecked,
            sourceOption,
            allCount,
            updateSearchQuery,
            search,
            searchQuery,
            dragWrapClass,
            height,
            isSourceDroppable,
            isTargetDroppable,
            renderCheckboxGroup,
            renderDragCheckboxGroup
        } = this

        return (
            <div class={baseClass}>
                {
                    this.$slots.header ? this.$slots.header() : (<div class="devui-transfer-panel-header">
                        <div class="devui-transfer-panel-header-allChecked">
                            <DCheckbox
                                halfchecked={allHalfchecked}
                                modelValue={allChecked}
                                onChange={(value: boolean) => {
                                    this.$emit('changeAllSource', value)
                                }}>
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
                            <div class={dragWrapClass} style={{ height: height }}>
                                {
                                    sourceOption.length ?
                                        (isSourceDroppable || isTargetDroppable ? renderDragCheckboxGroup() : renderCheckboxGroup())
                                        : <div class="devui-transfer-panel-body-list-empty">无数据</div>
                                }
                            </div>
                        </div>
                }
            </div>
        )
    }
})