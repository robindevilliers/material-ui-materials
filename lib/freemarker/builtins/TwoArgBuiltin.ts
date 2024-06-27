import { Expression } from '../Expression';
import { Value } from '../expression/Value';
import { TemplateError } from '../TemplateError';
import { Builtin } from '../Builtin';

export abstract class TwoArgBuiltin implements Builtin {

    abstract accept(subject: any, name: string): boolean;

    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value {
        if (args.length === 2) {
            return this.evaluate(subject, args[0], args[1], data);
        } else {
            throw new TemplateError(row, column, `Invalid number of arguments`);
        }
    }

    abstract evaluate(subject: any, arg1: Expression, arg2: Expression, data: Record<string, any>): Value;
}
