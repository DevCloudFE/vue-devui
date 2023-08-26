export interface FoucusLayer {
  pause: () => void;
  resume: () => void;
}
const removeFromStack = (stack: FoucusLayer[], layer: FoucusLayer) => {
  const temp = [...stack];
  const index = temp.findIndex((item) => item === layer);
  if (index !== -1) {
    temp.splice(index, 1);
  }
  return temp;
};
const createFocusStack = () => {
  let stack: FoucusLayer[] = [];
  const push = (layer: FoucusLayer) => {
    const len = stack.length;
    const curLayer = stack[len - 1];
    if (curLayer && curLayer !== layer) {
      curLayer.pause();
    }
    stack.push(layer);
  };
  const remove = (layer: FoucusLayer) => {
    stack = removeFromStack(stack, layer);
    stack[stack.length - 1]?.resume();
  };
  return { push, remove };
};
export const focusStack = createFocusStack();
