import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { isHash } from '../../utilities/isHash';

export class HasContentBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return name === "has_content";
    }

    evaluate(subject: any, data: Record<string, any>, row: number, column: number): Value {
        if (subject === undefined) {
            return Literal.of(false);
        }

        if (subject === null) {
            return Literal.of(false);
        }

        if (Array.isArray(subject)) {
            return Literal.of(subject.length > 0);
        }

        if (isHash(subject)) {
            return Literal.of(Object.keys(subject).length > 0);
        }

        if (typeof subject === "string") {
            return Literal.of(subject.length > 0);
        }

        return Literal.of(true);
    }
}