import { Expression } from '../Expression';
import { Value } from './Value';
export declare class SequenceExpression implements Expression {
    private elements;
    constructor(elements: Expression[]);
    evaluate(data: Record<string, any>): Value;
}
