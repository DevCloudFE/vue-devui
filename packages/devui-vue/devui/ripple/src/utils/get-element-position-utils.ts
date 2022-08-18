// Pythagorean theorem
export function getPythagoreanDistance(x1: number, y1: number, x2: number, y2: number): number {
  const deltaX = x1 - x2;
  const deltaY = y1 - y2;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

interface DOMRectValue {
  x: number;
  y: number;
  diameter: number;
}
// 获取点击目标的位置到块级作用域直线边界的距离
export function getDistanceToFurthestCorner(event: PointerEvent, { width, height, left, top }: DOMRect): DOMRectValue {
  const x = event.clientX - left;
  const y = event.clientY - top;
  const topLeft = getPythagoreanDistance(x, y, 0, 0);
  const topRight = getPythagoreanDistance(x, y, width, 0);
  const bottomLeft = getPythagoreanDistance(x, y, 0, height);
  const bottomRight = getPythagoreanDistance(x, y, width, height);
  const diameter = Math.max(topLeft, topRight, bottomLeft, bottomRight);
  return {
    x,
    y,
    diameter,
  };
}
