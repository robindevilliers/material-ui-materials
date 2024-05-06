import { Value } from './Value';
import { BinaryExpression } from './BinaryExpression';
export declare class SliceExpression extends BinaryExpression {
    evaluate(data: Record<string, any>): Value;
    getOperator(): string;
}
