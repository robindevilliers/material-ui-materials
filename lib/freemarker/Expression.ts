import { Value } from './expression/Value';

export interface Expression {
    evaluate(data: Record<string, any>): Value;
}