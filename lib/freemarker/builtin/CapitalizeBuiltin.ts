import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { isWhitespace } from '../../utilities/isWhitespace';

export class CapitalizeBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "capitalize";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        const output: string[] = [];

        let latch = true;

        for (let i = 0; i < subject.length; i++) {
            const c = subject.charAt(i);
            if (latch) {
                output.push(c.toUpperCase());
                latch = false;
            } else {
                if (isWhitespace(c)) {
                    latch = true;
                }
                output.push(c.toLowerCase());
            }
        }

        return Literal.of(output.join(""));
    }
}