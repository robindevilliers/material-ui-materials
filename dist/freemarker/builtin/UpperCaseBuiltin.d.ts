import { Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
export declare class UpperCaseBuiltin extends NoArgBuiltin {
    accept(subject: any, name: string): boolean;
    evaluate(subject: any, data: Record<string, any>): Value;
}
