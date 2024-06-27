import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class SortBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "sort";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(subject.sort());
    }
}