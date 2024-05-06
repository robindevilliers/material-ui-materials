export interface Value {
    assign(val: any): void;
    retrieve(): any;
}
export declare class Literal implements Value {
    private value;
    constructor(value: any);
    assign(val: any): void;
    retrieve(): any;
    static of(value: any): Literal;
}
export declare class Reference implements Value {
    private name;
    private data;
    constructor(name: string, data: Record<string, any>);
    assign(val: any): void;
    retrieve(): any;
    getName(): string;
    static of(name: string, data: Record<string, any>): Reference;
}
