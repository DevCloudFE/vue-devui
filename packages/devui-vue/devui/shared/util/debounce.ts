/**
 *
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param immediate Whether to execute immediately
 * @returns Returns the new debounced function.
 */
export function debounce<A extends Array<any>, R = void>(func: (...args: A) => R, wait: number, immediate: boolean): (...args: A) => R {
  let timer: number, result: R;
  return function (...args: A) {
    if (timer) {clearTimeout(timer);}
    if (immediate) {
      const localImmediate = !timer;
      timer = window.setTimeout(() => {
        timer = null;
      }, wait);
      if (localImmediate) {result = func.apply(this, args);}
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
    return result;
  };
}
