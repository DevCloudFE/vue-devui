// pow  返回 基数的指数次幂 t ** power
const pow = Math.pow;
const sqrt = Math.sqrt;

export const easeOutCubic = function (x: number): number {
  return 1 - pow(1 - x, 3);
};
export const linear = (x: number): number => x;
export const easeOutExpo = function (x: number): number {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
};

export const easeInOutExpo = function (x: number): number {
  return x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? pow(2, 20 * x - 10) / 2
        : (2 - pow(2, -20 * x + 10)) / 2;
};
export const easeInExpo = function (x: number): number {
  return x === 0 ? 0 : pow(2, 10 * x - 10);
};
export const easeInOutCirc = function (x: number): number {
  return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
};

export default { easeOutCubic, linear, easeOutExpo, easeInOutExpo, easeInExpo, easeInOutCirc };
