import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class MinBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "min";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        if (subject.length === 0) {
            return Literal.of(undefined);
        }

        let result = Number.MAX_VALUE;
        for (let i = 0; i < subject.length; i++) {
            if (subject[i] < result) {
                result = subject[i];
            }
        }
        return Literal.of(result);
    }
}