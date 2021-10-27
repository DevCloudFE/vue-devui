export declare namespace DefaultTheme {
    interface Config {
        logo?: string;
        nav?: NavItem[] | false;
        sidebar?: SideBarConfig | MultiSideBarConfig;
        /**
         * GitHub repository following the format <user>/<project>.
         *
         * @example `"vuejs/vue-next"`
         */
        repo?: string;
        /**
         * Customize the header label. Defaults to GitHub/Gitlab/Bitbucket
         * depending on the provided repo.
         *
         * @example `"Contribute!"`
         */
        repoLabel?: string;
        /**
         * If your docs are in a different repository from your main project.
         *
         * @example `"vuejs/docs-next"`
         */
        docsRepo?: string;
        /**
         * If your docs are not at the root of the repo.
         *
         * @example `"docs"`
         */
        docsDir?: string;
        /**
         * If your docs are in a different branch. Defaults to `master`.
         *
         * @example `"next"`
         */
        docsBranch?: string;
        /**
         * Enable links to edit pages at the bottom of the page.
         */
        editLinks?: boolean;
        /**
         * Custom text for edit link. Defaults to "Edit this page".
         */
        editLinkText?: string;
        /**
         * Show last updated time at the bottom of the page. Defaults to `false`.
         * If given a string, it will be displayed as a prefix (default value:
         * "Last Updated").
         */
        lastUpdated?: string | boolean;
        prevLinks?: boolean;
        nextLinks?: boolean;
        locales?: Record<string, LocaleConfig & Omit<Config, 'locales'>>;
        algolia?: AlgoliaSearchOptions;
        carbonAds?: {
            carbon: string;
            custom?: string;
            placement: string;
        };
    }
    type NavItem = NavItemWithLink | NavItemWithChildren;
    interface NavItemBase {
        text: string;
        target?: string;
        rel?: string;
        ariaLabel?: string;
        activeMatch?: string;
    }
    interface NavItemWithLink extends NavItemBase {
        link: string;
    }
    interface NavItemWithChildren extends NavItemBase {
        items: NavItemWithLink[];
    }
    type SideBarConfig = SideBarItem[] | 'auto' | false;
    interface MultiSideBarConfig {
        [path: string]: SideBarConfig;
    }
    type SideBarItem = SideBarLink | SideBarGroup;
    interface SideBarLink {
        text: string;
        link: string;
    }
    interface SideBarGroup {
        text: string;
        link?: string;
        /**
         * @default false
         */
        collapsable?: boolean;
        children: SideBarItem[];
    }
    interface AlgoliaSearchOptions {
        appId?: string;
        apiKey: string;
        indexName: string;
        placeholder?: string;
        searchParameters?: any;
        disableUserPersonalization?: boolean;
        initialQuery?: string;
    }
    interface LocaleConfig {
        /**
         * Text for the language dropdown.
         */
        selectText?: string;
        /**
         * Label for this locale in the language dropdown.
         */
        label?: string;
    }
}
