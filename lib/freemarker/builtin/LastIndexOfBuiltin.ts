import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class LastIndexOfWithBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "last_index_of";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {
        return Literal.of(subject.lastIndexOf(arg.evaluate(data).retrieve()));
    }
}