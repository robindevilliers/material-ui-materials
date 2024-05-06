import { Expression } from '../Expression';
import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';
export declare abstract class BinaryExpression extends ComposingExpression {
    protected lhs: Expression;
    protected rhs: Expression;
    protected row: number;
    protected column: number;
    constructor(lhs: Expression, rhs: Expression, row: number, column: number);
    getSubject(): Expression;
    replaceSubject(expression: Expression): void;
    abstract getOperator(): string;
    abstract evaluate(data: Record<string, any>): Value;
}
