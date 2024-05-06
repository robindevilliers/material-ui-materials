import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class ReverseBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "reverse";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(subject.reverse());
    }
}