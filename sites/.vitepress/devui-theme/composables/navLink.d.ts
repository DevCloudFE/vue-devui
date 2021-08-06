import { Ref } from 'vue';
import type { DefaultTheme } from '../config';
export declare function useNavLink(item: Ref<DefaultTheme.NavItemWithLink>): {
    props: import("vue").ComputedRef<{
        class: {
            active: boolean;
            isExternal: boolean;
        };
        href: string;
        target: string | null;
        rel: string | null;
        'aria-label': string | undefined;
    }>;
    isExternal: boolean;
};
