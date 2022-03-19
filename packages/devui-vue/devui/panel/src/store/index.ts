import { ref, reactive } from 'vue';

export const option = reactive<Record<string, unknown>>({});

class Store {
  public static getByKey(timeStamp: string): unknown {
    return option[timeStamp];
  }
  public static state(): Record<string, unknown> {
    return option;
  }
  public static setData(key: string, value: unknown): void {
    option[key] = ref(value);
  }
}

export default Store;
