import { defineComponent, reactive, watch, ref } from 'vue'
import { TState } from '../types'
import DTransferBase from './transfer-base'
import DTransferOperation from './transfer-operation'
import { initState } from '../__tests__/use-transfer-base'
import { transferProps, TransferProps } from '../__tests__/use-transfer'
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
  setup(props: TransferProps) {
    /** data start **/
    const leftOptions = reactive<TState>(initState(props, 'source'))
    const rightOptions = reactive<TState>(initState(props, 'target'))
    const origin = ref(null);
    /** data end **/

    /** watch start **/
    watch(
      () => leftOptions.query,
      (nVal: string): void => {
        leftOptions.filterData = leftOptions.data.filter(item => item.key.indexOf(nVal) !== -1)
      }
    )

    watch(
      () => leftOptions.checkedValues,
      (values: string[]): void => {
        leftOptions.checkedNum = values.length
        setAllCheckedState(leftOptions, values)
      },
      {
        deep: true
      }
    )

    watch(
      () => rightOptions.query,
      (nVal: string): void => {
        rightOptions.filterData = rightOptions.data.filter(item => item.key.indexOf(nVal) !== -1)
      },
    )

    watch(
      () => rightOptions.checkedValues,
      (values: string[]): void => {
        rightOptions.checkedNum = values.length;
        setAllCheckedState(rightOptions, values)
      },
      {
        deep: true
      }
    )

    /** watch end **/

    /** methods start **/
    const setAllCheckedState = (source: TState, value: string[]): void => {
      if (origin.value === 'click') {
        source.allChecked = false
      } else {
        source.allChecked = value.length === source.filterData.filter(item => !item.disabled).length ? true : false
      }
    }

    const updateFilterData = (source: TState, target: TState): void => {
      const newData = []
      source.filterData = source.data = source.filterData.filter(item => {
        const hasInclues = source.checkedValues.includes(item.value)
        hasInclues && newData.push(item)
        return !hasInclues
      })
      target.filterData = target.data = target.filterData.concat(newData)
      source.checkedValues = []
      target.disabled = !target.disabled
      setOrigin('click')
    }
    const changeAllSource = (source: TState, value: boolean): void => {
      if (source.filterData.every(item => item.disabled)) return
      source.allChecked = value
      if (value) {
        source.checkedValues = source.filterData.filter(item => !item.disabled)
          .map(item => item.value)
      } else {
        source.checkedValues = []
      }
      setOrigin('change')
    }
    const updateLeftCheckeds = (values: string[]): void => {
      leftOptions.checkedValues = values
      setOrigin('change')
    }
    const updateRightCheckeds = (values: string[]): void => {
      rightOptions.checkedValues = values
      setOrigin('change')
    }
    const setOrigin = (value: string): void => {
      origin.value = value
    }
    /** methods end **/

    return () => {
      return <div class="devui-transfer">
        <DTransferBase
          style={{
            height: props.height
          }}
          sourceOption={leftOptions.filterData}
          title={props.titles[0]}
          type="source"
          search={props.isSearch}
          allChecked={leftOptions.allChecked}
          checkedNum={leftOptions.checkedNum}
          query={leftOptions.query}
          checkedValues={leftOptions.checkedValues}
          onChangeAllSource={(value) => changeAllSource(leftOptions, value)}
          onUpdateCheckeds={updateLeftCheckeds}
          onChangeQuery={(value) => leftOptions.query = value}
        />
        <DTransferOperation
          disabled={props.disabled}
          sourceDisabled={rightOptions.checkedNum > 0 ? false : true}
          targetDisabled={leftOptions.checkedNum > 0 ? false : true}
          onUpdateSourceData={() => { updateFilterData(rightOptions, leftOptions) }}
          onUpdateTargetData={() => { updateFilterData(leftOptions, rightOptions) }}
        />
        <DTransferBase
          style={{
            height: props.height
          }}
          sourceOption={rightOptions.filterData}
          title={props.titles[1]}
          type="target"
          search={props.isSearch}
          allChecked={rightOptions.allChecked}
          checkedNum={rightOptions.checkedNum}
          query={rightOptions.query}
          checkedValues={rightOptions.checkedValues}
          onChangeAllSource={(value) => changeAllSource(rightOptions, value)}
          onUpdateCheckeds={updateRightCheckeds}
          onChangeQuery={(value) => rightOptions.query = value}
        />
      </div>
    }
  }
})