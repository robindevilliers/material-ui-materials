import { parse } from './lexer';
import { LexicalToken } from './LexicalToken';
import { LexicalTokenType } from './LexicalTokenType';

describe("lexer", () => {

    test('strip leading whitespace from expression for purposes of row, and column', () => {
        const template = '${  content}';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.INTERPOLATION, 0, 0, '', 'content', 0, 4)
        ]);
    });

    test('simple', () => {
        const template = '<div class="${classes}" style="${itemStyles} ${containerStyles}">${content}</div>';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.TEXT, 0, 0, '<div class="', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 12, 0, '', 'classes', 0, 14),
            new LexicalToken(LexicalTokenType.TEXT, 22, 0, '" style="', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 31, 0, '', 'itemStyles', 0, 33),
            new LexicalToken(LexicalTokenType.TEXT, 44, 0, ' ', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 45, 0, '', 'containerStyles', 0, 47),
            new LexicalToken(LexicalTokenType.TEXT, 63, 0, '">', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 65, 0, '', 'content', 0, 67),
            new LexicalToken(LexicalTokenType.TEXT, 75, 0, '</div>', undefined),
        ]);
    });

    test('carriage returns, and complex expressions', () => {
        const template = '<div id="${id!}" class="accordion-widget accordion ${flush?string("accordion-flush","")} ${classes}" style="${itemStyles}">\n\
            ${content}\n\
            </div>';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.TEXT, 0, 0, '<div id="', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 9, 0, '', 'id!', 0, 11),
            new LexicalToken(LexicalTokenType.TEXT, 15, 0, '" class="accordion-widget accordion ', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 51, 0, '', 'flush?string("accordion-flush","")', 0, 53),
            new LexicalToken(LexicalTokenType.TEXT, 88, 0, ' ', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 89, 0, '', 'classes', 0, 91),
            new LexicalToken(LexicalTokenType.TEXT, 99, 0, '" style="', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 108, 0, '', 'itemStyles', 0, 110),
            new LexicalToken(LexicalTokenType.TEXT, 121, 0, '">\n            ', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 12, 1, '', 'content', 1, 14),
            new LexicalToken(LexicalTokenType.TEXT, 22, 1, '\n            </div>', undefined),
        ]);
    });

    test('raw strings', () => {
        const template = 'Hello ${r"${user}"}!';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.TEXT, 0, 0, 'Hello ', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 6, 0, '', 'r"${user}"', 0, 8),
            new LexicalToken(LexicalTokenType.TEXT, 19, 0, '!', undefined),
        ]);
    });

    test('strings', () => {
        const template = 'Hello ${user + " esquire"}!';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.TEXT, 0, 0, 'Hello ', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 6, 0, '', 'user + " esquire"', 0, 8),
            new LexicalToken(LexicalTokenType.TEXT, 26, 0, '!', undefined),
        ]);
    });

    test('strings with close parenthesis', () => {
        const template = 'Hello ${user + " {0\\\\}"}!';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.TEXT, 0, 0, 'Hello ', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 6, 0, '', 'user + " {0\\\\}"', 0, 8),
            new LexicalToken(LexicalTokenType.TEXT, 24, 0, '!', undefined),
        ]);
    });

    test('list directive - complex', () => {
        const template = '<#list sequence>\n' +
            '    Part executed once if we have more than 0 items\n' +
            '    <#items as item>\n' +
            '    Part repeated for each item\n' +
            '    </#items>\n' +
            '    Part executed once if we have more than 0 items\n' +
            '    <#else>\n' +
            '    Part executed when there are 0 items\n' +
            '    </#list>';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.OPEN_DIRECTIVE, 0, 0, 'list', 'sequence', 0, 7),
            new LexicalToken(LexicalTokenType.TEXT, 16, 0, '\n    Part executed once if we have more than 0 items\n    ', undefined),
            new LexicalToken(LexicalTokenType.OPEN_DIRECTIVE, 4, 2, 'items', 'as item', 2, 12),
            new LexicalToken(LexicalTokenType.TEXT, 20, 2, '\n    Part repeated for each item\n    ', undefined),
            new LexicalToken(LexicalTokenType.CLOSE_DIRECTIVE, 4, 4, 'items', ''),
            new LexicalToken(LexicalTokenType.TEXT, 13, 4, '\n    Part executed once if we have more than 0 items\n    ', undefined),
            new LexicalToken(LexicalTokenType.OPEN_DIRECTIVE, 4, 6, 'else', ''),
            new LexicalToken(LexicalTokenType.TEXT, 11, 6, '\n    Part executed when there are 0 items\n    ', undefined),
            new LexicalToken(LexicalTokenType.CLOSE_DIRECTIVE, 4, 8, 'list', ''),
        ]);
    });

    test('list directive - simple', () => {
        const template = '<#list sequence as item>\n' +
            '    Part repeated for each item\n' +
            '</#list>';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.OPEN_DIRECTIVE, 0, 0, 'list', 'sequence as item', 0, 7),
            new LexicalToken(LexicalTokenType.TEXT, 24, 0, '\n    Part repeated for each item\n', undefined),
            new LexicalToken(LexicalTokenType.CLOSE_DIRECTIVE, 0, 2, 'list', ''),
        ]);
    });

    test('if directive - with string containing \'>\'', () => {
        const template = '<#if token == ">" >\n' +
            '    Part repeated for each item\n' +
            '</#if>';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.OPEN_DIRECTIVE, 0, 0, 'if', 'token == ">" ', 0, 5),
            new LexicalToken(LexicalTokenType.TEXT, 19, 0, '\n    Part repeated for each item\n', undefined),
            new LexicalToken(LexicalTokenType.CLOSE_DIRECTIVE, 0, 2, 'if', ''),
        ]);
    });

    test('if directive - with string containing \'>\' and quotes', () => {
        const template = '<#if token == "\\">\\"" >\n' +
            '    Part repeated for each item\n' +
            '</#if>';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.OPEN_DIRECTIVE, 0, 0, 'if', 'token == "\\">\\"" ', 0, 5),
            new LexicalToken(LexicalTokenType.TEXT, 23, 0, '\n    Part repeated for each item\n', undefined),
            new LexicalToken(LexicalTokenType.CLOSE_DIRECTIVE, 0, 2, 'if', ''),
        ]);
    });


    test('interpolation error', () => {
        const template = '<span class="form-text text-danger">${errors.getFieldError("contactNumber").getDefaultMessage()}</span>';

        const tokens = parse(template);

        expect(tokens).toEqual([
            new LexicalToken(LexicalTokenType.TEXT, 0, 0, '<span class="form-text text-danger">', undefined),
            new LexicalToken(LexicalTokenType.INTERPOLATION, 36, 0, '', 'errors.getFieldError("contactNumber").getDefaultMessage()', 0, 38),
            new LexicalToken(LexicalTokenType.TEXT, 96, 0, '</span>', undefined),
        ]);
    });


});
