import { OneArgBuiltin } from './OneArgBuiltin';
import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';

export class JoinBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "join";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value {
        const separator = arg.evaluate(data).retrieve();
        return Literal.of(subject.join(separator));
    }
}