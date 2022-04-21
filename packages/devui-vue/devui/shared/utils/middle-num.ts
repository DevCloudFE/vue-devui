/**
 * Get Middle Value
 *
 * @param num to judge the value
 * @param min min value, default value 0
 * @param max max value, default value 100
 * @returns middle value
 */
export function middleNum (num: number, min = 0, max = 100): number {
  let middle = 0;
  middle = Math.min(num, max);
  middle = Math.max(middle, min);
  return middle;
}
