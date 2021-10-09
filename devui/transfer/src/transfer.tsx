import { defineComponent, reactive, watch, ref, SetupContext } from 'vue'
import { TState } from '../types'
import DTransferBase from './transfer-base'
import DTransferOperation from './transfer-operation'
import { initState } from '../common/use-transfer-base'
import { transferProps, TransferProps, headerSlot, bodySlot, opeartionSlot } from '../common/use-transfer'
import DCheckbox from '../../checkbox/src/checkbox'
import './transfer.scss'

export default defineComponent({
  name: 'DTransfer',
  components: {
    DTransferBase,
    DTransferOperation,
    DCheckbox
  },
  props: transferProps,
  setup(props: TransferProps, ctx: SetupContext) {
    /** data start **/
    const leftOptions = reactive<TState>(initState(props, 'source'))
    const rightOptions = reactive<TState>(initState(props, 'target'))
    const origin = ref(null);
    /** data end **/

    /** watch start **/
    watch(
      () => leftOptions.query,
      (nVal: string): void => {
        searchFilterData(leftOptions)
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
        searchFilterData(rightOptions)
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
        source.allChecked = value.length === source.data.filter(item => !item.disabled).length ? true : false
      }
    }

    const updateFilterData = (source: TState, target: TState): void => {
      const newData = []
      source.data = source.data.filter(item => {
        const hasInclues = source.checkedValues.includes(item.value)
        hasInclues && newData.push(item)
        return !hasInclues
      })
      target.data = target.data.concat(newData)
      source.checkedValues = []
      target.disabled = !target.disabled
      searchFilterData(source, target)
      searchFilterData(target, source)
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
    const searchFilterData = (source: TState, target?: TState): void => {
      source.filterData = source.data.filter(item => item.key.indexOf(source.query) !== -1)
      if (target) {
        target.allChecked = false
      }
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
          allCount={leftOptions.data.length}
          v-slots={
            {
              header: headerSlot(ctx, 'left'),
              body: bodySlot(ctx, 'left')
            }
          }
          onChangeAllSource={(value) => changeAllSource(leftOptions, value)}
          onUpdateCheckeds={updateLeftCheckeds}
          onChangeQuery={(value) => leftOptions.query = value}
        />
        <DTransferOperation
          v-slots={{
            operation: opeartionSlot(ctx)
          }}
          disabled={props.disabled}
          sourceDisabled={rightOptions.checkedNum > 0 ? false : true}
          targetDisabled={leftOptions.checkedNum > 0 ? false : true}
          onUpdateSourceData={() => { updateFilterData(rightOptions, leftOptions) }}
          onUpdateTargetData={() => { updateFilterData(leftOptions, rightOptions) }}
        />
        <DTransferBase
          v-slots={
            {
              header: headerSlot(ctx, 'right'),
              body: bodySlot(ctx, 'right')
            }
          }
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
          allCount={rightOptions.data.length}
          onChangeAllSource={(value) => changeAllSource(rightOptions, value)}
          onUpdateCheckeds={updateRightCheckeds}
          onChangeQuery={(value) => rightOptions.query = value}
        />
      </div>
    }
  }
})