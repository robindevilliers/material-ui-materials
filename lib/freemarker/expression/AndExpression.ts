import { BinaryExpression } from './BinaryExpression';
import { Literal, Value } from './Value';

export class AndExpression extends BinaryExpression {

    getOperator(): string {
        return '&&';
    }

    evaluate(data: Record<string, any>): Value {
        return Literal.of(this.lhs.evaluate(data).retrieve() && this.rhs.evaluate(data).retrieve());
    }
}