import { computed } from 'vue';
import { useRoute, useData } from 'vitepress';
import { useActiveSidebarLinks } from '../composables/activeSidebarLink';
import { getSideBarConfig } from '../support/sideBar';
export function useSideBar() {
    const route = useRoute();
    const { site } = useData();
    useActiveSidebarLinks();
    return computed(() => {
        // at first, we'll check if we can find the sidebar setting in frontmatter.
        const headers = route.data.headers;
        const frontSidebar = route.data.frontmatter.sidebar;
        const sidebarDepth = route.data.frontmatter.sidebarDepth;
        // if it's `false`, we'll just return an empty array here.
        if (frontSidebar === false) {
            return [];
        }
        // if it's `atuo`, render headers of the current page
        if (frontSidebar === 'auto') {
            return resolveAutoSidebar(headers, sidebarDepth);
        }
        // now, there's no sidebar setting at frontmatter; let's see the configs
        const themeSidebar = getSideBarConfig(site.value.themeConfig.sidebar, route.data.relativePath);
        if (themeSidebar === false) {
            return [];
        }
        if (themeSidebar === 'auto') {
            return resolveAutoSidebar(headers, sidebarDepth);
        }
        return themeSidebar;
    });
}
function resolveAutoSidebar(headers, depth) {
    const ret = [];
    if (headers === undefined) {
        return [];
    }
    let lastH2 = undefined;
    headers.forEach(({ level, title, slug }) => {
        if (level - 1 > depth) {
            return;
        }
        const item = {
            text: title,
            link: `#${slug}`
        };
        if (level === 2) {
            lastH2 = item;
            ret.push(item);
        }
        else if (lastH2) {
            ;
            (lastH2.children || (lastH2.children = [])).push(item);
        }
    });
    return ret;
}
