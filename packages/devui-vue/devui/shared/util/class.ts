/**
 * 判断 DOM 中的元素是否含有某个类
 * @param el 元素
 * @param className 类名
 * @returns
 */
export function hasClass(el: HTMLElement, className: string): boolean {
  if (el.classList) {
    return el.classList.contains(className);
  }
  const originClass = el.className;
  return ` ${originClass} `.indexOf(` ${className} `) > -1;
}

/**
 * 向 DOM 中的元素添加一个类
 * @param el 元素
 * @param className 类名
 */
export function addClass(el: HTMLElement, className: string): void {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!hasClass(el, className)) {
      el.className = `${el.className} ${className}`;
    }
  }
}

/**
 * 从 DOM 中的元素移除一个类
 * @param el 元素
 * @param className 类名
 */
export function removeClass(el: HTMLElement, className: string): void {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    if (hasClass(el, className)) {
      const originClass = el.className;
      el.className = ` ${originClass} `.replace(` ${className} `, ' ');
    }
  }
}
