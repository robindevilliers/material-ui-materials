import { Expression } from '../Expression';
import { TemplateError } from '../TemplateError';
import { Literal, Reference, Value } from './Value';

import * as Builtins from '../builtins';

export class CallBuiltinExpression implements Expression {

    constructor(private subject: Expression, private name: string, private args: Expression[], private row: number, private column: number) {
    }

    evaluate(data: Record<string, any>): Value {

        const exp = this.subject.evaluate(data);

        const isLoopVariable = (exp instanceof Reference && Object.keys(data).includes(`$${exp.getName()}$`));
        if (isLoopVariable) {
            if (this.name === 'counter') {
                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`counter builtin requires no arguments`);
                }
                return Literal.of(data[`$${exp.getName()}_index$`] + 1);
            } else if (this.name === 'index') {
                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`index builtin requires no arguments`);
                }
                return Literal.of(data[`$${exp.getName()}_index$`]);
            } else if (this.name === 'has_next') {
                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`has_next builtin requires no arguments`);
                }
                return Literal.of(data[`$${exp.getName()}_index$`] < data[`$${exp.getName()}_length$`] - 1);
            } else if (this.name === 'is_last') {
                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`is_last builtin requires no arguments`);
                }
                const index = data[`$${exp.getName()}_index$`];
                const length = data[`$${exp.getName()}_length$`];
                return Literal.of(index === length - 1);
            } else if (this.name === 'is_first') {
                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`is_first builtin requires no arguments`);
                }
                return Literal.of(data[`$${exp.getName()}_index$`] === 0);
            } else if (this.name === 'is_even_item') {
                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`is_even_item builtin requires no arguments`);
                }
                return Literal.of((data[`$${exp.getName()}_index$`] + 1) % 2 === 0);
            } else if (this.name === 'is_odd_item') {
                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`is_odd_item builtin requires no arguments`);
                }
                return Literal.of(data[`$${exp.getName()}_index$`] % 2 === 0);
            } else if (this.name === 'item_cycle') {

                if (this.args.length === 0) {
                    throw new TemplateError(this.row, this.column,`item_cycle builtin requires at least one argument`);
                }

                const args = this.args.map(a => a.evaluate(data).retrieve());
                return Literal.of(args[data[`$${exp.getName()}_index$`] % args.length]);
            } else if (this.name === 'item_parity') {

                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`item_parity builtin requires no arguments`);
                }

                return Literal.of((data[`$${exp.getName()}_index$`] + 1) % 2 === 0 ? "even" : "odd");
            } else if (this.name === 'item_parity_cap') {
                if (this.args.length !== 0) {
                    throw new TemplateError(this.row, this.column,`item_parity_cap builtin requires no arguments`);
                }

                return Literal.of((data[`$${exp.getName()}_index$`] + 1) % 2 === 0 ? "Even" : "Odd");
            } else {
                throw new TemplateError(this.row, this.column,`Unsupported builtin (${this.name}) for subject ${this.row}:${this.column}`);
            }
        }

        const subject = exp.retrieve();

        const builtin = Builtins.find(subject, this.name);
        if (builtin) {
            return builtin.calculate(subject, this.args, data, this.row, this.column);
        } else {
            throw new TemplateError(this.row, this.column,`Unsupported builtin (${this.name}) for subject ${this.row}:${this.column}`);
        }
    }
}