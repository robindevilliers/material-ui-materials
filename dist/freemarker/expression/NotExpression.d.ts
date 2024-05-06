import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';
export declare class NotExpression extends ComposingExpression {
    evaluate(data: Record<string, any>): Value;
    getOperator(): string;
}
