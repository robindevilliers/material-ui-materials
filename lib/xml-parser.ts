import { StringBuffer } from './utilities/StringBuffer';
import { isWhitespace } from './utilities/isWhitespace';
import { isAlphabetic } from './utilities/isAlphabetic';
import { isAlphanumeric } from './utilities/isAlphanumeric';

interface Dictionary<T> {
    [Key: string]: T;
}

export class Document {
    public processing: Dictionary<Dictionary<string>>;
    public root: Node;

    constructor(processing: Dictionary<Dictionary<string>>, root: Node) {
        this.processing = processing;
        this.root = root;
    }
}

interface Node {

}

export function isElement(subject: Node): subject is Element {
    return (subject as Element).name !== undefined;
}

export function isText(subject: Node): subject is Text {
    return (subject as Text).text !== undefined;
}

export function isEmpty(nodes: Node[]) {
    if (nodes.length === 0) {
        return true;
    }

    if (nodes.length === 1) {
        const first = nodes[0];
        if (first instanceof Text) {
            if (first.text.trim().length === 0) {
                return true;
            }
        }
    }
    return false;
}

export class Element implements Node {
    name: string = '';
    attributes: Dictionary<string> = {};
    children: Node[] = [];

    constructor(name?: string, attributes?: Dictionary<string>, children: Node[] = []) {
        if (name) {
            this.name = name;
        }

        if (attributes) {
            this.attributes = attributes;
        }

        if (children) {
            this.children = children;
        }
    }
}

export class Text implements Node {
    text: string = '';

    constructor(text: string) {
        this.text = text;
    }
}

const Stage = {
    OPEN: 'OPEN',
    TAG: 'TAG',
    CLOSING_TAG: 'CLOSING_TAG',
    CLOSING_TAG_OPEN: 'CLOSING_TAG_OPEN',
    PROCESSING_TAG: 'PROCESSING_TAG',
    PROCESSING_TAG_NAME: 'PROCESSING_TAG_NAME',
    PROCESSING_TAG_OPEN: 'PROCESSING_TAG_OPEN',
    PROCESSING_TAG_ATTRIBUTE_NAME: 'PROCESSING_TAG_ATTRIBUTE_NAME',
    PROCESSING_TAG_ATTRIBUTE_EQUALS: 'PROCESSING_TAG_ATTRIBUTE_EQUALS',
    PROCESSING_TAG_ATTRIBUTE_VALUE: 'PROCESSING_TAG_ATTRIBUTE_VALUE',
    PROCESSING_TAG_CLOSING: 'PROCESSING_TAG_CLOSING',
    ELEMENT_NAME: 'ELEMENT_NAME',
    ELEMENT_OPEN: 'ELEMENT_OPEN',
    ELEMENT_ATTRIBUTE_NAME: 'ELEMENT_ATTRIBUTE_NAME',
    ELEMENT_ATTRIBUTE_EQUALS: 'ELEMENT_ATTRIBUTE_EQUALS',
    ELEMENT_ATTRIBUTE_VALUE: 'ELEMENT_ATTRIBUTE_VALUE',
    ELEMENT_CONTENT: 'ELEMENT_CONTENT',
    ELEMENT_AUTO_CLOSING: 'ELEMENT_AUTO_CLOSING',
    COMMENT: 'COMMENT',
};

export function parse(xml: string): Document {
    const reader = new StringBuffer(xml);

    let attributeName = undefined;

    let processing: Dictionary<Dictionary<string>> = {};
    let processingTagName = undefined;
    let processingAttributes: Dictionary<string> = {};


    let stack: Element[] = [];
    let current: any = undefined;


    let stage = Stage.OPEN;
    let writer = new StringBuffer();

    let escape = false;

    while (reader.hasNext()) {

        let character = reader.next();
        let c = character.getString();

        if (c.charCodeAt(0) === 10) {
            continue;
        }

        if (stage === Stage.OPEN) {
            if (c === '<') {
                stage = Stage.TAG;
            } else {
                writer.append(c);
            }
        } else if (stage === Stage.COMMENT) {
            if (c === '>') {
                stage = Stage.ELEMENT_CONTENT;
            } else {
                //do nothing
            }
        } else if (stage === Stage.TAG) {
            if (c === '/') {
                stage = Stage.CLOSING_TAG;
            } else if (c === '?') {
                stage = Stage.PROCESSING_TAG;
            } else if (c === '!') {
                stage = Stage.COMMENT;
            } else if (isWhitespace(c)) {
            } else if (isAlphabetic(c)) {
                const child = new Element();
                if (current) {
                    current.children.push(child);
                }
                current = child;
                stack.push(current);
                stage = Stage.ELEMENT_NAME;
                writer.append(c);
            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.PROCESSING_TAG) {

            if (isAlphabetic(c)) {
                stage = Stage.PROCESSING_TAG_NAME;
                writer.append(c);
            } else if (isWhitespace(c)) {
            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.PROCESSING_TAG_NAME) {
            if (isWhitespace(c)) {
                stage = Stage.PROCESSING_TAG_OPEN;
                processingTagName = writer.toString();
                writer = new StringBuffer();
                processingAttributes = {};
            } else if (isAlphanumeric(c)) {
                writer.append(c);
            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.PROCESSING_TAG_OPEN) {
            if (isWhitespace(c)) {
            } else if (isAlphabetic(c)) {
                stage = Stage.PROCESSING_TAG_ATTRIBUTE_NAME;
                writer.append(c);
            } else if (c === '?') {
                stage = Stage.PROCESSING_TAG_CLOSING;
            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.PROCESSING_TAG_ATTRIBUTE_NAME) {
            if (isWhitespace(c)) {
                throwError(c, character.getRow(), character.getColumn());
            } else if (c === '=') {
                attributeName = writer.toString();
                writer = new StringBuffer();
                stage = Stage.PROCESSING_TAG_ATTRIBUTE_EQUALS;
            } else if (isAlphanumeric(c)) {
                writer.append(c);
            }
        } else if (stage === Stage.PROCESSING_TAG_ATTRIBUTE_EQUALS) {
            if (isWhitespace(c)) {
            } else if (c === '"') {
                stage = Stage.PROCESSING_TAG_ATTRIBUTE_VALUE;
            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.PROCESSING_TAG_ATTRIBUTE_VALUE) {
            if (!escape && c === '\\') {
                escape = true;
            } else if (!escape && c === '"') {
                processingAttributes[attributeName as string] = writer.toString();
                writer = new StringBuffer();
                stage = Stage.PROCESSING_TAG_OPEN;
            } else {
                writer.append(c);
                escape = false;
            }
        } else if (stage === Stage.PROCESSING_TAG_CLOSING) {
            if (c === '>') {
                processing[processingTagName as string] = processingAttributes;
                stage = Stage.OPEN;
            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.ELEMENT_NAME) {
            if (c === '/') {
                current.name = writer.toString();
                writer = new StringBuffer();
                stage = Stage.ELEMENT_AUTO_CLOSING;
            } else if (c === '>') {
                current.name = writer.toString();
                writer = new StringBuffer();
                stage = Stage.ELEMENT_CONTENT;
            } else if (isWhitespace(c)) {
                current.name = writer.toString();
                writer = new StringBuffer();
                stage = Stage.ELEMENT_OPEN;
            } else {
                writer.append(c);
            }
        } else if (stage === Stage.ELEMENT_OPEN) {
            if (isWhitespace(c)) {
            } else if (c === '>') {
                stage = Stage.ELEMENT_CONTENT;
            } else if (c === '/') {
                stage = Stage.ELEMENT_AUTO_CLOSING;
            } else if (isAlphabetic(c)) {
                writer.append(c);
                stage = Stage.ELEMENT_ATTRIBUTE_NAME;
            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.ELEMENT_ATTRIBUTE_NAME) {
            if (isWhitespace(c)) {
                throwError(c, character.getRow(), character.getColumn());
            } else if (c === '=') {
                attributeName = writer.toString();
                writer = new StringBuffer();
                stage = Stage.ELEMENT_ATTRIBUTE_EQUALS;
            } else if (isAlphanumeric(c)) {
                writer.append(c);
            }
        } else if (stage === Stage.ELEMENT_ATTRIBUTE_EQUALS) {
            if (isWhitespace(c)) {
            } else if (c === '"') {
                stage = Stage.ELEMENT_ATTRIBUTE_VALUE;
            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.ELEMENT_ATTRIBUTE_VALUE) {
            if (!escape && c === '\\') {
                escape = true;
            } else if (!escape && c === '"') {
                current.attributes[attributeName as string] = descapeString(writer.toString());
                writer = new StringBuffer();
                stage = Stage.ELEMENT_OPEN;
            } else {
                escape = false;
                writer.append(c);
            }
        } else if (stage === Stage.ELEMENT_CONTENT) {
            if (c === '<') {
                const text = writer.toString();
                if (text.length !== 0) {
                    if (current.children.length > 0 && isText(current.children[current.children.length - 1])) {
                        //this only happens if we have a comment.  We need to merge the current context into the previous text.
                        const text = current.children[current.children.length - 1] as Text;
                        text.text = text.text + descapeString(writer.toString());
                    } else {
                        current.children.push(new Text(descapeString(writer.toString())));
                    }

                }
                writer = new StringBuffer();
                stage = Stage.TAG;
            } else {
                writer.append(c);
            }
        } else if (stage === Stage.CLOSING_TAG) {
            if (c === '>') {
                const closeTag = writer.toString();
                writer = new StringBuffer();
                if (closeTag !== current.name) {
                    throw new Error(`close tag (${closeTag}) doesn't match start tag ${current.name}`);
                }
                stack.pop();
                if (stack.length !== 0) {
                    current = stack[stack.length - 1];
                }
                stage = Stage.ELEMENT_CONTENT;
            } else if (isWhitespace(c)) {
                stage = Stage.CLOSING_TAG_OPEN;
            } else {
                writer.append(c);
            }
        } else if (stage === Stage.CLOSING_TAG_OPEN) {
            if (c === '>') {
                const closeTag = writer.toString();
                writer = new StringBuffer();
                if (closeTag !== current.name) {
                    throw new Error(`close tag (${closeTag}) doesn't match start tag ${current.name}`);
                }
                stack.pop();
                if (stack.length !== 0) {
                    current = stack[stack.length - 1];
                }
                stage = Stage.ELEMENT_CONTENT;
            } else if (isWhitespace(c)) {

            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        } else if (stage === Stage.ELEMENT_AUTO_CLOSING) {
            if (c === '>') {
                stack.pop();
                if (stack.length !== 0) {
                    current = stack[stack.length - 1];
                }
                stage = Stage.ELEMENT_CONTENT;
            } else if (isWhitespace(c)) {

            } else {
                throwError(c, character.getRow(), character.getColumn());
            }
        }
    }

    if (current === undefined) {
        current = new Text(writer.toString());
    }

    return new Document(processing, current);
}


export function throwError(c: string, row: number, column: number) {
    throw new Error(`Character (${c}) not allowed at position ${row}:${column}.`);
}


export function serializeDocument(document: Document) {
    const processing = Object.entries(document.processing)
        .map(([key, value]) => {
            const writer = new StringBuffer();

            writer.append("<?");
            writer.append(key);
            writer.append(" ");
            writer.append(Object.entries(value)
                .map(([key2, value2]) => `${key2}="${escapeString(value2)}"`).join(' '));
            writer.append(" ");
            writer.append("?>");
            return writer.toString();
        }).join(' ');

    return `${processing}${serializeNode(document.root)}`;
}

export function serializeNode(node: Node): string {
    if (node instanceof Text) {
        return escapeString(node.text);
    } else if (node instanceof Element) {
        const attributes = Object.entries(node.attributes).map(([key, value]) => {
            return `${key}="${escapeString(value)}"`;
        }).join(' ');

        const body = serializeNodes(node.children);
        if (body === '') {
            return `<${node.name} ${attributes}/>`;
        }
        return `<${node.name} ${attributes}>${body}</${node.name}>`;
    } else {
        throw new Error("Should never happen");
    }
}

export function serializeNodes(nodes: Node[]) {
    return nodes.map(node => serializeNode(node)).join('');
}

export function escapeString(input: string) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&apos;');
}

export function descapeString(input: string) {
    return input
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&apos;/g, '\'');
}


export function deepCopyNode(node: Node) {

    function copy(node: Node): Node {
        if (isElement(node)) {
            const children = node.children.map(copy);
            return new Element(node.name, Object.assign({}, node.attributes), children);
        } else if (isText(node)) {
            return new Text(node.text);
        } else {
            throw new Error("Never happen");
        }
    }

    return copy(node);
}


// export = {
//     deepCopyNode,
//     escapeString,
//     serializeNodes,
//     serializeDocument,
//     parse,
//     Text,
//     Element: Element,
//     Document,
//     isAlphabetic,
//     isAlphanumeric,
//     isWhitespace,
//     isEmpty,
//     StringBuffer
// };
//
// console.log(module)