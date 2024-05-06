import { Expression } from '../Expression';
import { Value } from './Value';
export declare class CallMethodExpression implements Expression {
    private reference;
    private args;
    private row;
    private column;
    constructor(reference: Expression, args: Expression[], row: number, column: number);
    evaluate(data: Record<string, any>): Value;
}
