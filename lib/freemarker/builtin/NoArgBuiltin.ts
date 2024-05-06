import { Expression } from '../Expression';
import { Value } from '../expression/Value';
import { TemplateError } from '../TemplateError';
import { Builtin } from '../Builtin';


export abstract class NoArgBuiltin implements Builtin {

    abstract accept(subject: any, name: string): boolean;

    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value {
        if (args.length === 0) {
            return this.evaluate(subject, data, row, column);
        } else {
            throw new TemplateError(row, column, `Invalid number of arguments`);
        }
    }

    abstract evaluate(subject: any, data: Record<string, any>, row: number, column: number): Value;
}
