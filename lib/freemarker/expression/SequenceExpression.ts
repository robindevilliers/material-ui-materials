import { Expression } from '../Expression';
import { Literal, Value } from './Value';

export class SequenceExpression implements Expression {
    constructor(private elements: Expression[]) {
    }

    evaluate(data: Record<string, any>): Value {
        return Literal.of(this.elements.map(el => el.evaluate(data).retrieve()));
    }
}