import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { Builtin } from '../Builtin';
import { TemplateError } from '../TemplateError';

export class RightPadBuiltin implements Builtin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "right_pad";
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
            return Literal.of(subject + padding.substring(0, missing));
        }
        return Literal.of(subject);
    }
}