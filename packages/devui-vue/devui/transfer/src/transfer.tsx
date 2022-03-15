import { defineComponent, reactive, watch, ref, SetupContext } from 'vue';
import { TState, IItem } from '../types';
import DTransferBase from './transfer-base';
import DTransferOperation from './transfer-operation';
import { initState } from '../common/use-transfer-base';
import { transferProps, TransferProps, headerSlot, bodySlot, opeartionSlot } from '../common/use-transfer';
import DCheckbox from '../../checkbox/src/checkbox';
import './transfer.scss';

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
    let leftOptions = reactive<TState>(initState(props, 'source'));
    let rightOptions = reactive<TState>(initState(props, 'target'));
    const origin = ref(null);
    /** data end **/

    /** watch start **/
    watch(
      () => props.sourceOption,
      () => {
        leftOptions = reactive<TState>(initState(props, 'source'));
      }
    );

    watch(
      () => props.targetOption,
      () => {
        rightOptions = reactive<TState>(initState(props, 'target'));
      }
    );

    watch(
      () => leftOptions.keyword,
      (): void => {
        searchFilterData(leftOptions);
      }
    );

    watch(
      () => leftOptions.checkedValues,
      (values: string[]): void => {
        leftOptions.checkedNum = values.length;
        setAllCheckedState(leftOptions, values);
      },
      {
        deep: true
      }
    );

    watch(
      () => rightOptions.keyword,
      (): void => {
        searchFilterData(rightOptions);
      },
    );

    watch(
      () => rightOptions.checkedValues,
      (values: string[]): void => {
        rightOptions.checkedNum = values.length;
        setAllCheckedState(rightOptions, values);
      },
      {
        deep: true
      }
    );

    /** watch end **/

    /** methods start **/
    const setAllCheckedState = (source: TState, value: string[]): void => {
      if (origin.value === 'click') {
        source.allChecked = false;
      } else {
        source.allChecked = value.length === source.data.filter(item => !item.disabled).length ? true : false;
      }
    };

    const updateFilterData = async (source: TState, target: TState, direction: string): Promise<void> => {
      if (isFunction('beforeTransfer')) {
        const res: boolean = await props.beforeTransfer.call(null, source, target);
        if (typeof res === 'boolean' && res === false) {
          return;
        }
      }

      const hasToSource = isFunction('transferToSource');
      const hasToTarget = isFunction('transferToTarget');
      const hasTransfering = isFunction('transferring');
      if (hasToSource || hasToTarget) {
        direction === 'right' && props.transferToSource.call(null, source, target);
        direction === 'left' && props.transferToTarget.call(null, source, target);
      } else {
        source.data = source.data.filter(item => {
          const hasInclues = source.checkedValues.includes(item.value);
          hasInclues && target.data.push(item);
          return !hasInclues;
        });
      }
      if (hasTransfering) {
        props.transferring.call(null, target);
      }
      source.checkedValues = [];
      target.disabled = !target.disabled;
      searchFilterData(source, target);
      searchFilterData(target, source);
      setOrigin('click');
      isFunction('afterTransfer') && props.afterTransfer.call(null, target);
    };
    const changeAllSource = (source: TState, value: boolean): void => {
      if (source.filterData.every(item => item.disabled)) {return;}
      source.allChecked = value;
      if (value) {
        source.checkedValues = source.filterData.filter(item => !item.disabled)
          .map(item => item.value);
      } else {
        source.checkedValues = [];
      }
      setOrigin('change');
    };
    const updateLeftCheckeds = (values: string[]): void => {
      leftOptions.checkedValues = values;
      setOrigin('change');
    };
    const updateRightCheckeds = (values: string[]): void => {
      rightOptions.checkedValues = values;
      setOrigin('change');
    };
    const searchFilterData = (source: TState, target?: TState): void => {
      source.filterData = source.data.filter(item => item.key.indexOf(source.keyword) !== -1);
      if (target) {
        target.allChecked = false;
      }
    };

    const setOrigin = (value: string): void => {
      origin.value = value;
    };
    const changeQueryHandle = (source: TState, direction: string, value: string): void => {
      if (props?.searching && typeof props.searching === 'function') {
        props.searching.call(null, direction, value, source);
        return;
      }
      source.keyword = value;
    };

    const isFunction = (type: string): boolean => {
      return props[type] && typeof props[type] === 'function';
    };

    const dataSort = (target: TState, dragItem: IItem, dropItem: IItem, direction: string) => {
      const startIndex = target.filterData.findIndex(item => item.key === dragItem.key);
      const endIndex = target.filterData.findIndex(item => item.key === dropItem.key);
      target.filterData.splice(endIndex, 1, dragItem);
      target.filterData.splice(startIndex, 1, dropItem);
      props.onDragend && props.onDragend(direction, dragItem, dropItem);
    };
    /** methods end **/

    return () => {
      return <div class="devui-transfer">
        <DTransferBase
          sourceOption={leftOptions.filterData}
          title={props.titles[0]}
          type="source"
          search={props.isSearch}
          allChecked={leftOptions.allChecked}
          checkedNum={leftOptions.checkedNum}
          filter={leftOptions.keyword}
          height={props.height}
          checkedValues={leftOptions.checkedValues}
          allCount={leftOptions.data.length}
          showTooltip={props.showTooltip}
          tooltipPosition={props.tooltipPosition}
          isSourceDroppable={props.isSourceDroppable}
          v-slots={
            {
              header: headerSlot(ctx, 'left'),
              body: bodySlot(ctx, 'left')
            }
          }
          onChangeAllSource={(value) => changeAllSource(leftOptions, value)}
          onUpdateCheckeds={updateLeftCheckeds}
          onChangeQuery={(value) => changeQueryHandle(leftOptions, 'left', value)}
          onDragend={(dragItem, dropItem) => dataSort(leftOptions, dragItem, dropItem, 'left')}
        />
        <DTransferOperation
          v-slots={{
            operation: opeartionSlot(ctx)
          }}
          disabled={props.disabled}
          sourceDisabled={rightOptions.checkedNum > 0 ? false : true}
          targetDisabled={leftOptions.checkedNum > 0 ? false : true}
          onUpdateSourceData={() => { updateFilterData(rightOptions, leftOptions, 'left'); }}
          onUpdateTargetData={() => { updateFilterData(leftOptions, rightOptions, 'right'); }}
        />
        <DTransferBase
          v-slots={
            {
              header: headerSlot(ctx, 'right'),
              body: bodySlot(ctx, 'right')
            }
          }
          sourceOption={rightOptions.filterData}
          title={props.titles[1]}
          type="target"
          search={props.isSearch}
          allChecked={rightOptions.allChecked}
          checkedNum={rightOptions.checkedNum}
          filter={rightOptions.keyword}
          height={props.height}
          checkedValues={rightOptions.checkedValues}
          allCount={rightOptions.data.length}
          showTooltip={props.showTooltip}
          tooltipPosition={props.tooltipPosition}
          isTargetDroppable={props.isTargetDroppable}
          onChangeAllSource={(value) => changeAllSource(rightOptions, value)}
          onUpdateCheckeds={updateRightCheckeds}
          onChangeQuery={(value) => changeQueryHandle(rightOptions, 'right', value)}
          onDragend={(dragItem, dropItem) => dataSort(rightOptions, dragItem, dropItem, 'right')}
        />
      </div>;
    };
  }
});
