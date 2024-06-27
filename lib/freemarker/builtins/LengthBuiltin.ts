import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class LengthBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "length";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(subject.length);
    }
}