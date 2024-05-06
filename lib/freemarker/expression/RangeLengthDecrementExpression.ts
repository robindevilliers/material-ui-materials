import { BinaryExpression } from './BinaryExpression';
import { Literal, Value } from './Value';

export class RangeLengthDecrementExpression extends BinaryExpression {

    getOperator(): string {
        return '..';
    }

    evaluate(data: Record<string, any>): Value {

        const result: number[] = [];

        const start = this.lhs.evaluate(data).retrieve();
        const length = this.rhs.evaluate(data).retrieve();

        for (let i = 0; i < length; i++) {
            result.push(start - i);
        }

        return Literal.of(result);
    }
}