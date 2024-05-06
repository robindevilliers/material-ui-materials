import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';

export class UrlBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "url";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(encodeURI(subject));
    }
}