import { OneArgBuiltin } from './OneArgBuiltin';
import { Expression } from '../Expression';
import { Value } from '../expression/Value';
export declare class SeqIndexOfBuiltin extends OneArgBuiltin {
    accept(subject: any, name: string): boolean;
    evaluate(subject: any, arg: Expression, data: Record<string, any>): Value;
}
