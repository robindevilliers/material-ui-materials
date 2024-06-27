import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';
import { LambdaExpression } from '../expression/LambdaExpression';
import { TemplateError } from '../TemplateError';

export class DropWhileBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "drop_while";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>, row: number, column: number): Value {

        const result: any[] = [];
        const lambda = arg1;

        if (!(lambda instanceof LambdaExpression)) {
            throw new TemplateError(row, column, `Invalid argument, only lambda is current supported`);
        }

        let i = 0;
        let bool = true;
        while (i < subject.length) {
            if (bool) {
                bool = lambda.evaluate({ '$$': subject[i], ...data }).retrieve();
            }

            if (!bool) {
                result.push(subject[i]);
            }
            i++;
        }
        return Literal.of(result);
    }
}