import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';

export class RangeStartingExpression extends ComposingExpression {

    evaluate(data: Record<string, any>): Value {
        return this.subject.evaluate(data);
    }

    getOperator(): string {
        return '[';
    }
}