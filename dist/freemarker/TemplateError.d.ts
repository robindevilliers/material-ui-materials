export declare class TemplateError extends Error {
    private cause;
    constructor(row: number, column: number, message: string, cause?: TemplateError | undefined);
}
