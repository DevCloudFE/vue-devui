export function isUrl(value: string): boolean {
  return /^((http|https):)?\/\//.test(value);
}

export function isBase64(value: string): boolean {
  return /^data:image\/.*;base64,/.test(value);
}
