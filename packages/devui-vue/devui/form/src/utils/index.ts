
import eventBus from './event-bus';
export const EventBus = eventBus;

export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}

export function hasKey(obj: any, key: string | number | symbol): boolean {
  if (!isObject(obj)) {return false;}
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function getElOffset(curEl: HTMLElement) {
  let totalLeft = 0;
  let totalTop = 0;
  let par: Partial<HTMLElement> = curEl.offsetParent;
  // 首先把自己本身的相加
  totalLeft += curEl.offsetLeft;
  totalTop += curEl.offsetTop;
  // 现在开始一级一级往上查找，只要没有遇到body，把父级参照物的边框和偏移相加
  while (par){
    if (navigator.userAgent.indexOf('MSIE 8.0') === -1){ // 不是IE8才进行累加父级参照物的边框
      totalTop += par.clientTop;
      totalLeft += par.clientLeft;
    }
    totalTop += par.offsetTop;
    totalLeft += par.offsetLeft;
    par = par.offsetParent;
  }
  return {left: totalLeft, top: totalTop};
}

// 将驼峰转化为中间连接符
export function transformCamelToDash(str = '') {
  let res = '';
  for(let i = 0; i < str.length; i++) {
    if(/[A-Z]/.test(str[i])) {
      res += '-' + str[i].toLocaleLowerCase();
    }
    else {
      res += str[i];
    }
  }
  return res;
}
