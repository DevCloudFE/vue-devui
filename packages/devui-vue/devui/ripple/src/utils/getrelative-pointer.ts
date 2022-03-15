export const getRelativePointer = (
  { x, y }: PointerEvent,
  { top, left }: DOMRect
) => ({
  x: x - left,
  y: y - top
});
