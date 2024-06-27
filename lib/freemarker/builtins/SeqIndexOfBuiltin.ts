import { OneArgBuiltin } from './OneArgBuiltin';
import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';

export class SeqIndexOfBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "seq_index_of";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {
        return Literal.of(subject.indexOf(arg.evaluate(data).retrieve()));
    }
}