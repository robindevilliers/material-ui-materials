import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class FloorBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "number" && name === "floor";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(Math.floor(subject));
    }
}