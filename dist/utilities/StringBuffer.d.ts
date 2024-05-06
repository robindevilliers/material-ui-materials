export declare class StringBuffer {
    private readonly buffer;
    private index;
    private column;
    private row;
    constructor(input?: string | undefined, row?: number, column?: number);
    append(c: string): void;
    endsWith(c: string): boolean;
    next(): Character;
    hasNext(): boolean;
    toString(): string;
    getColumn(): number;
    getRow(): number;
}
export declare class Character {
    private c;
    private column;
    private row;
    constructor(c: string, column: number, row: number);
    getString(): string;
    getColumn(): number;
    getRow(): number;
}
