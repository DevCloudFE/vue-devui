import { ComputedRef, computed } from 'vue';
import { OptionObjectItem } from '../src/use-select';
import { KeyType } from '../src/utils';

export default function (mergeOptions: ComputedRef<OptionObjectItem[]>): any {
  const cacheOptions = computed(() => {
    const map = new Map<KeyType<OptionObjectItem, 'value'>, OptionObjectItem>();
    mergeOptions.value.forEach((item) => {
      map.set(item.value, item);
    });
    return map;
  });

  const getValuesOption = (values: KeyType<OptionObjectItem, 'value'>[]) =>
    values.map((value) => cacheOptions.value.get(value));

  return getValuesOption;
}
