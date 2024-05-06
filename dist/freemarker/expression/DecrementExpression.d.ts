import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';
export declare class DecrementExpression extends ComposingExpression {
    evaluate(data: Record<string, any>): Value;
    getOperator(): string;
}
