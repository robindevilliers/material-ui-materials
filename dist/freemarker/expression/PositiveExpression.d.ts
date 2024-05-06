import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';
export declare class PositiveExpression extends ComposingExpression {
    evaluate(data: Record<string, any>): Value;
    getOperator(): string;
}
