import { Expression } from '../Expression';
import { Value } from '../expression/Value';
import { TwoArgBuiltin } from './TwoArgBuiltin';
export declare class ThenBuiltin extends TwoArgBuiltin {
    accept(subject: any, name: string): boolean;
    evaluate(subject: any, arg1: Expression, arg2: Expression, data: Record<string, any>): Value;
}
