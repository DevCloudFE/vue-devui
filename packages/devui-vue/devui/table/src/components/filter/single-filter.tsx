import { defineComponent } from 'vue';
import type { PropType, SetupContext } from 'vue';
import { FilterConfig } from '../column/column-types';
import { List, ListItem } from '../../../../list';
import { useFilterSingle } from './use-filter';

export default defineComponent({
  props: {
    filterList: {
      type: Array as PropType<FilterConfig[]>,
      default: () => [],
    },
  },
  emits: ['select'],
  setup(props, ctx: SetupContext) {
    const { selectedItem, handleSelect } = useFilterSingle(ctx);

    return () => (
      <>
        <List class="filter-single-menu">
          {props.filterList.map((item) => (
            <ListItem
              class={['filter-item', { 'filter-item-active': selectedItem.value === item }]}
              onClick={() => {
                handleSelect(item);
              }}>
              {item.name}
            </ListItem>
          ))}
        </List>
      </>
    );
  },
});
