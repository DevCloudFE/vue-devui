export const hashRE = /#.*$/;
export const extRE = /(index)?\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^[a-z]+:/i;
export function isNullish(value) {
    return value === null || value === undefined;
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isExternal(path) {
    return outboundRE.test(path);
}
export function isActive(route, path) {
    if (path === undefined) {
        return false;
    }
    const routePath = normalize(`/${route.data.relativePath}`);
    const pagePath = normalize(path);
    return routePath === pagePath;
}
export function normalize(path) {
    return decodeURI(path).replace(hashRE, '').replace(extRE, '');
}
export function joinUrl(base, path) {
    const baseEndsWithSlash = base.endsWith('/');
    const pathStartsWithSlash = path.startsWith('/');
    if (baseEndsWithSlash && pathStartsWithSlash) {
        return base.slice(0, -1) + path;
    }
    if (!baseEndsWithSlash && !pathStartsWithSlash) {
        return `${base}/${path}`;
    }
    return base + path;
}
/**
 * get the path without filename (the last segment). for example, if the given
 * path is `/guide/getting-started.html`, this method will return `/guide/`.
 * Always with a trailing slash.
 */
export function getPathDirName(path) {
    const segments = path.split('/');
    if (segments[segments.length - 1]) {
        segments.pop();
    }
    return ensureEndingSlash(segments.join('/'));
}
export function ensureSlash(path) {
    return ensureEndingSlash(ensureStartingSlash(path));
}
export function ensureStartingSlash(path) {
    return /^\//.test(path) ? path : `/${path}`;
}
export function ensureEndingSlash(path) {
    return /(\.html|\/)$/.test(path) ? path : `${path}/`;
}
/**
 * Remove `.md` or `.html` extention from the given path. It also converts
 * `index` to slush.
 */
export function removeExtention(path) {
    return path.replace(/(index)?(\.(md|html))?$/, '') || '/';
}
