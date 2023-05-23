export type MapKeyType<M extends Map<any, any>> = M extends Map<infer K, any> ? K : never;

export type MapValueType<M extends Map<any, any>> = M extends Map<any, infer V> ? V : never;

export type RemoveReadonly<T extends readonly any[]> = T extends readonly (infer R)[] ? R[] : never;
