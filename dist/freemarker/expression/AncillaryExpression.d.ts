import { Expression } from '../Expression';
import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';
export declare class AncillaryExpression extends ComposingExpression {
    private ancillary;
    constructor(ancillary: Expression, subject: Expression, row: number, column: number);
    evaluate(data: Record<string, any>): Value;
    getOperator(): string;
}
