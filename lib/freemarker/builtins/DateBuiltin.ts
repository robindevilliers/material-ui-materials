import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { isDate } from '../../utilities/isDate';

export class DateBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return (typeof subject === "string" || isDate(subject)) && name === "date";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        const dte = isDate(subject) ? subject : new Date(subject);
        dte.setHours(0);
        return Literal.of(dte);
    }
}