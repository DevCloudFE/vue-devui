import { Route } from 'vitepress';
export declare const hashRE: RegExp;
export declare const extRE: RegExp;
export declare const endingSlashRE: RegExp;
export declare const outboundRE: RegExp;
export declare function isNullish(value: any): value is null | undefined;
export declare function isArray(value: any): value is any[];
export declare function isExternal(path: string): boolean;
export declare function isActive(route: Route, path?: string): boolean;
export declare function normalize(path: string): string;
export declare function joinUrl(base: string, path: string): string;
/**
 * get the path without filename (the last segment). for example, if the given
 * path is `/guide/getting-started.html`, this method will return `/guide/`.
 * Always with a trailing slash.
 */
export declare function getPathDirName(path: string): string;
export declare function ensureSlash(path: string): string;
export declare function ensureStartingSlash(path: string): string;
export declare function ensureEndingSlash(path: string): string;
/**
 * Remove `.md` or `.html` extention from the given path. It also converts
 * `index` to slush.
 */
export declare function removeExtention(path: string): string;
