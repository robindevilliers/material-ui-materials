import { Expression } from '../Expression';
import { Value } from '../expression/Value';
import { Builtin } from '../Builtin';
export declare class RightPadBuiltin implements Builtin {
    accept(subject: any, name: string): boolean;
    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value;
}
