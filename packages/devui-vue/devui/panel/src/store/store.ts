/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ref,reactive} from 'vue';

export const option = reactive({}) as Record<string,unknown>;

class Store {
  public static getByKey(timeStamp: string){
    return option[timeStamp];
  }
  public static state() {
    return option;
  }
  public static setData(key: string ,value: unknown){
    option[key] = ref(value);
  }
}

export default Store;
