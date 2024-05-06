import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { TemplateError } from '../TemplateError';

export class LastBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "last";
    }

    evaluate(subject: any, data: Record<string, any>, row: number, column: number): Value {
        if (subject.length) {
            return Literal.of(subject[subject.length - 1]);
        } else {
            throw new TemplateError(row, column, `Sequence is empty, 'last' builtin error`);
        }
    }
}