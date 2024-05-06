import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { TemplateError } from '../TemplateError';

export class BooleanBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "boolean";
    }

    evaluate(subject: any, data: Record<string, any>, row: number, column: number): Value {
        if (subject === "true") {
            return Literal.of(true);
        }

        if (subject === "false") {
            return Literal.of(false);
        }

        throw new TemplateError(row, column, `Cannot convert string to boolean`);
    }
}