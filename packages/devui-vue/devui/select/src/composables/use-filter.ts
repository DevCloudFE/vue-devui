import { ref, computed } from 'vue';
import { SelectProps, useFilterReturn } from '../select-types';
import { isFunction, debounce } from 'lodash';

export default function useFilter(props: SelectProps): useFilterReturn {
  const filterQuery = ref('');
  const debounceTime = computed(() => (props.remote ? 300 : 0));
  const isSupportFilter = computed(() => isFunction(props.filter) || (typeof props.filter === 'boolean' && props.filter));

  const queryChange = (query: string) => {
    filterQuery.value = query;
  };

  const handlerQueryFunc = (query: string) => {
    if (isFunction(props.filter)) {
      props.filter(query);
    } else {
      queryChange(query);
    }
  };

  const debounceQueryFilter = debounce((query: string) => {
    handlerQueryFunc(query);
  }, debounceTime.value);

  return {
    filterQuery,
    isSupportFilter,
    debounceQueryFilter,
  };
}
