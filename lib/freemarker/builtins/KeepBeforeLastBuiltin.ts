import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class KeepBeforeLastBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "keep_before_last";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {

        const index = subject.lastIndexOf(arg.evaluate(data).retrieve());
        if (index >= 0) {
            return Literal.of(subject.substring(0, index));
        } else {
            return Literal.of("");
        }
    }
}