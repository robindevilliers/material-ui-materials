import { BinaryExpression } from './BinaryExpression';
import { Value } from './Value';
export declare class OrExpression extends BinaryExpression {
    getOperator(): string;
    evaluate(data: Record<string, any>): Value;
}
