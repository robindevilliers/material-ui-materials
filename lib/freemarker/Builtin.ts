import { Value } from './expression/Value';
import { Expression } from './Expression';

export interface Builtin {
    accept(subject: any, name: string): boolean;

    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value;
}