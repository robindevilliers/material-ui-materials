import { Value } from '../expression/Value';
import { Builtin } from '../Builtin';
import { Expression } from '../Expression';
export declare class StringBuiltin implements Builtin {
    accept(subject: any, name: string): boolean;
    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value;
}
