import { Expression } from '../Expression';
import { Value } from './Value';
export declare class CallBuiltinExpression implements Expression {
    private subject;
    private name;
    private args;
    private row;
    private column;
    constructor(subject: Expression, name: string, args: Expression[], row: number, column: number);
    evaluate(data: Record<string, any>): Value;
}
