import { Literal, Value } from './Value';
import { ComposingExpression } from './ComposingExpression';

export class NotExpression extends ComposingExpression {

    evaluate(data: Record<string, any>): Value {
        return Literal.of(!this.subject.evaluate(data).retrieve());
    }

    getOperator(): string {
        return 'not';
    }
}