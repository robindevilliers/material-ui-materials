import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class ChopLinebreakBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "chop_linebreak";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        const length = subject.length;

        if (subject.length && subject.charAt(length - 1) === '\n') {
            if (subject.length > 2 && subject.charAt(length - 2) === '\r') {
                return Literal.of(subject.slice(0, length - 2));
            }
            return Literal.of(subject.slice(0, length - 1));
        } else if (subject.length && subject.charAt(length - 1) === '\r') {
            return Literal.of(subject.slice(0, length - 1));
        }
        return Literal.of(subject);
    }
}