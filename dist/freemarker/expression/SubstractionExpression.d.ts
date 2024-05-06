import { BinaryExpression } from './BinaryExpression';
import { Value } from './Value';
export declare class SubtractionExpression extends BinaryExpression {
    getOperator(): string;
    evaluate(data: Record<string, any>): Value;
}
