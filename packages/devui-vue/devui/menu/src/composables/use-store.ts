interface record {
  [x: string]: {
    [eventName: string]: ((...args: any[]) => void)[];
  };
}
const recordTable: record = {};
export class Store{
  private rootMenuName: string;
  constructor(rootName: string){
    this.rootMenuName = rootName;
  }
  // Unified use [menu,menuItem,subMenu]:state:action name
  on(eventName: string, fn: (...args: any[]) => void): void{
    if (!recordTable?.[this.rootMenuName]?.[eventName]){
      Reflect.set(recordTable[this.rootMenuName],eventName, []);
    }
    recordTable[this.rootMenuName][eventName].push(fn);
  }
  emit(eventName: string, ...args: any[]): void{
    recordTable[this.rootMenuName][eventName].forEach((fn)=>fn(...args));
  }
  off(eventName: string, fn: (...args: []) => void){
    const idx = recordTable[this.rootMenuName][eventName].indexOf(fn);
    if (idx >= 0) {
      recordTable[this.rootMenuName][eventName].splice(idx, 1);
    }
  }
}

export function useStore(rootName: string){
  if (!recordTable[rootName]){
    Reflect.set(recordTable, rootName, {});
  }
  return new Store(rootName);
}
