import { OneArgBuiltin } from './OneArgBuiltin';
import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';

export class SeqLastIndexOfBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "seq_last_index_of";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {
        return Literal.of(subject.lastIndexOf(arg.evaluate(data).retrieve()));
    }
}