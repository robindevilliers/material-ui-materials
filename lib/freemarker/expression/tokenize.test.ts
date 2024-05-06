import { Token, tokenize, TokenType } from './tokenize';

describe('tokenize', () => {

    test('lhs == rhs', () => {

        const tokens = tokenize("lhs == rhs");

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "lhs", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.EQUAL, "==", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.REFERENCE, "rhs", 0, 7));

    });

    test('true != false', () => {

        const tokens = tokenize("true != false");

        expect(tokens[0]).toEqual(new Token(TokenType.TRUE, "true", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NOT_EQUAL, "!=", 0, 5));
        expect(tokens[2]).toEqual(new Token(TokenType.FALSE, "false", 0, 8));

    });

    test('name != "robin"', () => {
        const tokens = tokenize('name != "robin"');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NOT_EQUAL, "!=", 0, 5));
        expect(tokens[2]).toEqual(new Token(TokenType.STRING, "robin", 0, 8));
    });

    test('age != +45.0', () => {
        const tokens = tokenize('age != +45.0');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "age", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NOT_EQUAL, "!=", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.PLUS, "+", 0, 7));
        expect(tokens[3]).toEqual(new Token(TokenType.NUMBER, "45.0", 0, 8));
    });

    test('age != 45.0', () => {
        const tokens = tokenize('age != 45.0');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "age", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NOT_EQUAL, "!=", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.NUMBER, "45.0", 0, 7));
    });

    test('name != \'robin\'', () => {
        const tokens = tokenize('name != \'robin\'');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NOT_EQUAL, "!=", 0, 5));
        expect(tokens[2]).toEqual(new Token(TokenType.STRING, "robin", 0, 8));
    });

    test('name != \'daniel O\\\'leary\'', () => {
        const tokens = tokenize("name != 'daniel O\\'leary'");

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NOT_EQUAL, "!=", 0, 5));
        expect(tokens[2]).toEqual(new Token(TokenType.STRING, "daniel O'leary", 0, 9));
    });

    test('name <= "\\x0A9 1999-2001"', () => {
        const tokens = tokenize('name <= "\\x0A9 1999-2001"');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.LESS_THAN_OR_EQUAL, "<=", 0, 5));
        expect(tokens[2]).toEqual(new Token(TokenType.STRING, "\\x0A9 1999-2001", 0, 8));
    });

    test('!name && first || second', () => {
        const tokens = tokenize('!name && first || second');

        expect(tokens[0]).toEqual(new Token(TokenType.BANG, "!", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.AND, "&&", 0, 6));
        expect(tokens[3]).toEqual(new Token(TokenType.REFERENCE, "first", 0, 9));
        expect(tokens[4]).toEqual(new Token(TokenType.OR, "||", 0, 15));
        expect(tokens[5]).toEqual(new Token(TokenType.REFERENCE, "second", 0, 18));
    });

    test('!name && (first)', () => {
        const tokens = tokenize('!name && (first)');

        expect(tokens[0]).toEqual(new Token(TokenType.BANG, "!", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.AND, "&&", 0, 6));
        expect(tokens[3]).toEqual(new Token(TokenType.OPEN_PARENTHESIS, "(", 0, 9));
        expect(tokens[4]).toEqual(new Token(TokenType.REFERENCE, "first", 0, 10));
        expect(tokens[5]).toEqual(new Token(TokenType.CLOSE_PARENTHESIS, ")", 0, 15));
    });

    test('name && !("robin")', () => {
        const tokens = tokenize('name && !("robin")');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.AND, "&&", 0, 5));
        expect(tokens[2]).toEqual(new Token(TokenType.BANG, "!", 0, 8));
        expect(tokens[3]).toEqual(new Token(TokenType.OPEN_PARENTHESIS, "(", 0, 9));
        expect(tokens[4]).toEqual(new Token(TokenType.STRING, "robin", 0, 10));
        expect(tokens[5]).toEqual(new Token(TokenType.CLOSE_PARENTHESIS, ")", 0, 17));
    });

    test('name == r"c:\\foo\\bar"', () => {
        const tokens = tokenize('name == r"c:\\foo\\bar"');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.EQUAL, "==", 0, 5));
        expect(tokens[2]).toEqual(new Token(TokenType.STRING, "c:\\foo\\bar", 0, 8));
    });

    test('["test", -56.0, name]', () => {
        const tokens = tokenize('["test", -56.0, name]');

        expect(tokens[0]).toEqual(new Token(TokenType.OPEN_SEQUENCE, "[", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.STRING, "test", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.COMMA, ",", 0, 7));
        expect(tokens[3]).toEqual(new Token(TokenType.MINUS, "-", 0, 9));
        expect(tokens[4]).toEqual(new Token(TokenType.NUMBER, "56.0", 0, 10));
        expect(tokens[5]).toEqual(new Token(TokenType.COMMA, ",", 0, 14));
        expect(tokens[6]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 16));
        expect(tokens[7]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 20));
    });

    test('[2 + 2, [1, 2, 3, 4], "foo"]', () => {
        const tokens = tokenize('[2 + 2, [1], "foo"]');

        expect(tokens[0]).toEqual(new Token(TokenType.OPEN_SEQUENCE, "[", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NUMBER, "2", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.PLUS, "+", 0, 3));
        expect(tokens[3]).toEqual(new Token(TokenType.NUMBER, "2", 0, 5));
        expect(tokens[4]).toEqual(new Token(TokenType.COMMA, ",", 0, 6));
        expect(tokens[5]).toEqual(new Token(TokenType.OPEN_SEQUENCE, "[", 0, 8));
        expect(tokens[6]).toEqual(new Token(TokenType.NUMBER, "1", 0, 9));
        expect(tokens[7]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 10));
        expect(tokens[8]).toEqual(new Token(TokenType.COMMA, ",", 0, 11));
        expect(tokens[9]).toEqual(new Token(TokenType.STRING, "foo", 0, 13));
        expect(tokens[10]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 18));
    });

    test('[2..4]', () => {
        const tokens = tokenize('[2..4]');

        expect(tokens[0]).toEqual(new Token(TokenType.OPEN_SEQUENCE, "[", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NUMBER, "2", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.RANGE_INCLUSIVE, "..", 0, 2));
        expect(tokens[3]).toEqual(new Token(TokenType.NUMBER, "4", 0, 4));
        expect(tokens[4]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 5));
    });

    test('[2..<4]', () => {
        const tokens = tokenize('[2..<4]');

        expect(tokens[0]).toEqual(new Token(TokenType.OPEN_SEQUENCE, "[", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NUMBER, "2", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.RANGE_EXCLUSIVE, "..<", 0, 2));
        expect(tokens[3]).toEqual(new Token(TokenType.NUMBER, "4", 0, 5));
        expect(tokens[4]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 6));
    });

    test('[2..*+4]', () => {
        const tokens = tokenize('[2..*+4]');

        expect(tokens[0]).toEqual(new Token(TokenType.OPEN_SEQUENCE, "[", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NUMBER, "2", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.RANGE_LENGTH_INC, "..*+", 0, 2));
        expect(tokens[3]).toEqual(new Token(TokenType.NUMBER, "4", 0, 6));
        expect(tokens[4]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 7));
    });

    test('[2..*-4]', () => {
        const tokens = tokenize('[2..*-4]');

        expect(tokens[0]).toEqual(new Token(TokenType.OPEN_SEQUENCE, "[", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.NUMBER, "2", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.RANGE_LENGTH_DEC, "..*-", 0, 2));
        expect(tokens[3]).toEqual(new Token(TokenType.NUMBER, "4", 0, 6));
        expect(tokens[4]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 7));
    });

    test('{"name":"green mouse", "price":150}', () => {
        const tokens = tokenize('{"name":"green mouse", "price":150}');

        expect(tokens[0]).toEqual(new Token(TokenType.OPEN_HASH, "{", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.STRING, "name", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.COLON, ":", 0, 7));
        expect(tokens[3]).toEqual(new Token(TokenType.STRING, "green mouse", 0, 8));
        expect(tokens[4]).toEqual(new Token(TokenType.COMMA, ",", 0, 21));
        expect(tokens[5]).toEqual(new Token(TokenType.STRING, "price", 0, 23));
        expect(tokens[6]).toEqual(new Token(TokenType.COLON, ":", 0, 30));
        expect(tokens[7]).toEqual(new Token(TokenType.NUMBER, "150", 0, 31));
        expect(tokens[8]).toEqual(new Token(TokenType.CLOSE_HASH, "}", 0, 34));
    });

    test('person.name', () => {
        const tokens = tokenize('person.name');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "person", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.DEREFERENCE, ".", 0, 6));
        expect(tokens[2]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 7));

    });
    test('.name', () => {
        const tokens = tokenize('.name');

        expect(tokens[0]).toEqual(new Token(TokenType.DEREFERENCE, ".", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 1));
    });
    test('"Hello " + user + "!"', () => {
        const tokens = tokenize('"Hello " + user + "!"');

        expect(tokens[0]).toEqual(new Token(TokenType.STRING, "Hello ", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.PLUS, "+", 0, 9));
        expect(tokens[2]).toEqual(new Token(TokenType.REFERENCE, "user", 0, 11));
        expect(tokens[3]).toEqual(new Token(TokenType.PLUS, "+", 0, 16));
        expect(tokens[4]).toEqual(new Token(TokenType.STRING, "!", 0, 18));
    });
    test('"Hello ${user}!"', () => {
        const tokens = tokenize('"Hello ${user}!"');

        expect(tokens[0]).toEqual(new Token(TokenType.STRING, "Hello ${user}!", 0, 0));
    });
    test('name[5..]', () => {
        const tokens = tokenize('name[5..]');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.OPEN_SLICE, "[", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.NUMBER, "5", 0, 5));
        expect(tokens[3]).toEqual(new Token(TokenType.RANGE_INCLUSIVE, "..", 0, 6));
        expect(tokens[4]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 8));
    });
    test('products[20..29]', () => {
        const tokens = tokenize('products[20..29]');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "products", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.OPEN_SLICE, "[", 0, 8));
        expect(tokens[2]).toEqual(new Token(TokenType.NUMBER, "20", 0, 9));
        expect(tokens[3]).toEqual(new Token(TokenType.RANGE_INCLUSIVE, "..", 0, 11));
        expect(tokens[4]).toEqual(new Token(TokenType.NUMBER, "29", 0, 13));
        expect(tokens[5]).toEqual(new Token(TokenType.CLOSE_SEQUENCE, "]", 0, 15));
    });
    test('name?upper_case', () => {
        const tokens = tokenize('name?upper_case');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.CALL_BUILTIN, "?", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.BUILTIN, "upper_case", 0, 5));
    });
    test('repeat("What", 3)', () => {
        const tokens = tokenize('repeat("What", 3)');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "repeat", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.CALL_METHOD, "(", 0, 6));
        expect(tokens[2]).toEqual(new Token(TokenType.STRING, "What", 0, 7));
        expect(tokens[3]).toEqual(new Token(TokenType.COMMA, ",", 0, 13));
        expect(tokens[4]).toEqual(new Token(TokenType.NUMBER, "3", 0, 15));
        expect(tokens[5]).toEqual(new Token(TokenType.CLOSE_PARENTHESIS, ")", 0, 16));
    });

    test('name!"unknown"', () => {
        const tokens = tokenize('name!"unknown"');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "name", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.BANG, "!", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.STRING, "unknown", 0, 5));
    });

    test('lookup()!"unknown"', () => {
        const tokens = tokenize('lookup()!"unknown"');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "lookup", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.CALL_METHOD, "(", 0, 6));
        expect(tokens[2]).toEqual(new Token(TokenType.CLOSE_PARENTHESIS, ")", 0, 7));
        expect(tokens[3]).toEqual(new Token(TokenType.BANG, "!", 0, 8));
        expect(tokens[4]).toEqual(new Token(TokenType.STRING, "unknown", 0, 9));
    });

    test('(product.color)!"red"', () => {
        const tokens = tokenize('(product.color)!"red"');

        expect(tokens[0]).toEqual(new Token(TokenType.OPEN_PARENTHESIS, "(", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.REFERENCE, "product", 0, 1));
        expect(tokens[2]).toEqual(new Token(TokenType.DEREFERENCE, ".", 0, 8));
        expect(tokens[3]).toEqual(new Token(TokenType.REFERENCE, "color", 0, 9));
        expect(tokens[4]).toEqual(new Token(TokenType.CLOSE_PARENTHESIS, ")", 0, 14));
        expect(tokens[5]).toEqual(new Token(TokenType.BANG, "!", 0, 15));
        expect(tokens[6]).toEqual(new Token(TokenType.STRING, "red", 0, 16));
    });

    test('product??', () => {
        const tokens = tokenize('product??');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "product", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.IS_DEFINED, "??", 0, 7));

    });

    test('val += 1', () => {
        const tokens = tokenize('val += 1');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.ADD_AND_ASSIGN, "+=", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.NUMBER, "1", 0, 7));
    });

    test('val -= 1', () => {
        const tokens = tokenize('val -= 1');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.SUBTRACT_AND_ASSIGN, "-=", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.NUMBER, "1", 0, 7));
    });

    test('val /= 1', () => {
        const tokens = tokenize('val /= 1');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.DIVIDE_AND_ASSIGN, "/=", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.NUMBER, "1", 0, 7));
    });

    test('val *= 1', () => {
        const tokens = tokenize('val *= 1');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.MULTIPLY_AND_ASSIGN, "*=", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.NUMBER, "1", 0, 7));
    });

    test('val %= 1', () => {
        const tokens = tokenize('val %= 1');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.MODULUS_AND_ASSIGN, "%=", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.NUMBER, "1", 0, 7));
    });

    test('val = val + 1', () => {
        const tokens = tokenize('val = val + 1');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.ASSIGN, "=", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 6));
        expect(tokens[3]).toEqual(new Token(TokenType.PLUS, "+", 0, 10));
        expect(tokens[4]).toEqual(new Token(TokenType.NUMBER, "1", 0, 12));
    });

    test('val -> true', () => {
        const tokens = tokenize('val -> true');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.LAMBDA, "->", 0, 4));
        expect(tokens[2]).toEqual(new Token(TokenType.TRUE, "true", 0, 7));
    });

    test('val++', () => {
        const tokens = tokenize('val++');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.PLUS_PLUS, "++", 0, 3));
    });

    test('val--', () => {
        const tokens = tokenize('val--');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "val", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.MINUS_MINUS, "--", 0, 3));
    });

    test('errors?? && errors.getFieldError("username").getRejectedValue()', () => {
        const tokens = tokenize('errors?? && errors.getFieldError("username").getRejectedValue()');

        expect(tokens[0]).toEqual(new Token(TokenType.REFERENCE, "errors", 0, 0));
        expect(tokens[1]).toEqual(new Token(TokenType.IS_DEFINED, "??", 0, 6));
        expect(tokens[2]).toEqual(new Token(TokenType.AND, "&&", 0, 9));
        expect(tokens[3]).toEqual(new Token(TokenType.REFERENCE, "errors", 0, 12));
        expect(tokens[4]).toEqual(new Token(TokenType.DEREFERENCE, ".", 0, 18));
        expect(tokens[5]).toEqual(new Token(TokenType.REFERENCE, "getFieldError", 0, 19));
        expect(tokens[6]).toEqual(new Token(TokenType.CALL_METHOD, "(", 0, 32));
        expect(tokens[7]).toEqual(new Token(TokenType.STRING, "username", 0, 33));
        expect(tokens[8]).toEqual(new Token(TokenType.CLOSE_PARENTHESIS, ")", 0, 43));
        expect(tokens[9]).toEqual(new Token(TokenType.DEREFERENCE, ".", 0, 44));
        expect(tokens[10]).toEqual(new Token(TokenType.REFERENCE, "getRejectedValue", 0, 45));
        expect(tokens[11]).toEqual(new Token(TokenType.CALL_METHOD, "(", 0, 61));
        expect(tokens[12]).toEqual(new Token(TokenType.CLOSE_PARENTHESIS, ")", 0, 62));
    });

});
