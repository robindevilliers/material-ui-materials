import { Literal, Value } from '../expression/Value';
import { isDate } from '../../utilities/isDate';
import { Builtin } from '../Builtin';
import { Expression } from '../Expression';
import { TemplateError } from '../TemplateError';

export class StringBuiltin implements Builtin {

    accept(subject: any, name: string): boolean {
        return (typeof subject === "number" || typeof subject === "string" || isDate(subject) || typeof subject === "boolean") && name === "string";
    }

    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value {
        if (typeof subject === "boolean") {

            if (args.length === 2) {
                const arg1 = args[0].evaluate(data).retrieve();

                if (typeof arg1 !== "string") {
                    throw new TemplateError(row, column, `Invalid argument, string takes string arguments`);
                }

                const arg2 = args[1].evaluate(data).retrieve();

                if (typeof arg2 !== "string") {
                    throw new TemplateError(row, column, `Invalid argument, string takes string arguments`);
                }

                return Literal.of(subject ? arg1 : arg2);
            } else {
                throw new TemplateError(row, column, `Invalid number of arguments supplied`);
            }
        } else if (args.length === 0) {
            if (isDate(subject)) {
                return Literal.of(subject.toISOString());
            }
            return Literal.of(String(subject));
        } else {
            throw new TemplateError(row, column, `Invalid number of arguments supplied`);
        }
    }
}