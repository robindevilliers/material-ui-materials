import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { isDate } from '../../utilities/isDate';

export class DatetimeBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return (typeof subject === "string" || isDate(subject)) && name === "datetime";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of(isDate(subject) ? subject : new Date(subject));
    }
}