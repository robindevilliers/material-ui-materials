import { Expression } from '../Expression';
import { Value } from './Value';
export declare abstract class ComposingExpression implements Expression {
    protected subject: Expression;
    protected row: number;
    protected column: number;
    constructor(subject: Expression, row: number, column: number);
    getSubject(): Expression;
    replaceSubject(expression: Expression): void;
    abstract getOperator(): string;
    abstract evaluate(data: Record<string, any>): Value;
}
export declare function isComposingExpression(test: any): test is ComposingExpression;
