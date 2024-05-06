import { BinaryExpression } from './BinaryExpression';
import { Value } from './Value';
export declare class AdditionExpression extends BinaryExpression {
    getOperator(): string;
    evaluate(data: Record<string, any>): Value;
}
