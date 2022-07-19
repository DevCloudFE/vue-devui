export const wait = (delay = 300): Promise<boolean> => new Promise((resolve) => setTimeout(() => resolve(true), delay));
