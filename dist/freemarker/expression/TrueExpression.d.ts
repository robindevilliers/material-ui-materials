import { Expression } from '../Expression';
import { Value } from './Value';
export declare class TrueExpression implements Expression {
    private row;
    private column;
    constructor(row: number, column: number);
    evaluate(data: Record<string, any>): Value;
}
