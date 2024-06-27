import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class KeepAfterLastBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "keep_after_last";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {

        const index = subject.lastIndexOf(arg.evaluate(data).retrieve());
        if (index >= 0) {
            return Literal.of(subject.substring(index + arg.evaluate(data).retrieve().length));
        } else {
            return Literal.of("");
        }
    }
}