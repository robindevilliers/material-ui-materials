import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { isWhitespace } from '../../utilities/isWhitespace';

export class UncapFirstBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "uncap_first";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        let index = 0;
        while (index < subject.length) {
            if (!isWhitespace(subject.charAt(index))) {
                break;
            }
            index++;
        }


        return Literal.of(subject.slice(0, index) + subject.charAt(index).toLowerCase() + subject.slice(index + 1));
    }
}