import { Expression } from '../Expression';
import { Value } from './Value';

export abstract class ComposingExpression implements Expression {

    constructor(protected subject: Expression, protected row: number, protected column: number) {
    }

    getSubject(): Expression {
        return this.subject;
    }

    replaceSubject(expression: Expression): void {
        this.subject = expression;
    }

    abstract getOperator(): string;

    abstract evaluate(data: Record<string, any>): Value;
}

export function isComposingExpression(test: any): test is ComposingExpression {
    return test instanceof ComposingExpression;
}