export declare type CliConfig = {
    /**
     * current workspace directory
     *
     * ***Should be the root directory of the component library.***
     *
     * @default process.cwd()
     */
    cwd: string;
    /**
     * Generate the root directory of component.
     *
     * ***Note that the path should be based on the `cwd` of configuration item.***
     *
     * @default .
     */
    componentRootDir: string;
    /**
     * category of component
     *
     * @default ['通用', '导航', '反馈', '数据录入', '数据展示', '布局']
     */
    componentCategories: string[];
    /**
     * prefix of the component library
     *
     * @default ''
     */
    libPrefix: string;
    /**
     * component style file suffix of the component library
     *
     * @default .css
     */
    libStyleFileSuffix: string;
    /**
     * component class prefix of the component library
     */
    libClassPrefix: string;
    /**
     * component library entry file name
     *
     * @default index
     */
    libEntryFileName: string;
    /**
     * Generate the root directory of the lib entry file.
     *
     * ***Note that the path should be based on the `cwd` of configuration item.***
     *
     * @default .
     */
    libEntryRootDir: string;
    /**
     * version of component library
     *
     * @default 0.0.0
     */
    version: string;
};
export declare const cliConfig: CliConfig;
export declare function mergeCliConfig(config?: Partial<CliConfig>): CliConfig & Partial<CliConfig>;
export declare function detectCliConfig(): void;
