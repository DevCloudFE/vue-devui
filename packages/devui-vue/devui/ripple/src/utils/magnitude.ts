export function magnitude(x1: number, y1: number, x2: number, y2: number): number {
  const deltaX = x1 - x2;
  const deltaY = y1 - y2;

  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
