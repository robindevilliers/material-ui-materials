import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class KeepAfterBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "keep_after";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {

        const index = subject.indexOf(arg.evaluate(data).retrieve());
        if (index >= 0) {
            return Literal.of(subject.substring(index + arg.evaluate(data).retrieve().length));
        } else {
            return Literal.of("");
        }
    }
}