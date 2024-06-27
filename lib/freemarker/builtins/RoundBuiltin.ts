import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class RoundBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "number" && name === "round";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(Math.round(subject));
    }
}