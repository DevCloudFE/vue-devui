import { defineComponent, reactive, computed } from 'vue'
import DTransferBase from './transfer-base'
import DTransferOperation from './transfer-operation'
import { transferProps, TransferProps, IItem } from '../__tests__/use-transfer'
import DCheckbox from '../..//checkbox/src/checkbox'
import './transfer.scss'

export default defineComponent({
  name: 'DTransfer',
  components: {
    DTransferBase,
    DTransferOperation,
    DCheckbox
  },
  props: transferProps,
  setup(props: TransferProps, ctx) {
    const sourceDataOptions = reactive({
      data: props.sourceOption,
      allChecked: false,
      disabled: true,
      checkedNum: props.modelValue.length,
      query: '',
      modelValue: props.modelValue,
      filterData: computed(() => {
        return sourceDataOptions.data.filter((item) => {
          if (item.key.indexOf(sourceDataOptions.query) !== -1) {
            return Object.assign(item, {
              checked: sourceDataOptions.modelValue.some(cur => cur === item.value)
            })
          }
        })
      }),
      changeAllSource: (): void => {
        sourceDataOptions.allChecked = !sourceDataOptions.allChecked
        if (sourceDataOptions.allChecked) {
          sourceDataOptions.filterData.map(item => {
            if (!item.disabled && !item.checked) {
              sourceDataOptions.modelValue.push(item.value)
            }
          })
        } else {
          sourceDataOptions.modelValue = []
        }
        sourceDataOptions.setCheckedNum()
        targetDataOptions.setDisabled(!sourceDataOptions.modelValue.length ? true : false)
      },
      sourceChangeSource: (item: IItem, idx: number): void => {
        if (!item.checked) {
          sourceDataOptions.modelValue.push(item.value)
        } else {
          sourceDataOptions.modelValue = sourceDataOptions.modelValue.filter(cur => cur !== item.value)
        }
        sourceDataOptions.setCheckedNum()
        targetDataOptions.setDisabled(!sourceDataOptions.modelValue.length ? true : false)
      },
      updateData: (): void => {
        targetDataOptions.data = targetDataOptions.data.filter(item => {
          if (item.checked) {
            sourceDataOptions.data.push({
              ...item,
              checked: false
            })
            targetDataOptions.modelValue = targetDataOptions.modelValue.filter(cur => cur !== item.value)
          }
          return item.checked !== true;
        })
        targetDataOptions.setState()
      },
      setDisabled: (value: boolean): void => {
        sourceDataOptions.disabled = value
      },
      setState: (): void => {
        targetDataOptions.disabled = true
        sourceDataOptions.checkedNum = 0
        sourceDataOptions.allChecked = false
      },
      changeQuery: (val: string): void => {
        sourceDataOptions.query = val;
      },
      setCheckedNum: (): void => {
        sourceDataOptions.checkedNum = sourceDataOptions.modelValue.length
        sourceDataOptions.allChecked = sourceDataOptions.checkedNum === sourceDataOptions.filterData.length
      }
    })

    const targetDataOptions = reactive({
      data: props.targetOption,
      allChecked: false,
      query: '',
      disabled: props.modelValue.length ? false : true,
      checkedNum: 0,
      modelValue: [],
      filterData: computed(() => {
        return targetDataOptions.data.filter((item) => {
          if (item.key.indexOf(targetDataOptions.query) !== -1) {
            return Object.assign(item, {
              checked: targetDataOptions.modelValue.some(cur => cur === item.value)
            })
          }
        })
      }),
      changeAllTarget: (): void => {
        targetDataOptions.allChecked = !targetDataOptions.allChecked
        if (targetDataOptions.allChecked) {
          targetDataOptions.data.map(item => {
            if (!item.disabled && !item.checked) {
              targetDataOptions.modelValue.push(item.value)
            }
          })
        } else {
          targetDataOptions.modelValue = []
        }
        targetDataOptions.setCheckedNum()
        sourceDataOptions.setDisabled(!targetDataOptions.modelValue.length ? true : false)
      },
      targetChangeSource: (item: IItem, idx: number): void => {
        if (!item.checked) {
          targetDataOptions.modelValue.push(item.value)
        } else {
          targetDataOptions.modelValue = targetDataOptions.modelValue.filter(cur => cur !== item.value)
        }
        targetDataOptions.setCheckedNum()
        sourceDataOptions.setDisabled(!targetDataOptions.modelValue.length ? true : false)
      },
      updateData: (): void => {
        sourceDataOptions.data = sourceDataOptions.data.filter(item => {
          if (item.checked) {
            targetDataOptions.data.push({
              ...item,
              checked: false
            })
            sourceDataOptions.modelValue = sourceDataOptions.modelValue.filter(cur => cur !== item.value)
          }
          return item.checked !== true
        })
        sourceDataOptions.setState()
      },
      setDisabled: (value: boolean): void => {
        targetDataOptions.disabled = value
      },
      setState: (): void => {
        sourceDataOptions.disabled = true
        targetDataOptions.checkedNum = 0
        targetDataOptions.allChecked = false
      },
      changeQuery: (val: string): void => {
        targetDataOptions.query = val
      },
      setCheckedNum: (): void => {
        targetDataOptions.checkedNum = targetDataOptions.modelValue.length
        targetDataOptions.allChecked = targetDataOptions.checkedNum === targetDataOptions.filterData.length
      }
    })
    const transferStyle = {
      height: props.height,
    }

    return () => {
      return <div class="devui-transfer">
        <DTransferBase
          style={transferStyle}
          sourceOption={sourceDataOptions.filterData}
          title={props.titles[0]}
          type="source"
          filterable={props.filterable}
          allChecked={sourceDataOptions.allChecked}
          checkedNum={sourceDataOptions.checkedNum}
          query={sourceDataOptions.query}
          onChangeSource={sourceDataOptions.sourceChangeSource}
          onChangeAllSource={sourceDataOptions.changeAllSource}
          onChangeQuery={sourceDataOptions.changeQuery}
        />
        <DTransferOperation
          sourceDisabled={sourceDataOptions.disabled}
          targetDisabled={targetDataOptions.disabled}
          onUpdateSourceData={sourceDataOptions.updateData}
          onUpdateTargetData={targetDataOptions.updateData}
        />
        <DTransferBase
          style={transferStyle}
          sourceOption={targetDataOptions.filterData}
          title={props.titles[1]}
          type="target"
          filterable={props.filterable}
          allChecked={targetDataOptions.allChecked}
          checkedNum={targetDataOptions.checkedNum}
          query={targetDataOptions.query}
          onChangeSource={targetDataOptions.targetChangeSource}
          onChangeAllSource={targetDataOptions.changeAllTarget}
          onChangeQuery={targetDataOptions.changeQuery}
        />
      </div>
    }
  }
})