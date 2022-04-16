import type { VNodeProps, Ref, ShallowRef } from 'vue';
import { GetKey, CacheMap } from '../virtual-list-types';
import { watch, ref } from 'vue';

export default function useHeights<T>(
  mergedData: ShallowRef<unknown[]>,
  getKey: GetKey<T>,
): [(item: T, instance: HTMLElement & { $el: never }) => void, () => void, CacheMap, Ref<symbol>] {
  const instance = new Map<VNodeProps['key'], HTMLElement>();
  let heights = new Map();
  const updatedMark = ref(Symbol('update'));
  watch(mergedData, () => {
    heights = new Map();
    updatedMark.value = Symbol('update');
  });
  let heightUpdateId = 0;
  function collectHeight() {
    heightUpdateId += 1;
    const currentId = heightUpdateId;
    Promise.resolve().then(() => {
      if (currentId !== heightUpdateId) {return;}
      instance.forEach((element, key) => {
        if (element && element.offsetParent) {
          const { offsetHeight } = element;
          if (heights.get(key) !== offsetHeight) {
            updatedMark.value = Symbol('update');
            heights.set(key, element.offsetHeight);
          }
        }
      });
    });
  }

  function setInstance(item: T, ins: HTMLElement & { $el: never }) {
    const key = getKey(item);
    if (ins) {
      instance.set(key, ins.$el || ins);
      collectHeight();
    } else {
      instance.delete(key);
    }
  }

  return [setInstance, collectHeight, heights, updatedMark];
}
