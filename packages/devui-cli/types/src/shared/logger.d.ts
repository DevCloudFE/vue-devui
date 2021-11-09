declare const logger: {
    PREFIX: string;
    info(text: string): void;
    success(text: string): void;
    warn(text: string): void;
    error(text: string): void;
};
export default logger;
