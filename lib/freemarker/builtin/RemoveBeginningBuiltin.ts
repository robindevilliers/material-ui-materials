import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class RemoveBeginningBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "remove_beginning";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>): Value {

        const arg = arg1.evaluate(data).retrieve();

        if (subject.startsWith(arg)) {
            return Literal.of(subject.slice(arg.length));
        }

        return Literal.of(subject);
    }
}