import { Expression } from '../Expression';
import { Value } from './Value';
export declare class ReferenceExpression implements Expression {
    private reference;
    private row;
    private column;
    constructor(reference: string, row: number, column: number);
    evaluate(data: Record<string, any>): Value;
}
