import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class StartsWithBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "starts_with";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>): Value {

        const arg = arg1.evaluate(data).retrieve();

        return Literal.of(subject.startsWith(arg));
    }
}