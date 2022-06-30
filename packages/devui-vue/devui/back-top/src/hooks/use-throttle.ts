export default function (fn: () => void, delay: number): () => void {
  let last = 0;
  return (...args) => {
    const now = +Date.now();
    if (now - last > delay) {
      last = now;
      return fn.apply(window, args);
    }
  };
}
