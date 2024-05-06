import { Expression } from '../Expression';
import { Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';
export declare class TakeWhileBuiltin extends OneArgBuiltin {
    accept(subject: any, name: string): boolean;
    evaluate(subject: any, arg1: Expression, data: Record<string, any>, row: number, column: number): Value;
}
