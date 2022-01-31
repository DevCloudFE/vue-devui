import { mount } from '@vue/test-utils';
import { ref, reactive, watch, nextTick } from 'vue'
import DCheckbox from '../../checkbox/src/checkbox';
import DCheckboxGroup from '../../checkbox/src/checkbox-group'
import DTooltip from '../../tooltip/src/tooltip';
import DButton from '../../button/src/button';
import DTransfer from '../src/transfer'

const SOURCE_DATA = [
    {
        key: '北京',
        value: '北京',
        disabled: false,
    },
    {
        key: '上海',
        value: '上海',
        disabled: true,
    },
    {
        key: '广州',
        value: '广州',
        disabled: true,
    },
    {
        key: '深圳',
        value: '深圳',
        disabled: false,
    },
    {
        key: '成都',
        value: '成都',
        disabled: false,
    },
    {
        key: '武汉',
        value: '武汉',
        disabled: false,
    },
    {
        key: '西安',
        value: '西安',
        disabled: false,
    },
    {
        key: '福建',
        value: '福建',
        disabled: false,
    }
]
const TARGET_DATA = [
    {
        key: '南充',
        value: '南充',
        disabled: false,
    },
    {
        key: '广元',
        value: '广元',
        disabled: false,
    },
    {
        key: '绵阳',
        value: '绵阳',
        disabled: false,
    },
    {
        key: '大连',
        value: '大连',
        disabled: false,
    },
    {
        key: '重庆',
        value: '重庆',
        disabled: false,
    }
]

describe('d-transfer', () => {
    it('d-transfer basic work', async () => {
        const sourceOption = ref(SOURCE_DATA)
        const targetOption = ref(TARGET_DATA)
        const wrapper = mount({
            components: {
                DTransfer
            },
            template: `
                <d-transfer
                    v-model="modelValues"
                    :titles="titles"
                    :sourceOption="source"
                    :targetOption="target"
                >
                </d-transfer>
            `,
            setup() {
                return {
                    modelValues: ref(['成都', '绵阳']),
                    titles: ref(['sourceHeader', 'targetHeader']),
                    source: sourceOption,
                    target: targetOption
                }
            }
        })

        /**
         * 测试穿梭框源是否正确渲染 start
        */
        expect(wrapper.find('.devui-transfer').exists()).toBeTruthy()
        expect(wrapper.findAll('.devui-transfer-source .devui-transfer-panel-body .devui-checkbox').length).toBe(8)
        expect(wrapper.findAll('.devui-transfer-target .devui-transfer-panel-body .devui-checkbox').length).toBe(5)
        /**
          * 测试穿梭框源是否正确渲染 end
        */


        /**
         * 测试穿梭框源数据中disable start
        */
        const disableds = wrapper.findAll('.devui-transfer .devui-transfer-source .disabled')
        expect(disableds.length).toBe(2)
        expect(disableds.filter(item => ['上海', '广州'].includes(item.text())).length).toBe(2)
        /**
         * 测试穿梭框源数据中disable end
        */


        /**
         * 测试穿梭框默认选中值 start
        */
        await nextTick()
        const sourceChecked = wrapper.find('.devui-transfer-source .active')
        expect(sourceChecked.text()).toBe('成都')
        const targetChecked = wrapper.find('.devui-transfer-target .active')
        expect(targetChecked.text()).toBe('绵阳')
        /**
         * 测试穿梭框默认选中值 end
        */


        /**
         * 测试穿梭框左右穿梭 start
        */
        // 源按钮
        const leftButton = wrapper.find('.devui-transfer .devui-transfer-panel-operation-group-left button')
        expect(leftButton)
        expect(leftButton.attributes('disabled')).toEqual(undefined)
        leftButton.trigger('click')
        await nextTick()
        expect(leftButton.attributes('disabled')).toEqual('')
        // 目标按钮
        const rightButton = wrapper.find('.devui-transfer .devui-transfer-panel-operation-group-right button')
        expect(rightButton)
        expect(rightButton.attributes('disabled')).toEqual(undefined)
        rightButton.trigger('click')
        await nextTick()
        expect(rightButton.attributes('disabled')).toEqual('')
        /**
         * 测试穿梭框左右穿梭 end
        */


        /**
         * 测试穿梭框左、右全选 start
        */
        // 源全选
        const sourceAllInput = wrapper.find('.devui-transfer-source .devui-transfer-panel-header-allChecked .devui-checkbox-input')
        sourceAllInput.trigger('click')
        await nextTick()
        const newSourceAllInput = wrapper.find<HTMLInputElement>('.devui-transfer-source .devui-transfer-panel-header-allChecked .devui-checkbox-input')
        expect(newSourceAllInput.element.checked).toBeTruthy()
        // 目标全选
        const targetAllInput = wrapper.find('.devui-transfer-target .devui-transfer-panel-header-allChecked .devui-checkbox-input')
        targetAllInput.trigger('click')
        await nextTick()
        const newTargetAllInput = wrapper.find<HTMLInputElement>('.devui-transfer-target .devui-transfer-panel-header-allChecked .devui-checkbox-input')
        expect(newTargetAllInput.element.checked).toBeTruthy()
        /**
         * 测试穿梭框左、右全选 end
        */
    })

    it('d-transfer searching work', async () => {
        const sourceOption = ref(SOURCE_DATA)
        const targetOption = ref(TARGET_DATA)
        const wrapper = mount({
            components: {
                DTransfer
            },
            template: `
                <d-transfer
                    v-model="modelValues"
                    :titles="titles"
                    :sourceOption="source"
                    :targetOption="target"
                    :isSearch="isSearch"
                >
                </d-transfer>
            `,
            setup() {
                return {
                    modelValues: ref(['成都', '绵阳']),
                    titles: ref(['sourceHeader', 'targetHeader']),
                    source: sourceOption,
                    target: targetOption,
                    isSearch: ref(true)
                }
            }
        })

        /**
         * 测试搜索功能 start
        */
        // 源搜索功能
        expect(wrapper.find('.devui-transfer-source .devui-search').exists()).toBe(true)
        const sourceSearch = wrapper.find<HTMLInputElement>('.devui-transfer-source .devui-search input[type="text"]')
        const sourceSearchClear = wrapper.find('.devui-transfer-source .devui-search .devui-search__clear')
        expect(sourceSearchClear.exists()).toBe(false)
        sourceSearch.setValue('成都')
        await nextTick()
        expect(sourceSearch.element.value).toBe('成都')
        expect(wrapper.find('.devui-transfer-source .devui-transfer-panel-body .devui-checkbox').text()).toBe('成都')
        const newSourceSearchClear = wrapper.find('.devui-transfer-source .devui-search .devui-search__clear')
        expect(newSourceSearchClear.exists()).toBe(true)
        newSourceSearchClear.trigger('click')
        await nextTick()
        expect(wrapper.find<HTMLInputElement>('.devui-transfer-source .devui-search input[type="text"]').element.value).toBe('')

        // 目标搜索功能
        expect(wrapper.find('.devui-transfer-target .devui-search').exists()).toBe(true)
        const targetSearch = wrapper.find<HTMLInputElement>('.devui-transfer-target .devui-search input[type="text"]')
        const targetSearchClear = wrapper.find('.devui-transfer-target .devui-search .devui-search__clear')
        expect(targetSearchClear.exists()).toBe(false)
        targetSearch.setValue('广元')
        await nextTick()
        expect(targetSearch.element.value).toBe('广元')
        expect(wrapper.find('.devui-transfer-target .devui-transfer-panel-body .devui-checkbox').text()).toBe('广元')
        const newTargetSearchClear = wrapper.find('.devui-transfer-target .devui-search .devui-search__clear')
        expect(newTargetSearchClear.exists()).toBe(true)
        newTargetSearchClear.trigger('click')
        await nextTick()
        expect(wrapper.find<HTMLInputElement>('.devui-transfer-target .devui-search input[type="text"]').element.value).toBe('')
        /**
         * 测试搜索功能 end
        */

    })

    it('d-transfer customTransfer drag work', async () => {
        const leftData = [
            {
                key: '1',
                value: 'Mark',
                age: 11,
                disabled: false,
            },
            {
                key: '2',
                value: 'Jacob',
                age: 12,
                disabled: false,
            },
            {
                key: '3',
                value: 'Danni',
                age: 13,
                disabled: false,
            },
            {
                key: '4',
                value: 'green',
                age: 14,
                disabled: false,
            },
            {
                key: '5',
                value: 'po',
                age: 15,
                disabled: false,
            },
            {
                key: '6',
                value: 'Book',
                age: 16,
                disabled: false,
            }
        ]
        const rightData = [
            {
                key: '21',
                value: 'john',
                age: 17,
                disabled: false,
            },
            {
                key: '22',
                value: 'Joke',
                age: 28,
                disabled: false,
            },
            {
                key: '23',
                value: 'Echo',
                age: 18,
                disabled: false,
            }
        ]
        const leftOptions = reactive({
            allChecked: false,
            filterData: leftData,
            checkedValues: [],
            disabled: true,
        });

        const rightOptions = reactive({
            allChecked: false,
            filterData: rightData,
            checkedValues: [],
            disabled: true
        })
        const wrapper = mount({
            components: {
                DTransfer,
                DCheckbox,
                DCheckboxGroup,
                DButton,
            },
            template: `
                <d-transfer>
                    <template #left-header>
                    <div class="custom-transfer__header">Customize Source Header</div>
                    </template>
                    <template #left-body>
                    <div class="custom-transfer__body">
                        <div class="custom-transfer__body__list custom-transfer__body__header">
                        <DCheckbox
                            class="custom-transfer__body__list__checkout"
                            v-model="leftOptions.allChecked"
                            @change="changeAllSource(leftOptions)"
                        ></DCheckbox>
                        <div class="custom-transfer__body__list__part">Id</div>
                        <div class="custom-transfer__body__list__part">Name</div>
                        <div class="custom-transfer__body__list__part">Age</div>
                        </div>
                        <DCheckboxGroup v-model="leftOptions.checkedValues">
                        <div class="custom-transfer__body__list" v-for="(item, idx) in leftOptions.filterData">
                            <DCheckbox
                                class="devui-transfer__panel__body__list__item"
                                :value="item.value"
                                :disabled="item.disabled"
                                :key="idx">
                            </DCheckbox>
                            <div class="custom-transfer__body__list__part">{{item.key}}</div>
                            <div class="custom-transfer__body__list__part">{{item.value}}</div>
                            <div class="custom-transfer__body__list__part">{{item.age}}</div>
                        </div>
                        </DCheckboxGroup>
                    </div>
                    </template>
                    <template #operation>
                    <div class="custom-transfer__operation">
                        <div class="custom-transfer__operation__group">
                        <DButton :disabled="leftOptions.disabled" @Click="updateRightFilterData" >Left</DButton>
                        <DButton style="margin-top: 12px;" :disabled="rightOptions.disabled" @click="updateLeftFilterData">Right</DButton>
                        </div>
                    </div>
                    </template>
                    <template #right-header>
                    <div class="custom-transfer__header">Customize Target Header</div>
                    </template>
                    <template #right-body>
                    <div class="custom-transfer__body">
                        <div class="custom-transfer__body__list custom-transfer__body__header">
                        <DCheckbox
                            class="custom-transfer__body__list__checkout"
                            v-model="rightOptions.allChecked"
                            @change="changeAllSource(rightOptions)"
                        ></DCheckbox>
                        <div class="custom-transfer__body__list__part">Id</div>
                        <div class="custom-transfer__body__list__part">Name</div>
                        <div class="custom-transfer__body__list__part">Age</div>
                        </div>
                        <DCheckboxGroup v-model="rightOptions.checkedValues">
                        <div class="custom-transfer__body__list" v-for="(item, idx) in rightOptions.filterData">
                            <DCheckbox
                                class="devui-transfer__panel__body__list__item"
                                :value="item.value"
                                :disabled="item.disabled"
                                :key="idx">
                            </DCheckbox>
                            <div class="custom-transfer__body__list__part">{{item.key}}</div>
                            <div class="custom-transfer__body__list__part">{{item.value}}</div>
                            <div class="custom-transfer__body__list__part">{{item.age}}</div>
                        </div>
                        </DCheckboxGroup>
                    </div>
                    </template>
                </d-transfer>
            `,
            setup() {
                watch(
                    () => leftOptions.checkedValues,
                    (nVal) => {
                        console.log('fetch', leftOptions.checkedValues)
                        rightOptions.disabled = nVal.length !== 0 ? false : true
                        leftOptions.allChecked = isEqual(nVal, leftOptions.filterData)
                    },
                    {
                        deep: true
                    }
                )

                watch(
                    () => rightOptions.checkedValues,
                    (nVal) => {
                        console.log('right', rightOptions.checkedValues)
                        leftOptions.disabled = nVal.length !== 0 ? false : true
                        rightOptions.allChecked = isEqual(nVal, rightOptions.filterData)
                    },
                    {
                        deep: true
                    }
                )

                const isEqual = (source, target) => {
                    return target.length !== 0 && source.length === target.length
                }

                const changeAllSource = (source) => {
                    if (source.allChecked) {
                        source.checkedValues = source.filterData.map(item => item.value)
                    } else {
                        source.checkedValues = []
                    }
                }

                const updateRightFilterData = () => {
                    rightOptions.filterData = rightOptions.filterData.filter(item => {
                        const hasItem = rightOptions.checkedValues.includes(item.value)
                        if (hasItem) {
                            leftOptions.filterData.push(item)
                        }
                        return !hasItem
                    })
                    rightOptions.checkedValues = []
                }

                const updateLeftFilterData = () => {
                    leftOptions.filterData = leftOptions.filterData.filter(item => {
                        const hasItem = leftOptions.checkedValues.includes(item.value)
                        if (hasItem) {
                            rightOptions.filterData.push(item)
                        }
                        return !hasItem
                    })
                    leftOptions.checkedValues = []
                }
                return {
                    leftOptions,
                    rightOptions,
                    changeAllSource,
                    updateRightFilterData,
                    updateLeftFilterData
                }
            }
        })

        /**
         * 测试自定义穿梭框 start
        */
        const sourceWrapper = wrapper.find('.devui-transfer-source')
        const tragetWrapper = wrapper.find('.devui-transfer-target')
        const leftHeader = sourceWrapper.find('.custom-transfer__header')
        const rightHeader = tragetWrapper.find('.custom-transfer__header')
        expect(leftHeader.text()).toBe('Customize Source Header')
        expect(rightHeader.text()).toBe('Customize Target Header')

        const buttons = wrapper.findAllComponents({ name: 'DButton' })
        expect(buttons[0].props().disabled).toBe(true)
        expect(buttons[1].props().disabled).toBe(true)
        const leftLabel = sourceWrapper.findAll('.devui-checkbox-group label')
        expect(leftLabel.length).toBe(6)
        expect(tragetWrapper.findAll('.devui-checkbox-group label').length).toBe(3)
        leftLabel[0].trigger('click')
        await nextTick()
        leftLabel[1].trigger('click')
        await nextTick()
        expect(buttons[1].props().disabled).toBe(false)
        wrapper.findAll('.devui-btn')[1].trigger('click')
        await nextTick()
        expect(sourceWrapper.findAll('.devui-checkbox-group label').length).toBe(4)
        expect(tragetWrapper.findAll('.devui-checkbox-group label').length).toBe(5)

        const rightLabel = tragetWrapper.findAll('.devui-checkbox-group label')
        rightLabel[0].trigger('click')
        await nextTick()
        rightLabel[1].trigger('click')
        await nextTick()
        rightLabel[2].trigger('click')
        await nextTick()
        rightLabel[3].trigger('click')
        await nextTick()
        rightLabel[4].trigger('click')
        await nextTick()
        expect(tragetWrapper.findAll('.active').length).toBe(4)
        expect(buttons[0].props().disabled).toBe(false)
        wrapper.findAll('.devui-btn')[0].trigger('click')
        await nextTick()
        expect(sourceWrapper.findAll('.devui-checkbox-group label').length).toBe(9)
        expect(tragetWrapper.findAll('.devui-checkbox-group label').length).toBe(0)
        /**
         * 测试自定义穿梭框 end
        */
    })

    // it('d-transfer tooltips work', async () => {
    //     const sourceOption = ref(SOURCE_DATA)
    //     const targetOption = ref(TARGET_DATA)
    //     const wrapper = mount({
    //         components: {
    //             DTransfer
    //         },
    //         template: `
    //             <d-transfer
    //                 v-model="modelValues"
    //                 :titles="titles"
    //                 :sourceOption="source"
    //                 :targetOption="target"
    //                 :showTooltip="isShowTooltip"
    //             >
    //             </d-transfer>
    //         `,
    //         setup() {
    //             return {
    //                 modelValues: ref(['成都', '绵阳']),
    //                 titles: ref(['sourceHeader', 'targetHeader']),
    //                 source: sourceOption,
    //                 target: targetOption,
    //                 isShowTooltip: ref(true)
    //             }
    //         }
    //     })

    //     /**
    //      * 测试穿梭框渲染 start
    //     */
    //     expect(wrapper.find('.devui-transfer-source').exists()).toBe(true)
    //     expect(wrapper.find('.devui-transfer-target').exists()).toBe(true)
    //     expect(wrapper.findAll('.devui-transfer-source .devui-tooltip').length).toBe(8)
    //     expect(wrapper.findAll('.devui-transfer-source .devui-transfer-panel-body .devui-checkbox').length).toBe(8)
    //     /**
    //      * 测试穿梭框渲染 end
    //     */


    //     /**
    //      * 测试穿梭框tooltip start
    //     */
    //     expect(wrapper.find('.devui-transfer-source').exists()).toBe(true)
    //     expect(wrapper.find('.devui-transfer-target').exists()).toBe(true)
    //     expect(wrapper.findAll('.devui-transfer-source .devui-transfer-panel-body .devui-checkbox').length).toBe(8)
    //     expect(wrapper.findAll('.devui-transfer-target .devui-transfer-panel-body .devui-checkbox').length).toBe(5)
    //     const sourceTooltips = wrapper.findAll<HTMLDivElement>('.devui-transfer-source .devui-tooltip')
    //     const targetTooltips = wrapper.findAll('.devui-transfer-target .devui-tooltip')
    //     expect(sourceTooltips.length).toBe(8)
    //     expect(targetTooltips.length).toBe(5)
    //     expect(sourceTooltips[0].find('.tooltip').exists()).toBe(false)


    //     const sourceBody = wrapper.find('.devui-transfer-source .devui-transfer-panel-body')
    //     const checkboxC = sourceBody.findComponent(DTooltip)
    //     const slotElement = checkboxC.find('.devui-checkbox-column-margin')
    //     slotElement.trigger('mouseenter')
    //     console.log(slotElement.classes())
    //     await nextTick()
    //     console.log(checkboxC.find('.tooltip'))



    //     /**
    //      * 测试穿梭框tooltip end
    //     */
    // })

    it('d-transfer source drag work', async () => {
        const sourceOption = ref(SOURCE_DATA)
        const targetOption = ref(TARGET_DATA)
        const wrapper = mount({
            components: {
                DTransfer
            },
            template: `
                <d-transfer
                    v-model="modelValues"
                    :titles="titles"
                    :sourceOption="source"
                    :targetOption="target"
                    :isSourceDroppable="isSourceDroppable"
                    ref="myTransfer"
                >
                </d-transfer>
            `,
            setup() {
                return {
                    modelValues: ref(['成都', '绵阳']),
                    titles: ref(['sourceHeader', 'targetHeader']),
                    source: sourceOption,
                    target: targetOption,
                    isSourceDroppable: ref(true)
                }
            }
        })


        /**
         * 测试穿梭框拖拽排序 start
        */
        const left = wrapper.find('.devui-transfer-source')
        const leftTransfer = left.findComponent({ name: 'DTransferBase' })
        const leftOption = leftTransfer.props().sourceOption
        const startDragItemIndex = leftOption.findIndex(item => item.value === '成都')
        const startDropItemIndex = leftOption.findIndex(item => item.value === '上海')
        expect(startDragItemIndex).toBe(4)
        expect(startDropItemIndex).toBe(1)
        leftTransfer.props().onDragend(leftOption[startDragItemIndex], leftOption[startDropItemIndex])
        await nextTick()
        const endDragItemIndex = leftOption.findIndex(item => item.value === '成都')
        const endDropItemIndex = leftOption.findIndex(item => item.value === '上海')
        expect(endDragItemIndex).toBe(1)
        expect(endDropItemIndex).toBe(4)
        /**
         * 测试穿梭框拖拽排序 end
        */
    })

    it('d-transfer target drag work', async () => {
        const sourceOption = ref(SOURCE_DATA)
        const targetOption = ref(TARGET_DATA)
        const wrapper = mount({
            components: {
                DTransfer
            },
            template: `
                <d-transfer
                    v-model="modelValues"
                    :titles="titles"
                    :sourceOption="source"
                    :targetOption="target"
                    :isSourceDroppable="isSourceDroppable"
                    ref="myTransfer"
                >
                </d-transfer>
            `,
            setup() {
                return {
                    modelValues: ref(['成都', '绵阳']),
                    titles: ref(['sourceHeader', 'targetHeader']),
                    source: sourceOption,
                    target: targetOption,
                    isSourceDroppable: ref(true)
                }
            }
        })


        /**
         * 测试穿梭框拖拽排序 start
        */
        const transfer = wrapper.findComponent({ name: 'DTransfer' })
        const rightTransfer = wrapper.find('.devui-transfer-target').findComponent({ name: 'DTransferBase' })
        const rightOption = transfer.props().targetOption
        const startDragItemIndex = rightOption.findIndex(item => item.value === '大连')
        const startDropItemIndex = rightOption.findIndex(item => item.value === '广元')
        expect(startDragItemIndex).toBe(3)
        expect(startDropItemIndex).toBe(1)
        rightTransfer.props().onDragend(rightOption[startDragItemIndex], rightOption[startDropItemIndex])
        await nextTick()
        const endDragItemIndex = rightOption.findIndex(item => item.value === '大连')
        const endDropItemIndex = rightOption.findIndex(item => item.value === '广元')
        expect(endDragItemIndex).toBe(3)
        expect(endDropItemIndex).toBe(1)
        /**
         * 测试穿梭框拖拽排序 end
        */
    })
})
