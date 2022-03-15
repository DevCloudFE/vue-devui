export function formatWidth(width: number | string): number {
  if (typeof width === 'number') {
    return width;
  }

  return parseInt(width, 10) || 0;
}

export function formatMinWidth(minWidth: number | string): number {
  return formatWidth(minWidth) || 80;
}
