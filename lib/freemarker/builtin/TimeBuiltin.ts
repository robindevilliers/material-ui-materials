import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { isDate } from '../../utilities/isDate';

export class TimeBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return (typeof subject === "string" || isDate(subject)) && name === "time";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        const dte = isDate(subject) ? subject : new Date(subject);
        const millis = dte.getTime();
        return Literal.of(new Date(millis % 86400000));
    }
}