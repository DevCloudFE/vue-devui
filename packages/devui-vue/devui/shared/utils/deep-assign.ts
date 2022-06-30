export function deepAssign(...objects: Record<string, unknown>[]): Record<string, unknown> {
  const isObject = (obj: unknown) => obj && typeof obj === 'object';

  return objects.reduce((prev, from) => {
    Object.keys(from).forEach(key => {
      const pVal = prev[key];
      const oVal = from[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = Array.from(new Set([...oVal, ...pVal]));
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepAssign(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
}
