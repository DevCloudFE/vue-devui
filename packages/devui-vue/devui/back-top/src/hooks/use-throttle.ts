export default function (fn, delay) {
  let last = null;
  return (...args) => {
    const now = +Date.now();
    if (now - last > delay) {
      last = now;
      return fn.apply(this, args);
    }
  };
}
