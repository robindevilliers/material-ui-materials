import { BinaryExpression } from './BinaryExpression';
import { Value } from './Value';
export declare class MultiplyAndAssignExpression extends BinaryExpression {
    getOperator(): string;
    evaluate(data: Record<string, any>): Value;
}
