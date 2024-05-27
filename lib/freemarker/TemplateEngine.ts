import { StringBuffer } from '../utilities/StringBuffer';
import { parse } from './template/lexer';
import { LexicalTokenType } from './template/LexicalTokenType';
import { LexicalToken } from './template/LexicalToken';
import { Reference } from './expression/Value';
import { ExpressionEngine } from './expression-engine';
import { TemplateError } from './TemplateError';
import { ProhibitedError } from './ProhibitedError';
import { isHash } from '../utilities/isHash';

const PROHIBITED = [
    "attempt", "recover", "autoesc", "compress", "escape", "noescape", "flush", "ftl", "function", "return", "global",
    "import", "include", "continue", "local", "macro", "nested", "return", "nooautoesc", "noparse", "nt",
    "outputformat", "settings", "stop", "t", "lt", "rt", "visit", "recurse", "fallback"
];

export class TemplateEngine {

    private expressionEngine = new ExpressionEngine();

    render(template: string, data: Record<string, any>): string {

        const tokens = parse(template);

        return this.consume(tokens, data)[0];
    }

    private discard(tokens: LexicalToken[]) {

        let level = 0;
        while (tokens.length) {
            const token = tokens.shift()!;

            if (token.getType() === LexicalTokenType.CLOSE_DIRECTIVE) {
                if (token.getText() === 'if' || token.getText() === 'list' || token.getText() === 'assign' || token.getText() === 'items' || token.getText() === 'switch') {
                    if (level) {
                        level--;
                    } else {
                        return token;
                    }
                }
            } else if (token.getType() === LexicalTokenType.OPEN_DIRECTIVE) {
                if (token.getText() === 'if' || token.getText() === 'list' || token.getText() === 'items' || token.getText() === 'switch') {
                    level++;
                } else if (token.getText() === 'assign') {
                    if (!token.getParams()?.includes("=")) {
                        level++;
                    }
                } else if (level === 0 && (token.getText() === 'else' || token.getText() === 'elseif' || token.getText() === 'case' || token.getText() === 'default')) {
                    return token;
                }
            }
        }
    }

    private consume(tokens: LexicalToken[], data: Record<string, any>): [content: string, close: LexicalToken | undefined] {

        const buffer = new StringBuffer();
        while (tokens.length) {

            const token = tokens.shift()!;

            if (token.getType() === LexicalTokenType.TEXT) {

                buffer.append(token.getText());

            } else if (token.getType() === LexicalTokenType.INTERPOLATION) {

                buffer.append(this.expressionEngine.build(token.getParams()!, token.getParamsRow()!, token.getParamsColumn()!).evaluate(data).retrieve());

            } else if (token.getType() === LexicalTokenType.OPEN_DIRECTIVE) {
                if (token.getText() === 'assign') {
                    const [result, close] = this.handleAssign(token.getParams()!, token.getParamsRow()!, token.getParamsColumn()!, tokens, data);
                } else if (token.getText() === 'if') {
                    const [result, close] = this.handleIf(token.getParams()!, token.getParamsRow()!, token.getParamsColumn()!, tokens, data);
                    if (close?.getText() !== 'if') {
                        throw new TemplateError(token.getRow(), token.getColumn(), "Invalid closing tag for if");
                    }
                    buffer.append(result);
                } else if (token.getText() === 'list') {
                    const [result, close] = this.handleList(token.getParams()!, token.getParamsRow()!, token.getParamsColumn()!, tokens, data);
                    if (close?.getText() !== 'list') {
                        throw new TemplateError(token.getRow(), token.getColumn(), "Invalid closing tag for list");
                    }
                    buffer.append(result);
                } else if (token.getText() === 'switch') {
                    const [result, close] = this.handleSwitch(token.getParams()!, token.getParamsRow()!, token.getParamsColumn()!, tokens, data);
                    if (close?.getText() !== 'switch') {
                        throw new TemplateError(token.getRow(), token.getColumn(), "Invalid closing tag for switch");
                    }
                    buffer.append(result);
                } else if (token.getText() === 'else') {
                    return [buffer.toString(), token];
                } else if (token.getText() === 'elseif') {
                    return [buffer.toString(), token];
                } else if (token.getText() === 'items') {
                    return [buffer.toString(), token];
                } else if (token.getText() === 'sep') {
                    return [buffer.toString(), token];
                } else if (token.getText() === 'break') {
                    return [buffer.toString(), token];
                } else if (token.getText() === 'case') {
                    //ignore case directive as we stop on 'break'
                } else if (PROHIBITED.includes(token.getText())) {
                    throw new ProhibitedError(token.getRow(), token.getColumn(), `Directive is prohibited '${token.getText()}'`);
                } else {
                    throw new TemplateError(token.getRow(), token.getColumn(), `Unsupported directive '${token.getText()}'`);
                }
            } else if (token.getType() === LexicalTokenType.CLOSE_DIRECTIVE) {
                return [buffer.toString(), token];
            }
        }
        return [buffer.toString(), undefined];
    }


    private processList(tokens: LexicalToken[], data: Record<string, any>, sequence: any[], argName: string): [content: string, close: LexicalToken | undefined] {
        const copy = [...tokens];
        let block = undefined;
        let result: string = "";
        let separator: string | undefined = undefined;
        let close = undefined;

        const buffer = new StringBuffer();

        for (let i = 0; i < sequence.length; i++) {
            const scope = { ...data };

            scope[argName] = sequence[i];
            scope[`$${argName}$`] = true;
            scope[`$${argName}_index$`] = i;
            scope[`$${argName}_length$`] = sequence.length;

            if (separator) {
                buffer.append(separator);
            }

            if (block) {
                const local = [...block];
                let [result, close] = this.consume(local, scope);
                buffer.append(result);

                if (close?.getText() === 'sep') {
                    [separator, close] = this.consume(local, scope);

                    if (close?.getText() === 'sep') {
                        [result, close] = this.consume(local, scope);
                        buffer.append(result);
                    }
                }

            } else {
                [result, close] = this.consume(tokens, scope);
                buffer.append(result);

                if (close?.getText() === 'sep') {
                    [separator, close] = this.consume(tokens, scope);

                    if (close?.getText() === 'sep') {
                        [result, close] = this.consume(tokens, scope);
                        buffer.append(result);
                    }
                }

                block = copy.slice(0, copy.length - tokens.length - 1);
            }
        }

        if (sequence.length === 0) {
            const scope = { ...data };

            scope[argName] = undefined;

            close = this.discard(tokens);
        }

        return [buffer.toString(), close];
    }

    private processHash(tokens: LexicalToken[], data: Record<string, any>, hash: Record<string, any>, keyName: string, argName: string): [content: string, close: LexicalToken | undefined] {
        const copy = [...tokens];
        let block = undefined;
        let result: string = "";
        let separator: string | undefined = undefined;
        let close = undefined;

        const buffer = new StringBuffer();

        for (const key in hash) {
            const value = hash[key];
            const scope = { ...data };

            scope[keyName] = key;
            scope[argName] = value;

            if (separator) {
                buffer.append(separator);
            }

            if (block) {
                const local = [...block];
                let [result, close] = this.consume(local, scope);
                buffer.append(result);

                if (close?.getText() === 'sep') {
                    [separator, close] = this.consume(local, scope);

                    if (close?.getText() === 'sep') {
                        [result, close] = this.consume(local, scope);
                        buffer.append(result);
                    }
                }

            } else {
                [result, close] = this.consume(tokens, scope);
                buffer.append(result);

                if (close?.getText() === 'sep') {
                    [separator, close] = this.consume(tokens, scope);

                    if (close?.getText() === 'sep') {
                        [result, close] = this.consume(tokens, scope);
                        buffer.append(result);
                    }
                }

                block = copy.slice(0, copy.length - tokens.length - 1);
            }
        }

        if (Object.keys(hash).length === 0) {
            const scope = { ...data };

            scope[argName] = undefined;

            close = this.discard(tokens);
        }

        return [buffer.toString(), close];
    }

    private handleList(expression: string, row: number, column: number, tokens: LexicalToken[], data: Record<string, any>): [content: string, close: LexicalToken | undefined] {

        const buffer = new StringBuffer();
        let result = undefined, close = undefined;

        if (expression.includes(" as ")) {

            const [refName, argName] = expression.split(" as ").map(x => x.trim());

            const subject = this.expressionEngine.build(refName, row, column).evaluate(data).retrieve();

            if (Array.isArray(subject)) {

                [result, close] = this.processList(tokens, data, subject, argName);
                buffer.append(result);
            } else if (isHash(subject)) {

                const [key, value] = argName.split(",").map(s => s.trim());
                [result, close] = this.processHash(tokens, data, subject, key, value);
                buffer.append(result);
            } else {
                throw new TemplateError(row, column, "'as' operator requires an iterable subject (hash or sequence).");
            }

            let text = undefined;
            if (close?.getText() === 'else') {

                if (subject.length === 0) {
                    [text, close] = this.consume(tokens, data);
                    buffer.append(text);
                } else {
                    close = this.discard(tokens);
                }
            }

        } else {

            const ref = this.expressionEngine.build(expression, row, column).evaluate(data);
            const subject = ref.retrieve();
            if (Array.isArray(subject) || isHash(subject)) {

                if ((Array.isArray(subject) && subject.length) || (isHash(subject) && Object.keys(subject).length)) {
                    [result, close] = this.consume(tokens, data);
                    buffer.append(result);

                    if (close?.getType() === LexicalTokenType.OPEN_DIRECTIVE && close?.getText() === 'items') {
                        if (Array.isArray(subject)) {
                            const [blank, argName] = close.getParams()!.split("as").map(x => x.trim());
                            [result, close] = this.processList(tokens, data, subject, argName);
                            buffer.append(result);
                        } else if (isHash(subject)) {
                            const [blank, argName] = close?.getParams()!.split("as").map(x => x.trim());
                            const [key, value] = argName.split(",").map(s => s.trim());
                            [result, close] = this.processHash(tokens, data, subject, key, value);
                            buffer.append(result);
                        }
                    }

                    if (close?.getType() === LexicalTokenType.CLOSE_DIRECTIVE && close?.getText() === 'items') {
                        [result, close] = this.consume(tokens, data);
                        buffer.append(result);
                    }

                    if (close?.getText() === 'else') {
                        close = this.discard(tokens);
                    }

                } else {

                    close = this.discard(tokens);

                    if (close?.getText() === 'else') {
                        [result, close] = this.consume(tokens, data);
                        buffer.append(result);
                    }
                }

                if (close && close.getText() !== 'list') {
                    throw new TemplateError(close.getColumn(), close.getRow(), "List improperly terminated");
                }

            } else {
                throw new TemplateError(row, column, "list directive requires an iterable subject (sequence or hash).");
            }
        }

        return [buffer.toString(), close];
    }

    private handleAssign(expression: string, row: number, column: number, tokens: LexicalToken[], data: Record<string, any>): [content: string, close: LexicalToken | undefined] {

        const value = this.expressionEngine.build(expression, row, column).evaluate(data);
        if (value instanceof Reference) {

            const [result, close] = this.consume(tokens, data);
            value.assign(result);
            return ["", close];
        }
        return ["", undefined];
    }

    handleIf(expression: string, row: number, column: number, tokens: LexicalToken[], data: Record<string, any>): [content: string, close: LexicalToken | undefined] {

        let result = undefined, text = undefined, close = undefined;

        const bool = this.expressionEngine.build(expression, row, column).evaluate(data).retrieve();

        if (bool) {
            [text, close] = this.consume(tokens, data);
            result = text;
        } else {
            close = this.discard(tokens);
        }

        while (close && close.getType() === LexicalTokenType.OPEN_DIRECTIVE && close.getText() === 'elseif') {

            const bool = this.expressionEngine.build(close.getParams()!, close.getRow(), close.getColumn()).evaluate(data).retrieve();

            if (bool && result === undefined) {
                [text, close] = this.consume(tokens, data);
                result = text;
            } else {
                close = this.discard(tokens);
            }
        }

        if (close?.getText() === 'else') {

            if (result === undefined) {
                [text, close] = this.consume(tokens, data);
                result = text;
            } else {
                close = this.discard(tokens);
            }
        }

        return [result || "", close];
    }

    handleSwitch(expression: string, row: number, column: number, tokens: LexicalToken[], data: Record<string, any>): [content: string, close: LexicalToken | undefined] {
        let text = undefined, close = undefined;
        const result = new StringBuffer();

        const reference = this.expressionEngine.build(expression, row, column).evaluate(data).retrieve();

        let current = tokens.shift();

        while (current && current.getType() !== LexicalTokenType.CLOSE_DIRECTIVE) {

            if (current.getType() === LexicalTokenType.OPEN_DIRECTIVE && current.getText() === 'case') {

                const value = this.expressionEngine.build(current.getParams()!, current.getRow(), current.getColumn()).evaluate(data).retrieve();

                if (reference === value) {

                    while (current && current.getType() === LexicalTokenType.OPEN_DIRECTIVE && current.getText() === "case") {
                        [text, current] = this.consume(tokens, data);
                        result.append(text);
                    }
                    while (current && current.getType() !== LexicalTokenType.CLOSE_DIRECTIVE) {
                        current = this.discard(tokens);
                    }

                } else {
                    current = this.discard(tokens);
                }
            } else if (current.getType() === LexicalTokenType.OPEN_DIRECTIVE && current.getText() === 'default') {
                if (text) {
                    current = this.discard(tokens);
                } else {
                    [text, current] = this.consume(tokens, data);
                    result.append(text);
                }
            } else {
                current = tokens.shift();
            }

        }
        return [result.toString(), current];
    }
}
