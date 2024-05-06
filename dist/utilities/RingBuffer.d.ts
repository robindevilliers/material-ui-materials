export declare class RingBuffer {
    private size;
    private data;
    private index;
    constructor(size: number);
    append(c: string): void;
    toString(): string;
}
