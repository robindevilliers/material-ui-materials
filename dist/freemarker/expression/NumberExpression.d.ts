import { Expression } from '../Expression';
import { Value } from './Value';
export declare class NumberExpression implements Expression {
    private subject;
    private row;
    private column;
    constructor(subject: string, row: number, column: number);
    evaluate(data: Record<string, any>): Value;
}
