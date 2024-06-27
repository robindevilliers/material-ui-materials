import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class MatchesBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "matches";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {

        return Literal.of(subject.match("^" + arg.evaluate(data).retrieve() + "$") !== null);
    }
}