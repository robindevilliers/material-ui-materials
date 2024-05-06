import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class EnsureEndsWithBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "ensure_ends_with";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>): Value {
        const arg = arg1.evaluate(data).retrieve();
        for (let i = 0; i < arg.length; i++) {
            if (subject.endsWith(arg.slice(0, arg.length - i))) {
                return Literal.of(subject + arg.slice(arg.length - i));
            }
        }

        return Literal.of(subject + arg);
    }
}