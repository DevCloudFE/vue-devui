import { ComputedRef, computed } from 'vue';
import { OptionObjectItem } from '../select-types';
import { KeyType } from '../utils';

type GetValueOptionFunc = (values: KeyType<OptionObjectItem, 'value'>[]) => (OptionObjectItem | undefined)[];

export default function (mergeOptions: ComputedRef<OptionObjectItem[]>): GetValueOptionFunc {
  const cacheOptions = computed(() => {
    const map = new Map<KeyType<OptionObjectItem, 'value'>, OptionObjectItem>();
    mergeOptions.value.forEach((item) => {
      map.set(item.value, item);
    });
    return map;
  });

  const getValuesOption = (values: KeyType<OptionObjectItem, 'value'>[]) => values.map((value) => cacheOptions.value.get(value));

  return getValuesOption;
}
