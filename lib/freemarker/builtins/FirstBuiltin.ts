import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class FirstBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "first";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(subject[0]);
    }
}