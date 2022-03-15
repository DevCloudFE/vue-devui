type cbFn = () => void;
/* 简陋版待完善 */
function useEventListener(target: HTMLElement, event: string, cb: cbFn) {
  if (target) {target.addEventListener(event, cb);}
}

export default useEventListener;
