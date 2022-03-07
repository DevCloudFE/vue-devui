import { defineComponent, PropType, ref, computed } from 'vue';
import { CustomFilterSlot, FilterConfig, FilterResults } from '../../column/column.type';
import { Dropdown } from '../../../../dropdown';
import { Checkbox } from '../../../../checkbox';

import './filter.scss';


export const Filter = defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<FilterResults>,
      default: []
    },
    'onUpdate:modelValue': {
      type: Function as PropType<(v: FilterResults) => void>
    },
    customTemplate: {
      type: Function as PropType<CustomFilterSlot>
    },
    filterList: {
      type: Array as PropType<FilterConfig[]>,
      required: true
    },
    filterMultiple: {
      type: Boolean,
      default: true
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const filterOrigin = ref<HTMLElement>(null);

    // 多选逻辑
    const onUpdateChecked = (config: FilterConfig, value: boolean) => {
      const checkedList = props.modelValue;
      const update = props['onUpdate:modelValue'];
      const contained = !!checkedList.find(item => item === config.value);
      if (value && !contained) {
        update?.([...checkedList, config.value]);
      } else if (!value && contained) {
        update?.(checkedList.filter(item => config.value !== item));
      }
    }

    // 单选逻辑
    const updateSingleChecked = (config: FilterConfig) => {
      props['onUpdate:modelValue']?.([config.value]);
    }


    const dropdownContent = computed(() => {
      const checkedList = props.modelValue;
      const isContained = (config: FilterConfig) => !!checkedList.find(item => item === config.value);
      return () => (
        <ul class="devui-dropdown-menu data-table-column-filter-content" style="padding:10px">
          {props.filterList.map((item, index) => {
            return (
              <li style={index > 0 ? 'margin-top:10px' : ''}>
                {props.filterMultiple ? (
                  <Checkbox
                    modelValue={isContained(item)}
                    onUpdate:modelValue={(value: boolean) => onUpdateChecked(item, value)}
                  >
                    {item.name}
                  </Checkbox>
                ) : (
                  <span onClick={() => updateSingleChecked(item)}>{item.name}</span>
                )}
              </li>
            )
          })}
        </ul>
      );
    });
    return () => (
      <>
        <span ref={filterOrigin}>
          <i class={['filter-icon', { 'filter-icon-active': true }]}>
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g>
                  <polygon points="10.0085775 7 10.0085775 15 6 13 6 7 2 3 2 1 14 1 14 3"></polygon>
                </g>
              </g>
            </svg>
          </i>
        </span>
        <Dropdown origin={filterOrigin.value} closeScope="blank">
          {props.customTemplate?.({ value: props.modelValue, onChange: props['onUpdate:modelValue'] }) ?? dropdownContent.value()}
        </Dropdown>
      </>
    )
  }
});
