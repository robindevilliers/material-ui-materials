import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { TwoArgBuiltin } from './TwoArgBuiltin';

export class ReplaceBuiltin extends TwoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "replace";
    }

    evaluate(subject: any, arg1: Expression, arg2: Expression, data: Record<string, any>): Value {
        return Literal.of(subject.replaceAll(arg1.evaluate(data).retrieve(), arg2.evaluate(data).retrieve()));

    }
}