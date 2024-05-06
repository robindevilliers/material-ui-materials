import { Expression } from '../Expression';
import { Literal, Value } from './Value';

export class NumberExpression implements Expression {
    constructor(private subject: string, private row: number, private column: number) {
    }

    evaluate(data: Record<string, any>): Value {
        return Literal.of(Number(this.subject));
    }
}