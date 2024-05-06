import { Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
export declare class CeilBuiltin extends NoArgBuiltin {
    accept(subject: any, name: string): boolean;
    evaluate(subject: any, data: Record<string, any>): Value;
}
