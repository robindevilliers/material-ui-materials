import { BinaryExpression } from './BinaryExpression';
import { Literal, Value } from './Value';

export class AssignExpression extends BinaryExpression {

    getOperator(): string {
        return '=';
    }

    evaluate(data: Record<string, any>): Value {
        const lhs = this.lhs.evaluate(data);

        lhs.assign(this.rhs.evaluate(data).retrieve());

        return Literal.of(undefined);
    }
}