import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';
import { TemplateError } from '../TemplateError';

export class TruncateBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "truncate";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>, row: number, column: number): Value {

        const arg = arg1.evaluate(data).retrieve();

        if (typeof arg !== "number") {
            throw new TemplateError(row, column, `Argument to truncate is not a number`);
        }

        if (subject.length > arg - 5) {
            return Literal.of(subject.substring(0, arg - 5) + "[...]");
        } else {
            return Literal.of(subject);
        }
    }
}