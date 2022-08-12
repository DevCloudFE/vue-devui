export const getPropsSlot = (slots, props, prop = 'default') => {
  return props[prop] ?? slots[prop]?.();
};
