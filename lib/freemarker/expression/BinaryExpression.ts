import { Expression } from '../Expression';
import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';

export abstract class BinaryExpression extends ComposingExpression {

    constructor(protected lhs: Expression, protected rhs: Expression, protected row: number, protected column: number) {
        super(rhs, row, column);
    }

    getSubject(): Expression {
        return this.rhs;
    }

    replaceSubject(expression: Expression): void {
        this.rhs = expression;
    }

    abstract getOperator(): string;

    abstract evaluate(data: Record<string, any>): Value;
}
