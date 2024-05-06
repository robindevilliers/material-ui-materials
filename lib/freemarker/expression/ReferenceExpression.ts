import { Expression } from '../Expression';
import { Reference, Value } from './Value';

export class ReferenceExpression implements Expression {
    constructor(private reference: string, private row: number, private column: number) {
    }

    evaluate(data: Record<string, any>): Value {
        return Reference.of(this.reference, data);
    }
}