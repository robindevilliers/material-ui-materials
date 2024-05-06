export declare class LexicalToken {
    private type;
    private column;
    private row;
    private text;
    private params?;
    private paramsRow?;
    private paramsColumn?;
    constructor(type: string, column: number, row: number, text: string, params?: string | undefined, paramsRow?: number | undefined, paramsColumn?: number | undefined);
    getType(): string;
    getRow(): number;
    getColumn(): number;
    getText(): string;
    getParams(): string | undefined;
    getParamsRow(): number | undefined;
    getParamsColumn(): number | undefined;
}
