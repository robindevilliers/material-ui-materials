import { BinaryExpression } from './BinaryExpression';
import { Literal, Value } from './Value';

export class RangeInclusiveExpression extends BinaryExpression {

    getOperator(): string {
        return '..';
    }

    evaluate(data: Record<string, any>): Value {

        const result: number[] = [];

        const lhs = this.lhs.evaluate(data).retrieve();
        const rhs = this.rhs.evaluate(data).retrieve();

        if (lhs < rhs) {
            for (let i = lhs; i <= rhs; i++) {
                result.push(i);
            }
        } else if (lhs > rhs) {
            for (let i = lhs; i >= rhs; i--) {
                result.push(i);
            }
        } else {
            result.push(lhs);
        }

        return Literal.of(result);
    }
}