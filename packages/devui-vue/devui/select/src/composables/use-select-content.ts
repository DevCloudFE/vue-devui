import { computed, inject, ref} from 'vue';
import { SELECT_TOKEN } from '../const';
import { SelectContentProps, OptionObjectItem, UseSelectContentReturnType } from '../select-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { className } from '../utils';
export default function useSelectCotent(props: SelectContentProps): UseSelectContentReturnType {
  const ns = useNamespace('select');
  const select = inject(SELECT_TOKEN);

  const serchQuery = ref('');
  const selectedData = computed<OptionObjectItem[]>(() => select?.selectedOptions || []);

  const isSelectDisable = computed<boolean>(() => !!select?.disabled);

  // 是否可清空
  const mergeClearable = computed<boolean>(() => {
    return !isSelectDisable.value && !!select?.allowClear && props.value.length > 0;
  });

  const selectionCls = computed(() => {
    return className(ns.e('selection'), {
      [ns.e('clearable')]: mergeClearable.value,
    });
  });

  const inputCls = computed(() => {
    return className(ns.e('input'), {
      [ns.em('input', 'lg')]: select?.size === 'lg',
      [ns.em('input', 'sm')]: select?.size === 'sm',
    });
  });

  const placeholder = computed<string>(() => select?.placeholder || '');

  const isMultiple = computed<boolean>(() => !!select?.multiple);

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    select?.handleClear();
  };

  const tagDelete = (data: OptionObjectItem) => {
    if (data && data.value){
      select?.tagDelete(data);
    }
  };

  return {
    serchQuery,
    selectedData,
    isSelectDisable,
    selectionCls,
    inputCls,
    placeholder,
    isMultiple,
    handleClear,
    tagDelete
  };
}
