import { BinaryExpression } from './BinaryExpression';
import { Literal, Value } from './Value';

export class AddAndAssignExpression extends BinaryExpression {

    getOperator(): string {
        return '+=';
    }

    evaluate(data: Record<string, any>): Value {

        const current = this.lhs.evaluate(data);

        current.assign(current.retrieve() + this.rhs.evaluate(data).retrieve());

        return Literal.of(undefined);
    }
}
