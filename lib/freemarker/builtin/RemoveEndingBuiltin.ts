import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class RemoveEndingBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "remove_ending";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>): Value {

        const arg = arg1.evaluate(data).retrieve();

        if (subject.endsWith(arg)) {
            return Literal.of(subject.slice(0, subject.length - arg.length));
        }

        return Literal.of(subject);
    }
}