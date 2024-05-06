import { Expression } from '../Expression';
import { Value } from '../expression/Value';
import { Builtin } from '../Builtin';
export declare abstract class OneArgBuiltin implements Builtin {
    abstract accept(subject: any, name: string): boolean;
    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value;
    abstract evaluate(subject: any, arg: Expression, data: Record<string, any>, row: number, column: number): Value;
}
