export const getRelativePointer = (
  { x, y }: PointerEvent,
  { top, left }: DOMRect
): Partial<DOMRect> => ({
  x: x - left,
  y: y - top
});
