import { Expression } from '../Expression';
import { Literal, Value } from './Value';

export class HashExpression implements Expression {
    constructor(private hash: Record<string, Expression>) {
    }

    evaluate(data: Record<string, any>): Value {
        const result: Record<string, any> = {};

        for (const [key, expression] of Object.entries(this.hash)) {
            result[key] = expression.evaluate(data).retrieve();
        }

        return Literal.of(result);
    }
}