import { BinaryExpression } from './BinaryExpression';
import { Value } from './Value';

export class LambdaExpression extends BinaryExpression {

    getOperator(): string {
        return '->';
    }

    evaluate(data: Record<string, any>): Value {
        const local = { ...data };

        const lhs = this.lhs.evaluate(local);

        lhs.assign(data['$$']);

        return this.rhs.evaluate(local);
    }
}
