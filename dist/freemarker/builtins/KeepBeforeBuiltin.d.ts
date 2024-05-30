import { Expression } from '../Expression';
import { Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';
export declare class KeepBeforeBuiltin extends OneArgBuiltin {
    accept(subject: any, name: string): boolean;
    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value;
}
