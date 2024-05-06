import { StringBuffer } from '../../utilities/StringBuffer';
import { isWhitespace } from '../../utilities/isWhitespace';
import { isAlphabetic } from '../../utilities/isAlphabetic';
import { isAlphanumeric } from '../../utilities/isAlphanumeric';
import { isNumeric } from '../../utilities/isNumeric';
import { TemplateError } from '../TemplateError';

const enum Stage {
    OPEN,
    OPERATOR,
    REFERENCE,
    STRING,
    RAW_STRING,
    NUMBER
}

export const TokenType = {
    EQUAL: 'EQUAL',
    NOT_EQUAL: 'NOT_EQUAL',
    LESS_THAN: 'LESS_THAN',
    LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
    GREATER_THAN: 'GREATER_THAN',
    GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
    OR: 'OR',
    AND: 'AND',
    BANG: 'BANG',
    REFERENCE: 'REFERENCE',
    BUILTIN: 'BUILTIN',
    GLOBAL_VARIABLE: 'GLOBAL_VARIABLE',
    TRUE: 'TRUE',
    FALSE: 'FALSE',
    STRING: 'STRING',
    NUMBER: 'NUMBER',
    OPEN_PARENTHESIS: 'OPEN_PARENTHESIS',
    CLOSE_PARENTHESIS: 'CLOSE_PARENTHESIS',
    OPEN_SEQUENCE: 'OPEN_SEQUENCE',
    CLOSE_SEQUENCE: 'CLOSE_SEQUENCE',
    OPEN_SLICE: 'OPEN_SLICE',
    OPEN_HASH: 'OPEN_HASH',
    CLOSE_HASH: 'CLOSE_HASH',
    COMMA: 'COMMA',
    COLON: 'COLON',
    ASSIGN: 'ASSIGN',
    ADD_AND_ASSIGN: 'ADD_AND_ASSIGN',
    SUBTRACT_AND_ASSIGN: 'SUBTRACT_AND_ASSIGN',
    MULTIPLY_AND_ASSIGN: 'MULTIPLY_AND_ASSIGN',
    DIVIDE_AND_ASSIGN: 'DIVIDE_AND_ASSIGN',
    MODULUS_AND_ASSIGN: 'MODULUS_AND_ASSIGN',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
    MODULUS: 'MODULUS',
    RANGE_INCLUSIVE: 'RANGE_INCLUSIVE',
    RANGE_EXCLUSIVE: 'RANGE_EXCLUSIVE',
    RANGE_LENGTH_INC: 'RANGE_LENGTH_INC',
    RANGE_LENGTH_DEC: 'RANGE_LENGTH_DEC',
    DEREFERENCE: 'DEREFERENCE',
    CALL_BUILTIN: 'CALL_BUILTIN',
    CALL_METHOD: 'CALL_METHOD',
    IS_DEFINED: 'IS_DEFINED',
    LAMBDA: 'LAMBDA',
    PLUS_PLUS: 'PLUS_PLUS',
    MINUS_MINUS: 'MINUS_MINUS',
};

export class Token {

    constructor(private type: string, private token: string, private row: number, private column: number) {
    }

    getType() {
        return this.type;
    }

    getToken() {
        return this.token;
    }

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.column;
    }
}

export function tokenize(expression: string, row: number = 0, column: number = 0) {

    const reader = new StringBuffer(expression, row, column);
    let stage = Stage.OPEN;

    let writer = new StringBuffer();

    const results: Token[] = [];

    function appendToken(row: number, column: number) {

        function take(partial: string, type: string) {
            results.push(new Token(type, partial, row, column - partial.length));
            return token.substring(partial.length);
        }

        let token = writer.toString();

        if (stage === Stage.NUMBER) {
            if (isNaN(Number(token))) {
                throw new TemplateError(row, column, `Invalid number`);
            }
            results.push(new Token(TokenType.NUMBER, token, row, column - token.length));
            return;
        }

        while (token.length) {

            if (token.startsWith('..*-')) {
                token = take('..*-', TokenType.RANGE_LENGTH_DEC);
            } else if (token.startsWith('..*+')) {
                token = take('..*+', TokenType.RANGE_LENGTH_INC);
            } else if (token.startsWith('..*')) {
                token = take('..*', TokenType.RANGE_LENGTH_INC);
            } else if (token.startsWith('..<')) {
                token = take('..<', TokenType.RANGE_EXCLUSIVE);
            } else if (token.startsWith('..!')) {
                token = take('..<', TokenType.RANGE_EXCLUSIVE);
            } else if (token.startsWith('==')) {
                token = take('==', TokenType.EQUAL);
            } else if (token.startsWith('+=')) {
                token = take('+=', TokenType.ADD_AND_ASSIGN);
            } else if (token.startsWith('++')) {
                token = take('++', TokenType.PLUS_PLUS);
            } else if (token.startsWith('-=')) {
                token = take('-=', TokenType.SUBTRACT_AND_ASSIGN);
            } else if (token.startsWith('--')) {
                token = take('--', TokenType.MINUS_MINUS);
            } else if (token.startsWith('/=')) {
                token = take('/=', TokenType.DIVIDE_AND_ASSIGN);
            } else if (token.startsWith('%=')) {
                token = take('%=', TokenType.MODULUS_AND_ASSIGN);
            } else if (token.startsWith('*=')) {
                token = take('*=', TokenType.MULTIPLY_AND_ASSIGN);
            } else if (token.startsWith('->')) {
                token = take('->', TokenType.LAMBDA);
            } else if (token.startsWith('!=')) {
                token = take('!=', TokenType.NOT_EQUAL);
            } else if (token.startsWith('<=')) {
                token = take('<=', TokenType.LESS_THAN_OR_EQUAL);
            } else if (token.startsWith('&gt;')) {
                token = take('>', TokenType.GREATER_THAN);
            } else if (token.startsWith('&lt;')) {
                token = take('<', TokenType.LESS_THAN);
            } else if (token.startsWith('lt')) {
                token = take('<', TokenType.LESS_THAN);
            } else if (token.startsWith('lte')) {
                token = take('<=', TokenType.LESS_THAN_OR_EQUAL);
            } else if (token.startsWith('gt')) {
                token = take('>', TokenType.GREATER_THAN);
            } else if (token.startsWith('gte')) {
                token = take('>=', TokenType.GREATER_THAN_OR_EQUAL);
            } else if (token.startsWith('>=')) {
                token = take('>=', TokenType.GREATER_THAN_OR_EQUAL);
            } else if (token.startsWith('&gt;')) {
                token = take('>=', TokenType.GREATER_THAN_OR_EQUAL);
            } else if (token.startsWith('..')) {
                token = take('..', TokenType.RANGE_INCLUSIVE);
            } else if (token.startsWith('??')) {
                token = take('??', TokenType.IS_DEFINED);
            } else if (token.startsWith('||')) {
                token = take('||', TokenType.OR);
            } else if (token.startsWith('&&')) {
                token = take('&&', TokenType.AND);
            } else if (token.startsWith('&amp;&amp;')) {
                token = take('&&', TokenType.AND);
            } else if (token.startsWith('true')) {
                token = take('true', TokenType.TRUE);
            } else if (token.startsWith('false')) {
                token = take('false', TokenType.FALSE);
            } else if (token.startsWith('=')) {
                token = take('=', TokenType.ASSIGN);
            } else if (token.startsWith('!')) {
                token = take('!', TokenType.BANG);
            } else if (token.startsWith('+')) {
                token = take('+', TokenType.PLUS);
            } else if (token.startsWith('-')) {
                token = take('-', TokenType.MINUS);
            } else if (token.startsWith('/')) {
                token = take('/', TokenType.DIVIDE);
            } else if (token.startsWith('*')) {
                token = take('*', TokenType.MULTIPLY);
            } else if (token.startsWith('%')) {
                token = take('%', TokenType.MODULUS);
            } else if (token.startsWith('>')) {
                token = take('>', TokenType.GREATER_THAN);
            } else if (token.startsWith('<')) {
                token = take('<', TokenType.LESS_THAN);
            } else if (token.startsWith('?')) {
                token = take('?', TokenType.CALL_BUILTIN);
            } else {
                if (results.length && results[results.length - 1].getType() === TokenType.CALL_BUILTIN) {
                    results.push(new Token(TokenType.BUILTIN, token, row, column - token.length));
                } else {
                    results.push(new Token(TokenType.REFERENCE, token, row, column - token.length));
                }
                break;
            }
        }
    }

    function resetToken() {
        stage = Stage.OPEN;
        writer = new StringBuffer();
    }

    let stringDelimiter = null;

    let escape = false;
    let fullStop = false;
    let lastFullStop = false;

    while (reader.hasNext()) {

        let character = reader.next();

        if (stage === Stage.STRING) {

            if (escape) {
                if (character.getString() == '"') {
                    writer.append('"');
                } else if (character.getString() == '\'') {
                    writer.append('\'');
                } else if (character.getString() === '{') {
                    writer.append('{');
                } else if (character.getString() === '=') {
                    writer.append('=');
                } else if (character.getString() === '\\') {
                    writer.append('\\');
                } else if (character.getString() === 'n') {
                    writer.append("\n");
                } else if (character.getString() === 'r') {
                    writer.append("\r");
                } else if (character.getString() === 't') {
                    writer.append("\t");
                } else if (character.getString() === 'b') {
                    writer.append("\b");
                } else if (character.getString() === 'f') {
                    writer.append("\f");
                } else if (character.getString() === 'l') {
                    writer.append("<");
                } else if (character.getString() === 'g') {
                    writer.append(">");
                } else if (character.getString() === 'a') {
                    writer.append("&");
                } else if (character.getString() === 'x') {
                    //do not escape special strings
                    writer.append("\\x");
                } else {
                    throw new TemplateError(character.getRow(), character.getColumn(), `Unsupported escape sequence '\\${character.getString()}'`);
                }
                escape = false;

            } else if (character.getString() === '\\') {
                escape = true;
            } else if (character.getString() === stringDelimiter) {
                const string = writer.toString();
                results.push(new Token(TokenType.STRING, string, character.getRow(), character.getColumn() - string.length - 1));

                resetToken();
            } else {
                writer.append(character.getString());
            }
        } else if (stage === Stage.RAW_STRING) {
            if (character.getString() === stringDelimiter) {
                const string = writer.toString();
                results.push(new Token(TokenType.STRING, string, character.getRow(), character.getColumn() - string.length - 2));

                resetToken();
            } else {
                writer.append(character.getString());
            }
        } else if (isWhitespace(character.getString())) {
            appendToken(character.getRow(), character.getColumn());

            resetToken();
        } else if (character.getString() === '(') {
            appendToken(character.getRow(), character.getColumn());

            if (stage === Stage.REFERENCE) {
                results.push(new Token(TokenType.CALL_METHOD, "(", character.getRow(), character.getColumn()));
            } else {
                results.push(new Token(TokenType.OPEN_PARENTHESIS, "(", character.getRow(), character.getColumn()));
            }

            resetToken();
        } else if (character.getString() === '[') {
            appendToken(character.getRow(), character.getColumn());
            if (stage === Stage.REFERENCE) {
                results.push(new Token(TokenType.OPEN_SLICE, "[", character.getRow(), character.getColumn()));
            } else {
                results.push(new Token(TokenType.OPEN_SEQUENCE, "[", character.getRow(), character.getColumn()));
            }

            resetToken();
        } else if (character.getString() === '{') {
            appendToken(character.getRow(), character.getColumn());

            results.push(new Token(TokenType.OPEN_HASH, "{", character.getRow(), character.getColumn()));

            resetToken();
        } else if (character.getString() === ',') {
            appendToken(character.getRow(), character.getColumn());

            results.push(new Token(TokenType.COMMA, ",", character.getRow(), character.getColumn()));

            resetToken();

        } else if (character.getString() === ':') {
            appendToken(character.getRow(), character.getColumn());

            results.push(new Token(TokenType.COLON, ":", character.getRow(), character.getColumn()));

            resetToken();
        } else if (character.getString() === ')') {
            appendToken(character.getRow(), character.getColumn());

            results.push(new Token(TokenType.CLOSE_PARENTHESIS, ")", character.getRow(), character.getColumn()));

            resetToken();
        } else if (character.getString() === ']') {
            appendToken(character.getRow(), character.getColumn());

            results.push(new Token(TokenType.CLOSE_SEQUENCE, "]", character.getRow(), character.getColumn()));

            resetToken();
        } else if (character.getString() === '}') {
            appendToken(character.getRow(), character.getColumn());

            results.push(new Token(TokenType.CLOSE_HASH, "}", character.getRow(), character.getColumn()));

            resetToken();
        } else if (stage === Stage.REFERENCE) {
            if (character.getString() === '.') {
                appendToken(character.getRow(), character.getColumn());

                results.push(new Token(TokenType.DEREFERENCE, ".", character.getRow(), character.getColumn()));

                resetToken();
            } else if (character.getString() === '"' && writer.toString() === 'r') {
                stage = Stage.RAW_STRING;
                stringDelimiter = '"';
                writer = new StringBuffer();
            } else if (character.getString() === '\'' && writer.toString() === 'r') {
                stage = Stage.RAW_STRING;
                stringDelimiter = '\'';
                writer = new StringBuffer();
            } else if (isAlphanumeric(character.getString())) {
                writer.append(character.getString());
            } else if (character.getString() === '_') {
                writer.append(character.getString());
            } else {
                appendToken(character.getRow(), character.getColumn());

                //encountered weird character - operator.
                stage = Stage.OPERATOR;

                writer = new StringBuffer();
                writer.append(character.getString());
            }
        } else if (character.getString() === '"') {
            appendToken(character.getRow(), character.getColumn());

            stringDelimiter = '"';
            stage = Stage.STRING;
            writer = new StringBuffer();
        } else if (character.getString() === '\'') {
            appendToken(character.getRow(), character.getColumn());

            stringDelimiter = '\'';
            stage = Stage.STRING;
            writer = new StringBuffer();
        } else if (stage === Stage.OPERATOR) {
            if (isAlphabetic(character.getString())) {
                appendToken(character.getRow(), character.getColumn());

                stage = Stage.REFERENCE;

                writer = new StringBuffer();
                writer.append(character.getString());
            } else if (isNumeric(character.getString())) {
                appendToken(character.getRow(), character.getColumn());

                stage = Stage.NUMBER;

                writer = new StringBuffer();
                writer.append(character.getString());
            } else {
                writer.append(character.getString());
            }
        } else if (stage === Stage.NUMBER) {
            if (lastFullStop) {
                if (character.getString() === '.') {
                    appendToken(character.getRow(), character.getColumn() - 1);

                    stage = Stage.OPERATOR;
                    fullStop = false;
                    lastFullStop = false;

                    writer = new StringBuffer();
                    writer.append('.');
                    writer.append(character.getString());
                } else {
                    lastFullStop = false;
                    writer.append('.');
                    writer.append(character.getString());
                }
            } else if (character.getString() === '.') {
                if (lastFullStop) {
                    //double fullStop - we have a range operator.
                }
                if (fullStop) {
                    throw new TemplateError(character.getRow(), character.getColumn(), `Invalid decimal point, decimal point already processed`);
                }
                fullStop = true;
                lastFullStop = true;
            } else if (isNumeric(character.getString())) {
                lastFullStop = false;
                writer.append(character.getString());
            } else if (isAlphabetic(character.getString())) {
                appendToken(character.getRow(), character.getColumn());

                stage = Stage.REFERENCE;

                writer = new StringBuffer();
                writer.append(character.getString());
            } else {
                appendToken(character.getRow(), character.getColumn());

                stage = Stage.OPERATOR;

                writer = new StringBuffer();
                writer.append(character.getString());
            }
        } else if (character.getString() === '.') {
            appendToken(character.getRow(), character.getColumn());

            results.push(new Token(TokenType.DEREFERENCE, ".", character.getRow(), character.getColumn()));

            resetToken();
        } else if (isAlphabetic(character.getString())) {
            // reference is a special mode where alphanumerics for a token, and anything else terminates the token.
            stage = Stage.REFERENCE;
            writer.append(character.getString());
        } else if (isNumeric(character.getString())) {
            // number is a special mode where fullstop means something specific, a decimal point. Alphabetic characters are invalid.
            stage = Stage.NUMBER;
            fullStop = false;
            lastFullStop = false;
            writer.append(character.getString());
        } else if (character.getString() === '.') {
            appendToken(character.getRow(), character.getColumn());

            writer = new StringBuffer();
            writer.append(".");
            stage = Stage.REFERENCE;

        } else {
            stage = Stage.OPERATOR;
            writer.append(character.getString());
        }

    }

    if (stage === Stage.STRING || stage === Stage.RAW_STRING) {
        throw new TemplateError(row, column, `Unclosed string`);
    }

    appendToken(reader.getRow(), reader.getColumn());

    return results;
}

