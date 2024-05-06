import { Expression } from '../Expression';
import { Value } from './Value';
export declare class HashExpression implements Expression {
    private hash;
    constructor(hash: Record<string, Expression>);
    evaluate(data: Record<string, any>): Value;
}
