import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class SplitBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "split";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>): Value {

        const arg = arg1.evaluate(data).retrieve();

        return Literal.of(subject.split(arg));
    }
}