import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class IsNanBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "number" && name === "is_nan";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(isNaN(subject));
    }
}