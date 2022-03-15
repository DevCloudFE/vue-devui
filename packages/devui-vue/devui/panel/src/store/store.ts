/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ref,reactive} from 'vue';

export const option = reactive({});

class Store {
  public static getByKey(timeStamp){
    return option[timeStamp];
  }
  public static state() {
    return option;
  }
  public static setData(key,value){
    option[key] = ref(value);
  }
}

export default Store;
