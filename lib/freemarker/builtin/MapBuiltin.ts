import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';
import { LambdaExpression } from '../expression/LambdaExpression';
import { TemplateError } from '../TemplateError';

export class MapBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "map";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>, row: number, column: number): Value {

        const result: any[] = [];
        const lambda = arg1;

        if (!(lambda instanceof LambdaExpression)) {
            throw new TemplateError(row, column, `Invalid argument, only lambda is current supported`);
        }

        let i = 0;
        while (i < subject.length) {
            result.push(lambda.evaluate({ '$$': subject[i], ...data }).retrieve());
            i++;
        }
        return Literal.of(result);
    }
}