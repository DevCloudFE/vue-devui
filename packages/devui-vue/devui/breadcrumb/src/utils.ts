export const getPropsSlot = (slots: any, props: any, prop = 'default') => {
  return props[prop] ?? slots[prop]?.();
};
