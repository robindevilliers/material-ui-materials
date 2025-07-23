import { ExpressionEngine } from './expression-engine';
import { TemplateError } from './TemplateError';
import { Errors, FieldError } from './Errors';

describe('engine', () => {

    test('lhs == rhs', () => {
        const expression = new ExpressionEngine().build("lhs == rhs", 0, 0)!;

        expect(expression.evaluate({
            lhs: 'test',
            rhs: 'test'
        }).retrieve()).toEqual(true);

        expect(expression.evaluate({
            lhs: 'test',
            rhs: 'test2'
        }).retrieve()).toEqual(false);
    });

    test('true != false', () => {
        const expression = new ExpressionEngine().build("lhs != rhs", 0, 0)!;

        expect(expression.evaluate({ lhs: 1, rhs: 1 }).retrieve()).toEqual(false);
    });

    test('name != "robin"', () => {
        const expression = new ExpressionEngine().build('name != "robin"', 0, 0)!;

        expect(expression.evaluate({
            name: "robin"
        }).retrieve()).toEqual(false);
    });

    test('age != +45.0', () => {
        const expression = new ExpressionEngine().build('age != +45.0', 0, 0)!;

        expect(expression.evaluate({
            age: 67
        }).retrieve()).toEqual(true);
    });

    test('age == -(45 + 3)', () => {
        const expression = new ExpressionEngine().build('age == -(45 + 3)', 0, 0)!;

        expect(expression.evaluate({
            age: -48
        }).retrieve()).toEqual(true);
    });

    test('25 + 2 * 3 - 12 / 2', () => {
        const expression = new ExpressionEngine().build('25 + 2 * 3 - 12 / 2', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(25);
    });

    test('(25 + 2) * (3 - 12) / 2', () => {
        const expression = new ExpressionEngine().build('(25 + 2) * (3 - 12) / 2', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(-121.5);
    });

    test('25 % 10', () => {
        const expression = new ExpressionEngine().build('25 % 10', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(5);
    });

    test('!name && first || second', () => {
        const expression = new ExpressionEngine().build('!first && second || third', 0, 0)!;

        expect(expression.evaluate({
            first: false,
            second: true,
            third: false
        }).retrieve()).toEqual(true);
    });

    test('first && first || second', () => {
        const expression = new ExpressionEngine().build('first && second || third', 0, 0)!;

        expect(expression.evaluate({
            first: false,
            second: false,
            third: true
        }).retrieve()).toEqual(true);
    });

    test('first && (first || second)', () => {
        const expression = new ExpressionEngine().build('first && (second || third)', 0, 0)!;

        expect(expression.evaluate({
            first: false,
            second: false,
            third: true
        }).retrieve()).toEqual(false);
    });

    test('4 < 5', () => {
        const expression = new ExpressionEngine().build("4 < 5", 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(true);
    });

    test('4 > 5', () => {
        const expression = new ExpressionEngine().build("4 > 5", 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(false);
    });

    test('5 <= 5', () => {
        const expression = new ExpressionEngine().build("5 <= 5", 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(true);
    });

    test('5 >= 5', () => {
        const expression = new ExpressionEngine().build("5 >= 5", 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(true);
    });

    test('data[1]', () => {
        const expression = new ExpressionEngine().build("data[1]", 0, 0)!;

        expect(expression.evaluate({
            data: [4, 5, 6]
        }).retrieve()).toEqual(5);
    });

    test('data[1] on string', () => {
        const expression = new ExpressionEngine().build("data[1]", 0, 0)!;

        expect(expression.evaluate({
            data: "robin"
        }).retrieve()).toEqual("o");
    });

    test('data[1..2]', () => {
        const expression = new ExpressionEngine().build("data[1..2]", 0, 0)!;

        expect(expression.evaluate({
            data: [4, 5, 6]
        }).retrieve()).toEqual([5, 6]);
    });

    test('data?? && data[1..2]', () => {
        const expression = new ExpressionEngine().build("data?? && data[1..2]", 0, 0)!;

        expect(expression.evaluate({
            data: [4, 5, 6]
        }).retrieve()).toEqual([5, 6]);
    });

    test('data[1..2] on string', () => {
        const expression = new ExpressionEngine().build("data[1..2]", 0, 0)!;

        expect(expression.evaluate({
            data: "robin"
        }).retrieve()).toEqual("ob");
    });

    test('data[1..<2]', () => {
        const expression = new ExpressionEngine().build("data[1..<2]", 0, 0)!;

        expect(expression.evaluate({
            data: [4, 5, 6]
        }).retrieve()).toEqual([5]);
    });

    test('data[1..<4] on string', () => {
        const expression = new ExpressionEngine().build("data[1..<4]", 0, 0)!;

        expect(expression.evaluate({
            data: "robin"
        }).retrieve()).toEqual("obi");
    });

    test('data[1..]', () => {
        const expression = new ExpressionEngine().build("data[1..]", 0, 0)!;

        expect(expression.evaluate({
            data: [4, 5, 6]
        }).retrieve()).toEqual([5, 6]);
    });

    test('data[1..] on string', () => {
        const expression = new ExpressionEngine().build("data[1..]", 0, 0)!;

        expect(expression.evaluate({
            data: "robin"
        }).retrieve()).toEqual("obin");
    });

    test('data[1..*4]', () => {
        const expression = new ExpressionEngine().build("data[1..*4]", 0, 0)!;

        expect(expression.evaluate({
            data: [4, 5, 6, 7, 8, 9]
        }).retrieve()).toEqual([5, 6, 7, 8]);
    });

    test('data[1..*4] on string', () => {
        const expression = new ExpressionEngine().build("data[1..*4]", 0, 0)!;

        expect(expression.evaluate({
            data: "robin"
        }).retrieve()).toEqual("obin");
    });

    test('data[1..*6] lenient', () => {
        const expression = new ExpressionEngine().build("data[1..*6]", 0, 0)!;

        expect(expression.evaluate({
            data: [4, 5, 6, 7, 8, 9]
        }).retrieve()).toEqual([5, 6, 7, 8, 9]);
    });

    test('data[1..*5] on string lenient', () => {
        const expression = new ExpressionEngine().build("data[1..*5]", 0, 0)!;

        expect(expression.evaluate({
            data: "robin"
        }).retrieve()).toEqual("obin");
    });

    test('data[1..*-4]', () => {
        const expression = new ExpressionEngine().build("data[4..*-4]", 0, 0)!;

        expect(expression.evaluate({
            data: [4, 5, 6, 7, 8, 9]
        }).retrieve()).toEqual([8, 7, 6, 5]);
    });

    test('data[1..*-4] on string', () => {
        const expression = new ExpressionEngine().build("data[4..*-4]", 0, 0)!;

        expect(expression.evaluate({
            data: "robin"
        }).retrieve()).toEqual("nibo");
    });


    test('name!"unknown"', () => {
        const expression = new ExpressionEngine().build('name!"unknown"', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual("unknown");
    });

    test('name??', () => {
        const expression = new ExpressionEngine().build('name??', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(false);
    });

    test('[1,2,3]', () => {
        const expression = new ExpressionEngine().build('[1,2,3]', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual([1, 2, 3]);
    });

    test('[1,2,3] + [4,5]', () => {
        const expression = new ExpressionEngine().build('[1,2,3] + [4,5]', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual([1, 2, 3, 4, 5]);
    });

    test('"test " + "two"', () => {
        const expression = new ExpressionEngine().build('"test " + "two"', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual("test two");
    });

    test('{ "one": 1, "two": 2, "three": 3}', () => {
        const expression = new ExpressionEngine().build('{ "one": 1, "two": 2, "three": 3}', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual({ "one": 1, "two": 2, "three": 3 });
    });

    test('{ "one": 1, "two": 2, "three": 3} + {"four": 4, "five": 5}', () => {
        const expression = new ExpressionEngine().build('{ "one": 1, "two": 2, "three": 3} + {"four": 4, "five": 5}', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual({ "one": 1, "two": 2, "three": 3, "four": 4, "five": 5 });
    });

    test('value += 2', () => {
        const expression = new ExpressionEngine().build('value += 2', 0, 0)!;

        const data = { value: 1 };

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(3);
    });

    test('value -= 2', () => {
        const expression = new ExpressionEngine().build('value -= 2', 0, 0)!;

        const data = { value: 1 };

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(-1);
    });

    test('value -= 2', () => {
        const expression = new ExpressionEngine().build('value -= 2', 0, 0)!;

        const data = { value: 1 };

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(-1);
    });

    test('value *= 2', () => {
        const expression = new ExpressionEngine().build('value *= 2', 0, 0)!;

        const data = { value: 1 };

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(2);
    });

    test('value /= 2', () => {
        const expression = new ExpressionEngine().build('value /= 2', 0, 0)!;

        const data = { value: 1 };

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(0.5);
    });

    test('value %= 2', () => {
        const expression = new ExpressionEngine().build('value %= 2', 0, 0)!;

        const data = { value: 9 };

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(1);
    });

    test('value++', () => {
        const expression = new ExpressionEngine().build('value++', 0, 0)!;

        const data = { value: 9 };

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(10);
    });

    test('value--', () => {
        const expression = new ExpressionEngine().build('value--', 0, 0)!;

        const data = { value: 9 };

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(8);
    });

    test('value = 1 + 2', () => {
        const expression = new ExpressionEngine().build('value = 1 + 2', 0, 0)!;

        const data: Record<string, any> = {};

        expect(expression.evaluate(data).retrieve()).toBeUndefined();
        expect(data.value).toEqual(3);
    });

    test('data.value', () => {
        const expression = new ExpressionEngine().build('data.value', 0, 0)!;

        const data: Record<string, any> = {
            data: {
                value: 1
            }
        };

        expect(expression.evaluate(data).retrieve()).toEqual(1);
    });

    test('data["value"]', () => {
        const expression = new ExpressionEngine().build('data["value"]', 0, 0)!;

        const data: Record<string, any> = {
            data: {
                value: 1
            }
        };

        expect(expression.evaluate(data).retrieve()).toEqual(1);
    });

    test('doStuff()', () => {
        const expression = new ExpressionEngine().build('doStuff()', 0, 0)!;

        const data: Record<string, any> = {
            doStuff: function() {
                return 4;
            }
        };

        expect(expression.evaluate(data).retrieve()).toEqual(4);
    });

    test('doStuff(1)', () => {
        const expression = new ExpressionEngine().build('doStuff(1)', 0, 0)!;

        const data: Record<string, any> = {
            doStuff: function(arg: number) {
                return 4 + arg;
            }
        };

        expect(expression.evaluate(data).retrieve()).toEqual(5);
    });

    test('doStuff(1, 2)', () => {
        const expression = new ExpressionEngine().build('doStuff(1, 2)', 0, 0)!;

        const data: Record<string, any> = {
            doStuff: function(arg1: number, arg2: number) {
                return 4 + arg1 + arg2;
            }
        };

        expect(expression.evaluate(data).retrieve()).toEqual(7);
    });

    test('name?upper_case', () => {
        const expression = new ExpressionEngine().build('name?upper_case', 0, 0)!;

        const data: Record<string, any> = {
            name: "robin"
        };

        expect(expression.evaluate(data).retrieve()).toEqual("ROBIN");
    });

    test('name?lower_case?cap_first', () => {
        const expression = new ExpressionEngine().build('name?lower_case?cap_first', 0, 0)!;

        const data: Record<string, any> = {
            name: "ROBIN"
        };

        expect(expression.evaluate(data).retrieve()).toEqual("Robin");
    });

    test('name?cap_first', () => {
        const expression = new ExpressionEngine().build('name?cap_first', 0, 0)!;

        expect(expression.evaluate({
            name: "robin"
        }).retrieve()).toEqual("Robin");

        expect(expression.evaluate({
            name: "- robin"
        }).retrieve()).toEqual("- robin");

        expect(expression.evaluate({
            name: "   robin"
        }).retrieve()).toEqual("   Robin");
    });

    test('name?lower_case', () => {
        const expression = new ExpressionEngine().build('name?lower_case', 0, 0)!;

        const data: Record<string, any> = {
            name: "ROBIN"
        };

        expect(expression.evaluate(data).retrieve()).toEqual("robin");
    });

    test('name?capitalize', () => {
        const expression = new ExpressionEngine().build('name?capitalize', 0, 0)!;

        const data: Record<string, any> = {
            name: "robin dE vilLiers"
        };

        expect(expression.evaluate(data).retrieve()).toEqual("Robin De Villiers");
    });

    test('name?chop_linebreak', () => {
        const expression = new ExpressionEngine().build('name?chop_linebreak', 0, 0)!;

        const data: Record<string, any> = {
            name: "robin\r\n\r\n"
        };

        expect(expression.evaluate(data).retrieve()).toEqual("robin\r\n");
    });

    test('name?contains("de")', () => {
        const expression = new ExpressionEngine().build('name?contains("de")', 0, 0)!;

        const data: Record<string, any> = {
            name: "robin de villiers"
        };

        expect(expression.evaluate(data).retrieve()).toEqual(true);
    });

    test('name?boolean', () => {
        const expression = new ExpressionEngine().build('value?boolean', 0, 0)!;

        expect(expression.evaluate({
            value: "true"
        }).retrieve()).toEqual(true);

        expect(expression.evaluate({
            value: "false"
        }).retrieve()).toEqual(false);
    });

    test('when?date', () => {
        const expression = new ExpressionEngine().build('when?date', 0, 0)!;

        expect(expression.evaluate({
            when: "01 Feb 2004 3:00:00.000"
        }).retrieve()).toEqual(new Date("2004-02-01T00:00:00.000Z"));

    });

    test('when?datetime', () => {
        const expression = new ExpressionEngine().build('when?datetime', 0, 0)!;

        expect(expression.evaluate({
            when: "01 Feb 2004 3:00:00.000"
        }).retrieve()).toEqual(new Date("2004-02-01T03:00:00.000Z"));
    });

    test('when?time', () => {
        const expression = new ExpressionEngine().build('when?time', 0, 0)!;

        expect(expression.evaluate({
            when: "01 Feb 2004 3:00:00.000"
        }).retrieve()).toEqual(new Date("1970-01-01T03:00:00.000Z"));
    });

    test('name?ends_with("villiers")', () => {
        const expression = new ExpressionEngine().build('name?ends_with("villiers")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual(true);
    });

    test('name?ensure_ends_with("iers")', () => {
        const expression = new ExpressionEngine().build('name?ensure_ends_with("iers")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villier"
        }).retrieve()).toEqual("robin de villiers");

        expect(expression.evaluate({
            name: "robin de vill"
        }).retrieve()).toEqual("robin de villiers");

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual("robin de villiers");
    });

    test('name?ensure_starts_with("robin ")', () => {
        const expression = new ExpressionEngine().build('name?ensure_starts_with("robin ")', 0, 0)!;

        expect(expression.evaluate({
            name: "de villiers"
        }).retrieve()).toEqual("robin de villiers");

        expect(expression.evaluate({
            name: "obin de villiers"
        }).retrieve()).toEqual("robin de villiers");

        expect(expression.evaluate({
            name: "in de villiers"
        }).retrieve()).toEqual("robin de villiers");
    });

    test('name?ensure_starts_with("[A-Za-z]+", "robin")', () => {
        const expression = new ExpressionEngine().build('name?ensure_starts_with("[A-Za-z]+", "robin")', 0, 0)!;

        expect(expression.evaluate({
            name: "somebody de villiers"
        }).retrieve()).toEqual("robin de villiers");
    });

    test('name?index_of("de")', () => {
        const expression = new ExpressionEngine().build('name?index_of("de")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual(6);
    });

    test('name?last_index_of("de")', () => {
        const expression = new ExpressionEngine().build('name?last_index_of("de")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual(6);
    });

    test('name?keep_after("de")', () => {
        const expression = new ExpressionEngine().build('name?keep_after("de")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual(" villiers");

        expect(expression.evaluate({
            name: "mississippi"
        }).retrieve()).toEqual("");
    });

    test('name?keep_after_last("de")', () => {
        const expression = new ExpressionEngine().build('name?keep_after_last("de")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual(" villiers");

        expect(expression.evaluate({
            name: "mississippi"
        }).retrieve()).toEqual("");
    });

    test('name?keep_before("de")', () => {
        const expression = new ExpressionEngine().build('name?keep_before("de")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual("robin ");

        expect(expression.evaluate({
            name: "mississippi"
        }).retrieve()).toEqual("");
    });

    test('name?keep_before_last("de")', () => {
        const expression = new ExpressionEngine().build('name?keep_before_last("de")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual("robin ");

        expect(expression.evaluate({
            name: "mississippi"
        }).retrieve()).toEqual("");
    });

    test('name?left_pad(5)', () => {
        const expression = new ExpressionEngine().build('name?left_pad(5)', 0, 0)!;

        expect(expression.evaluate({
            name: "ab"
        }).retrieve()).toEqual("   ab");
    });

    test('name?left_pad(5, "12")', () => {
        const expression = new ExpressionEngine().build('name?left_pad(5, "12")', 0, 0)!;

        expect(expression.evaluate({
            name: "ab"
        }).retrieve()).toEqual("121ab");
    });

    test('name?length', () => {
        const expression = new ExpressionEngine().build('name?length', 0, 0)!;

        expect(expression.evaluate({
            name: "robin"
        }).retrieve()).toEqual(5);
    });

    test('name?matches("r...n")', () => {
        const expression = new ExpressionEngine().build('name?matches("r...n")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin"
        }).retrieve()).toEqual(true);
    });

    test('name?number', () => {
        const expression = new ExpressionEngine().build('name?number', 0, 0)!;

        expect(expression.evaluate({
            name: "112"
        }).retrieve()).toEqual(112);
    });

    test('name?replace("hills", "mountains")', () => {
        const expression = new ExpressionEngine().build('name?replace("hills", "mountains")', 0, 0)!;

        expect(expression.evaluate({
            name: "over the hills and far hills"
        }).retrieve()).toEqual("over the mountains and far mountains");
    });

    test('name?right_pad(5)', () => {
        const expression = new ExpressionEngine().build('name?right_pad(5)', 0, 0)!;

        expect(expression.evaluate({
            name: "ab"
        }).retrieve()).toEqual("ab   ");
    });

    test('name?right_pad(5, "12")', () => {
        const expression = new ExpressionEngine().build('name?right_pad(5, "12")', 0, 0)!;

        expect(expression.evaluate({
            name: "ab"
        }).retrieve()).toEqual("ab121");
    });

    test('name?remove_beginning("rob")', () => {
        const expression = new ExpressionEngine().build('name?remove_beginning("rob")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin"
        }).retrieve()).toEqual("in");

        expect(expression.evaluate({
            name: "harry"
        }).retrieve()).toEqual("harry");
    });

    test('name?remove_ending("in")', () => {
        const expression = new ExpressionEngine().build('name?remove_ending("in")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin"
        }).retrieve()).toEqual("rob");

        expect(expression.evaluate({
            name: "harry"
        }).retrieve()).toEqual("harry");
    });

    test('name?split(" ")', () => {
        const expression = new ExpressionEngine().build('name?split(" ")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual(["robin", "de", "villiers"]);
    });

    test('name?starts_with("rob")', () => {
        const expression = new ExpressionEngine().build('name?starts_with("rob")', 0, 0)!;

        expect(expression.evaluate({
            name: "robin"
        }).retrieve()).toEqual(true);
    });

    test('age?string', () => {
        const expression = new ExpressionEngine().build('age?string', 0, 0)!;

        expect(expression.evaluate({
            age: "33"
        }).retrieve()).toEqual("33");
    });

    test('name?trim', () => {
        const expression = new ExpressionEngine().build('name?trim', 0, 0)!;

        expect(expression.evaluate({
            name: " robin "
        }).retrieve()).toEqual("robin");
    });

    test('name?truncate(11)', () => {
        const expression = new ExpressionEngine().build('name?truncate(11)', 0, 0)!;

        expect(expression.evaluate({
            name: "robin de villiers"
        }).retrieve()).toEqual("robin [...]");
    });

    test('name?uncap_first', () => {
        const expression = new ExpressionEngine().build('name?uncap_first', 0, 0)!;

        expect(expression.evaluate({
            name: "Robin"
        }).retrieve()).toEqual("robin");

        expect(expression.evaluate({
            name: "- Robin"
        }).retrieve()).toEqual("- Robin");

        expect(expression.evaluate({
            name: "   Robin"
        }).retrieve()).toEqual("   robin");
    });

    test('address?url', () => {
        const expression = new ExpressionEngine().build('address?url', 0, 0)!;

        expect(expression.evaluate({
            address: "ABC abc 123"
        }).retrieve()).toEqual("ABC%20abc%20123");

    });

    test('name?word_list', () => {
        const expression = new ExpressionEngine().build('name?word_list', 0, 0)!;

        expect(expression.evaluate({
            name: "ABC  \n  abc   123"
        }).retrieve()).toEqual(["ABC", "abc", "123"]);

    });

    test('value?is_infinite', () => {
        const expression = new ExpressionEngine().build('value?is_infinite', 0, 0)!;

        expect(expression.evaluate({
            value: Math.pow(10, 1000)
        }).retrieve()).toEqual(true);
    });

    test('value?is_nan', () => {
        const expression = new ExpressionEngine().build('value?is_nan', 0, 0)!;

        expect(expression.evaluate({
            value: 0 / 0
        }).retrieve()).toEqual(true);
    });

    test('value?lower_abc', () => {
        const expression = new ExpressionEngine().build('value?lower_abc', 0, 0)!;

        expect(expression.evaluate({
            value: 50
        }).retrieve()).toEqual("ax");
    });

    test('value?upper_abc', () => {
        const expression = new ExpressionEngine().build('value?upper_abc', 0, 0)!;

        expect(expression.evaluate({
            value: 50
        }).retrieve()).toEqual("AX");
    });

    test('value?round', () => {
        const expression = new ExpressionEngine().build('value?round', 0, 0)!;

        expect(expression.evaluate({
            value: 20.5
        }).retrieve()).toEqual(21);
    });

    test('value?ceil', () => {
        const expression = new ExpressionEngine().build('value?ceil', 0, 0)!;

        expect(expression.evaluate({
            value: 20.5
        }).retrieve()).toEqual(21);
    });

    test('value?floor', () => {
        const expression = new ExpressionEngine().build('value?floor', 0, 0)!;

        expect(expression.evaluate({
            value: 20.5
        }).retrieve()).toEqual(20);
    });

    test('value?string', () => {
        const expression = new ExpressionEngine().build('value?string', 0, 0)!;

        expect(expression.evaluate({
            value: 20.5
        }).retrieve()).toEqual("20.5");
    });

    test('when?date', () => {
        const expression = new ExpressionEngine().build('when?date', 0, 0)!;

        expect(expression.evaluate({
            when: new Date("2004-02-01T03:00:00.000Z")
        }).retrieve()).toEqual(new Date("2004-02-01T00:00:00.000Z"));
    });

    test('when?time', () => {
        const expression = new ExpressionEngine().build('when?time', 0, 0)!;

        expect(expression.evaluate({
            when: new Date("2004-02-01T03:00:00.000Z")
        }).retrieve()).toEqual(new Date("1970-01-01T03:00:00.000Z"));
    });

    test('when?datetime', () => {
        const expression = new ExpressionEngine().build('when?datetime', 0, 0)!;

        expect(expression.evaluate({
            when: new Date("2004-02-01T03:00:00.000Z")
        }).retrieve()).toEqual(new Date("2004-02-01T03:00:00.000Z"));
    });

    test('when?string', () => {
        const expression = new ExpressionEngine().build('when?string', 0, 0)!;

        expect(expression.evaluate({
            when: new Date("2004-02-01T03:00:00.000Z")
        }).retrieve()).toEqual("2004-02-01T03:00:00.000Z");
    });

    test('male?string("yes","no")', () => {
        const expression = new ExpressionEngine().build('male?string("yes","no")', 0, 0)!;

        expect(expression.evaluate({
            male: true
        }).retrieve()).toEqual("yes");

        expect(expression.evaluate({
            male: false
        }).retrieve()).toEqual("no");
    });

    test('male?then(1,2)', () => {
        const expression = new ExpressionEngine().build('male?then(1,2)', 0, 0)!;

        expect(expression.evaluate({
            male: true
        }).retrieve()).toEqual(1);

        expect(expression.evaluate({
            male: false
        }).retrieve()).toEqual(2);
    });

    test('ignore previous expressions, only last one matters', () => {

        const data = {};
        const expression = new ExpressionEngine().build("one = 1  two = 2", 0, 0)!;
        expect(expression.evaluate(data).retrieve()).toEqual(undefined);
        expect(data).toEqual({ one: 1, two: 2 });
    });

    test('seq?chunk(3)', () => {
        const expression = new ExpressionEngine().build('seq?chunk(3)', 0, 0)!;

        expect(expression.evaluate({
            seq: [1, 2, 3, 4, 5, 6, 7, 8]
        }).retrieve()).toEqual([[1, 2, 3], [4, 5, 6], [7, 8]]);
    });

    test('seq?drop_while(x -> x < 4)', () => {
        const expression = new ExpressionEngine().build('seq?drop_while(x -> x < 4)', 0, 0)!;

        expect(expression.evaluate({
            seq: [1, 2, 3, 4, 5, 6, 7, 8]
        }).retrieve()).toEqual([4, 5, 6, 7, 8]);
    });

    test('seq?filter(x -> x % 2 == 0)', () => {
        const expression = new ExpressionEngine().build('seq?filter(x -> x % 2 == 0)', 0, 0)!;

        expect(expression.evaluate({
            seq: [1, 2, 3, 4, 5, 6, 7, 8]
        }).retrieve()).toEqual([2, 4, 6, 8]);
    });

    test('seq?first', () => {
        expect(new ExpressionEngine().build('seq?first', 0, 0)!.evaluate({
            seq: [1]
        }).retrieve()).toEqual(1);

        const expression = new ExpressionEngine().build('seq?first!"test"', 0, 0)!;
        expect(expression.evaluate({
            seq: []
        }).retrieve()).toEqual("test");
    });

    test('seq?join(", ")', () => {
        expect(new ExpressionEngine().build('seq?join(", ")', 0, 0)!.evaluate({
            seq: [1, 2, 3, 4]
        }).retrieve()).toEqual("1, 2, 3, 4");
    });

    test('seq?last', () => {
        expect(new ExpressionEngine().build('seq?last', 0, 0)!.evaluate({
            seq: [1, 2, 3]
        }).retrieve()).toEqual(3);
    });

    test('seq?map(x -> x * x)', () => {
        const expression = new ExpressionEngine().build('seq?map(x -> x * x)', 0, 0)!;

        expect(expression.evaluate({
            seq: [1, 2, 3, 4, 5, 6, 7, 8]
        }).retrieve()).toEqual([1, 4, 9, 16, 25, 36, 49, 64]);
    });

    test('seq?min', () => {
        expect(new ExpressionEngine().build('seq?min', 0, 0)!.evaluate({
            seq: [2, 1, 3, 4]
        }).retrieve()).toEqual(1);
    });

    test('seq?max', () => {
        expect(new ExpressionEngine().build('seq?max', 0, 0)!.evaluate({
            seq: [2, 1, 4, 3]
        }).retrieve()).toEqual(4);
    });

    test('seq?reverse', () => {
        expect(new ExpressionEngine().build('seq?reverse', 0, 0)!.evaluate({
            seq: [2, 1, 4, 3]
        }).retrieve()).toEqual([3, 4, 1, 2]);
    });

    test('seq?seq_contains(4)', () => {
        expect(new ExpressionEngine().build('seq?seq_contains(4)', 0, 0)!.evaluate({
            seq: [2, 1, 4, 3]
        }).retrieve()).toEqual(true);
    });

    test('seq?seq_index_of(4)', () => {
        expect(new ExpressionEngine().build('seq?seq_index_of(4)', 0, 0)!.evaluate({
            seq: [2, 1, 4, 3]
        }).retrieve()).toEqual(2);
    });

    test('seq?seq_last_index_of(4)', () => {
        expect(new ExpressionEngine().build('seq?seq_last_index_of(4)', 0, 0)!.evaluate({
            seq: [2, 1, 4, 3]
        }).retrieve()).toEqual(2);
    });

    test('seq?size', () => {
        expect(new ExpressionEngine().build('seq?size', 0, 0)!.evaluate({
            seq: [2, 1, 4, 3]
        }).retrieve()).toEqual(4);
    });

    test('seq?sort', () => {
        expect(new ExpressionEngine().build('seq?sort', 0, 0)!.evaluate({
            seq: [2, 1, 4, 3]
        }).retrieve()).toEqual([1, 2, 3, 4]);

        expect(new ExpressionEngine().build('seq?sort', 0, 0)!.evaluate({
            seq: ['a', 'b', 'f', 'c']
        }).retrieve()).toEqual(['a', 'b', 'c', 'f']);

        expect(new ExpressionEngine().build('seq?sort', 0, 0)!.evaluate({
            seq: ['a', 'A', 'B', 'c']
        }).retrieve()).toEqual(['A', 'B', 'a', 'c']);
    });

    test('seq?sort_by("name")', () => {
        expect(new ExpressionEngine().build('seq?sort_by("name")', 0, 0)!.evaluate({
            seq: [{ name: 'markel' }, { name: 'robin' }, { name: 'harry' }, { name: 'sally' }]
        }).retrieve()).toEqual([{ name: 'harry' }, { name: 'markel' }, { name: 'robin' }, { name: 'sally' }]);
    });

    test('seq?take_while(x -> x < 4)', () => {
        const expression = new ExpressionEngine().build('seq?take_while(x -> x < 4)', 0, 0)!;

        expect(expression.evaluate({
            seq: [1, 2, 3, 4, 5, 6, 7, 8]
        }).retrieve()).toEqual([1, 2, 3]);
    });

    test('item?counter', () => {
        const expression = new ExpressionEngine().build('item?counter', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 0
        }).retrieve()).toEqual(1);
    });

    test('item?index', () => {
        const expression = new ExpressionEngine().build('item?index', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 0
        }).retrieve()).toEqual(0);
    });

    test('item?has_next', () => {
        const expression = new ExpressionEngine().build('item?has_next', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 0,
            '$item_length$': 2
        }).retrieve()).toEqual(true);

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 0,
            '$item_length$': 1
        }).retrieve()).toEqual(false);
    });

    test('item?is_last', () => {
        const expression = new ExpressionEngine().build('item?is_last', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 1,
            '$item_length$': 2
        }).retrieve()).toEqual(true);

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 0,
            '$item_length$': 2
        }).retrieve()).toEqual(false);
    });

    test('item?is_first', () => {
        const expression = new ExpressionEngine().build('item?is_first', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 1,
            '$item_length$': 2
        }).retrieve()).toEqual(false);

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 0,
            '$item_length$': 2
        }).retrieve()).toEqual(true);
    });

    test('item?is_even_item', () => {
        const expression = new ExpressionEngine().build('item?is_even_item', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 1,
            '$item_length$': 2
        }).retrieve()).toEqual(true);

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 0,
            '$item_length$': 2
        }).retrieve()).toEqual(false);
    });

    test('item?is_odd_item', () => {
        const expression = new ExpressionEngine().build('item?is_odd_item', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 1,
            '$item_length$': 2
        }).retrieve()).toEqual(false);

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 0,
            '$item_length$': 2
        }).retrieve()).toEqual(true);
    });

    test('item?item_cycle("a","b","c")', () => {
        const expression = new ExpressionEngine().build('item?item_cycle("a","b","c")', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 4,
            '$item_length$': 8
        }).retrieve()).toEqual("b");
    });

    test('item?item_parity', () => {
        const expression = new ExpressionEngine().build('item?item_parity', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 4,
            '$item_length$': 8
        }).retrieve()).toEqual("odd");

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 1,
            '$item_length$': 8
        }).retrieve()).toEqual("even");
    });

    test('item?item_parity_cap', () => {
        const expression = new ExpressionEngine().build('item?item_parity_cap', 0, 0)!;

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 4,
            '$item_length$': 8
        }).retrieve()).toEqual("Odd");

        expect(expression.evaluate({
            item: 'value',
            '$item$': true,
            '$item_index$': 1,
            '$item_length$': 8
        }).retrieve()).toEqual("Even");
    });

    test('"robin', () => {

        expect(() => {
            new ExpressionEngine().build('"robin', 0, 0)!;
        }).toThrow(TemplateError);
    });

    test('traverse object model', () => {

        expect(new ExpressionEngine().build('errors.getErrorCount()', 0, 0)!.evaluate({
            errors: new Errors()
        }).retrieve()).toEqual(0);
    });

    test('call method precedence and short-circuiting.', () => {
        const expression = new ExpressionEngine().build('errors?? && errors.hasFieldErrors(\'username\')', 0, 0)!;

        expect(expression.evaluate({
            errors: new Errors([
                new FieldError("this", "username", "", "Invalid username supplied")
            ])
        }).retrieve()).toEqual(true);

        expect(expression.evaluate({}).retrieve()).toEqual(false);
    });

    test('method chaining.', () => {
        const expression = new ExpressionEngine().build('errors?? && errors.getFieldError("username").getRejectedValue()', 0, 0)!;

        expect(expression.evaluate({
            errors: new Errors([
                new FieldError("this", "username", "%^", "Invalid username supplied")
            ])
        }).retrieve()).toEqual("%^");
    });

    test('item?has_content', () => {
        const expression = new ExpressionEngine().build('item?has_content', 0, 0)!;

        expect(expression.evaluate({ item: '', }).retrieve()).toEqual(false);
        expect(expression.evaluate({ item: 'test', }).retrieve()).toEqual(true);
        expect(expression.evaluate({ item: [], }).retrieve()).toEqual(false);
        expect(expression.evaluate({ item: [1], }).retrieve()).toEqual(true);
        expect(expression.evaluate({ item: {}, }).retrieve()).toEqual(false);
        expect(expression.evaluate({ item: { test: 1 }, }).retrieve()).toEqual(true);
        expect(expression.evaluate({ item: 0, }).retrieve()).toEqual(true);
        expect(expression.evaluate({ item: null }).retrieve()).toEqual(false);
        expect(expression.evaluate({ item: undefined }).retrieve()).toEqual(false);
    });

    test('name!', () => {
        const expression = new ExpressionEngine().build('name!', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual("");
    });

    test('(title)! == \'Mr\'', () => {
        const expression = new ExpressionEngine().build('(title)! == \'Mr\'', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual(false);
    });


    test('(start_index)!', () => {
        const expression = new ExpressionEngine().build('(start_index)!', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual('');
    });

    test('deep precedence', () => {
        const expression = new ExpressionEngine().build('value?? && value == val.key', 0, 0)!;

        expect(expression.evaluate({
            value: "1",
            val: { key: "1", label: "1" }
        }).retrieve()).toEqual(true);
    });


    test('1..2', () => {

        const expression = new ExpressionEngine().build('1..2', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual([1, 2]);
    });

    test('1..(a - 1)', () => {

        const expression = new ExpressionEngine().build('1..(a - 1)', 0, 0)!;

        expect(expression.evaluate({ a: 3 }).retrieve()).toEqual([1, 2]);
    });

    test('1..2', () => {

        const expression = new ExpressionEngine().build('1..2', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual([1, 2]);
    });

    test('1..<4', () => {

        const expression = new ExpressionEngine().build('1..<4', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual([1, 2, 3]);
    });

    test('3..*4', () => {

        const expression = new ExpressionEngine().build('3..*4', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual([3, 4, 5, 6]);
    });

    test('3..*+4', () => {

        const expression = new ExpressionEngine().build('3..*+4', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual([3, 4, 5, 6]);
    });

    test('8..*-4', () => {

        const expression = new ExpressionEngine().build('8..*-4', 0, 0)!;

        expect(expression.evaluate({}).retrieve()).toEqual([8, 7, 6, 5]);
    });

    test('!values?has_content', () => {
        const expression = new ExpressionEngine().build('!values?has_content', 0, 0)!;

        expect(expression.evaluate({
            values: [1, 2]
        }).retrieve()).toEqual(false);
    });

    test('1 + "${2+2}"', () => {
        const expression = new ExpressionEngine().build('1 + " text ${2+2} text"', 0, 0)!;

        expect(expression.evaluate({
            values: [1, 2]
        }).retrieve()).toEqual("1 text 4 text");
    });
});