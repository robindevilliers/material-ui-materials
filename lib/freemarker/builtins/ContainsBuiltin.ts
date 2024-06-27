import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class ContainsBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "contains";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {
        return Literal.of(subject.includes(arg.evaluate(data).retrieve()));
    }
}