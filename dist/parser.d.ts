interface Dictionary<T> {
    [Key: string]: T;
}
export declare class Document {
    processing: Dictionary<Dictionary<string>>;
    root: Node;
    constructor(processing: Dictionary<Dictionary<string>>, root: Node);
}
interface Node {
}
export declare function isElement(subject: Node): subject is Element;
export declare function isText(subject: Node): subject is Text;
export declare function isEmpty(nodes: Node[]): boolean;
export declare class Element implements Node {
    name: string;
    attributes: Dictionary<string>;
    children: Node[];
    constructor(name?: string, attributes?: Dictionary<string>, children?: Node[]);
}
export declare class Text implements Node {
    text: string;
    constructor(text: string);
}
export declare function parse(xml: string): Document;
export declare function throwError(c: string, row: number, column: number): void;
export declare function serializeDocument(document: Document): string;
export declare function serializeNode(node: Node): string;
export declare function serializeNodes(nodes: Node[]): string;
export declare function escapeString(input: string): string;
export declare function descapeString(input: string): string;
export declare function deepCopyNode(node: Node): Node;
export {};
