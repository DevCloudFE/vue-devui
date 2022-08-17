
// Pythagorean theorem
export function magnitude(x1: number, y1: number, x2: number, y2: number): number {
  const deltaX = x1 - x2;
  const deltaY = y1 - y2;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// 获取点击目标的位置到块级作用域边界的距离
export function getDistanceToFurthestCorner(x: number, y: number, { width, height }: DOMRect): number {
  const topLeft = magnitude(x, y, 0, 0);
  const topRight = magnitude(x, y, width, 0);
  const bottomLeft = magnitude(x, y, 0, height);
  const bottomRight = magnitude(x, y, width, height);
  return Math.max(topLeft, topRight, bottomLeft, bottomRight);
}

// 获取点击距离container元素直角坐标
export const getRelativePointer = ({ x, y }: PointerEvent, { top, left }: DOMRect): Partial<DOMRect> => ({
  x: x - left,
  y: y - top,
});
