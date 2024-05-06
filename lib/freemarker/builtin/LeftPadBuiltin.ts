import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { Builtin } from '../Builtin';
import { TemplateError } from '../TemplateError';

export class LeftPadBuiltin implements Builtin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "left_pad";
    }

    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value {

        if (args.length === 0 || args.length > 2) {
            throw new TemplateError(row, column, `Invalid number of arguments`);
        }

        const length = args[0].evaluate(data).retrieve();

        let filler = ' ';
        if (args.length === 2) {
            filler = args[1].evaluate(data).retrieve();
        }

        const padding = filler.repeat(length);

        const missing = length - subject.length;

        if (missing > 0) {
            return Literal.of(padding.substring(0, missing) + subject);
        }
        return Literal.of(subject);
    }
}