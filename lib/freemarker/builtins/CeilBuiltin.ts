import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class CeilBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "number" && name === "ceil";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(Math.ceil(subject));
    }
}