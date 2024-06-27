import { OneArgBuiltin } from './OneArgBuiltin';
import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { isHash } from '../../utilities/isHash';
import { TemplateError } from '../TemplateError';

export class SortByBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "sort_by";
    }

    evaluate(subject: any, arg: Expression, data: Record<string, any>, row: number, column: number): Value {
        const name = arg.evaluate(data).retrieve();
        if ((subject as any[]).find(x => !isHash(x))) {
            throw new TemplateError(row, column, `Attempt to use sort_by on array element that is not a hash`);
        }

        return Literal.of(subject.sort((x: any, y: any) => x[name] < y[name] ? -1 : 0));
    }
}