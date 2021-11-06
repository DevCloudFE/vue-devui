import { defineComponent, PropType, ref, Slot } from "vue";
import { CustomFilterSlot, FilterList } from "../../column/column.type";


export const Filter = defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<FilterList>,
      default: []
    },
    'onUpdate:modelValue': {
      type: Function as PropType<(v: FilterList) => void>
    },
    customTemplate: {
      type: Function as PropType<CustomFilterSlot>
    },
  },
  emits: ['update:modelValue'],
  setup(props) {

    const showDropdown = ref(true);

    const handleFilter = () => {
      showDropdown.value = true;
    }

    return () => (
      <>
        <span onClick={handleFilter}>
          <i
            class={["filter-icon", {
              'filter-icon-active': true,
            }]}
          >
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
        <Dropdown v-model:visible={showDropdown.value}>
          {props.customTemplate?.({ value: props.modelValue, onChange: props["onUpdate:modelValue"] }) ?? (
            <div></div>
          )}
        </Dropdown>
      </>
    )
  }
});


// TODO: 缺少 dropdown 组件
const Dropdown = defineComponent({
  props: {
    visible: { type: Boolean },
    'onUpdate:visible': { type: Function },
  },
  setup(props) {
    return () => (
      <div>test</div>
    );
  }
});