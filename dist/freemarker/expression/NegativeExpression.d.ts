import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';
export declare class NegativeExpression extends ComposingExpression {
    evaluate(data: Record<string, any>): Value;
    getOperator(): string;
}
