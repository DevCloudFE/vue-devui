export function formatWidth(width: number | string): number | string {
  if (width === '') {
    return width;
  }
  if (typeof width === 'number') {
    return width;
  }

  return parseInt(width, 10) || 80;
}
