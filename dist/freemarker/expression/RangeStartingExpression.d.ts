import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';
export declare class RangeStartingExpression extends ComposingExpression {
    evaluate(data: Record<string, any>): Value;
    getOperator(): string;
}
