import { OneArgBuiltin } from './OneArgBuiltin';
import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';

export class SeqContainsBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "seq_contains";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {
        return Literal.of(subject.includes(arg.evaluate(data).retrieve()));
    }
}