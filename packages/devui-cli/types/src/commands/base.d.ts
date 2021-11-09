export declare type BaseCmd = {
    init?: boolean;
    config?: string;
};
export default function baseAction(cmd: BaseCmd): Promise<void>;
export declare function loadCliConfig(cmd: Pick<BaseCmd, 'config'>): void;
