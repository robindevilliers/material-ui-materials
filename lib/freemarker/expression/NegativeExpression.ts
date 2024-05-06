import { Literal, Value } from './Value';
import { ComposingExpression } from './ComposingExpression';

export class NegativeExpression extends ComposingExpression {

    evaluate(data: Record<string, any>): Value {
        return Literal.of(-1 * this.subject.evaluate(data).retrieve());
    }

    getOperator(): string {
        return '-';
    }
}