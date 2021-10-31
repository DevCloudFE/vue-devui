import { DefaultTheme } from '../config';
export declare function isSideBarConfig(sidebar: DefaultTheme.SideBarConfig | DefaultTheme.MultiSideBarConfig): sidebar is DefaultTheme.SideBarConfig;
export declare function isSideBarGroup(item: DefaultTheme.SideBarItem): item is DefaultTheme.SideBarGroup;
export declare function isSideBarEmpty(sidebar?: DefaultTheme.SideBarConfig): boolean;
/**
 * Get the `SideBarConfig` from sidebar option. This method will ensure to get
 * correct sidebar config from `MultiSideBarConfig` with various path
 * combinations such as matching `guide/` and `/guide/`. If no matching config
 * was found, it will return `auto` as a fallback.
 */
export declare function getSideBarConfig(sidebar: DefaultTheme.SideBarConfig | DefaultTheme.MultiSideBarConfig, path: string): DefaultTheme.SideBarConfig;
/**
 * Get flat sidebar links from the sidebar items. This method is useful for
 * creating the "next and prev link" feature. It will ignore any items that
 * don't have `link` property and removes `.md` or `.html` extension if a
 * link contains it.
 */
export declare function getFlatSideBarLinks(sidebar: DefaultTheme.SideBarItem[]): DefaultTheme.SideBarLink[];
