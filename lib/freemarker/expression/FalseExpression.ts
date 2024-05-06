import { Expression } from '../Expression';
import { Literal, Value } from './Value';

export class FalseExpression implements Expression {

    constructor(private row: number, private column: number) {
    }

    evaluate(data: Record<string, any>): Value {
        return Literal.of(false);
    }
}