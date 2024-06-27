import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class NumberBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "number";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(Number(subject));
    }
}