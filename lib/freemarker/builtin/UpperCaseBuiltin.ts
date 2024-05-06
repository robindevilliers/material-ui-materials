import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class UpperCaseBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "upper_case";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(subject.toUpperCase());
    }
}