import { Expression } from '../Expression';
import { Value } from '../expression/Value';
import { TwoArgBuiltin } from './TwoArgBuiltin';

export class ThenBuiltin extends TwoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "boolean" && name === "then";
    }

    evaluate(subject: any, arg1: Expression, arg2: Expression, data: Record<string, any>): Value {
        return subject ? arg1.evaluate(data) : arg2.evaluate(data);
    }
}