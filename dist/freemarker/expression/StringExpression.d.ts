import { Expression } from '../Expression';
import { Value } from './Value';
export declare class StringExpression implements Expression {
    private str;
    private row;
    private column;
    constructor(str: string, row: number, column: number);
    evaluate(data: Record<string, any>): Value;
}
