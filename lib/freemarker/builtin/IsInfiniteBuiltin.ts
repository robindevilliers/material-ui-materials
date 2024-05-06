import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class IsInfiniteBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "number" && name === "is_infinite";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(!isFinite(subject));
    }
}