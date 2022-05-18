export function isUrl(value: string): boolean {
  return /^((http|https):)?\/\//.test(value);
}
