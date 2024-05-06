import { Literal, Value } from './Value';
import { ComposingExpression } from './ComposingExpression';

export class DecrementExpression extends ComposingExpression {

    evaluate(data: Record<string, any>): Value {

        const current = this.subject.evaluate(data);

        const original = current.retrieve();

        current.assign(original - 1);

        return Literal.of(undefined);
    }

    getOperator(): string {
        return '--';
    }
}